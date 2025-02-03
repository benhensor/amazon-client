import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { format, addBusinessDays } from 'date-fns'
import {
	updateItemQuantity,
	clearBasket,
	clearBasketItems,
} from '../redux/slices/basketSlice'
import { fetchAddresses } from '../redux/slices/addressSlice'
import { createOrder } from '../redux/slices/orderSlice'
import GiftCardOffer from '../components/checkout/GiftCardOffer'
import ReturnPolicy from '../components/checkout/ReturnPolicy'
import PrivacyNotice from '../components/checkout/PrivacyNotice'
import DeliveryOption from '../components/checkout/DeliveryOption'
import PaymentSection from '../components/checkout/PaymentSection'
import OrderItem from '../components/checkout/OrderItem'
import OrderSummary from '../components/checkout/OrderSummary'
import Logo from '../icons/Logo'
import BasketFullIcon from '../icons/BasketFullIcon'
import Footer from '../components/footer/Footer'
import styled from 'styled-components'

export default function Checkout() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [selectedShipping, setSelectedShipping] = useState('standard')
	const [formOpen, setFormOpen] = useState(false)
	const currentUser = useSelector((state) => state.user.currentUser) || {
		first_name: '',
		last_name: '',
	}
	const userAddress = useSelector((state) =>
		state.addresses.addresses.find((address) => address.is_default)
	) || {
		address_line1: '',
		address_line2: '',
		city: '',
		postcode: '',
		county: '',
		country: '',
	}
	const [formData, setFormData] = useState({
		guest_name: '',	
		address_line1: '',
		address_line2: '',
		city: '',
		postcode: '',
		county: '',
		country: '',
	})
	const [guestAddress, setGuestAddress] = useState(null)
	const paymentMethod = useSelector(
		(state) => state.paymentMethods.defaultPaymentMethod
	)
	const basketItems = useSelector((state) => state.basket.items)
	const orderItems = basketItems.map((item) => ({
		product_id: item.product_data.id,
		quantity: item.quantity,
		price: item.product_data.price,
		total: item.product_data.price * item.quantity,
	}))
	const itemsTotal = useSelector((state) => state.basket.total)

	useEffect(() => {
		dispatch(fetchAddresses())
	}, [dispatch])

	const handleAddressInputChange = (e) => {
		e.preventDefault()
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleFormOpen = () => {
		setFormData({
			guest_name: '',
			address_line1: '',
			address_line2: '',
			city: '',
			postcode: '',
			county: '',
			country: '',
		})
		setGuestAddress(null)
		setFormOpen(true)
	}

	const handleSave = (e) => {
		e.preventDefault()
		setGuestAddress(formData)
		setFormOpen(false)
	}

	const HeaderLogo = () => (
		<Link to="/">
			<StyledLogo>
				<Logo letterColor="var(--white)" />
				<p>.co.uk</p>
			</StyledLogo>
		</Link>
	)

	const BasketButton = ({ onClick }) => (
		<StyledBasket onClick={onClick}>
			<BasketFullIcon />
			<span>Basket</span>
		</StyledBasket>
	)

	const onShippingChange = (option) => {
		setSelectedShipping(option)
	}

	const formattedAddress = {
		address1: userAddress.address_line1,
		address2: userAddress.address_line2,
		city: userAddress.city,
		postcode: userAddress.postcode,
		county: userAddress.county,
		country: userAddress.country,
	}


	// Date utility functions
	const formatDeliveryDate = (date) => {
		return format(date, 'EEEE do MMM')
	}

	const getDeliveryDates = () => {
		const today = new Date()
		const currentHour = today.getHours()

		// If order placed after 2pm, start counting from next business day
		const startDate = currentHour >= 14 ? addBusinessDays(today, 1) : today

		// Calculate delivery dates for each shipping option
		const nextWorkingDay = addBusinessDays(startDate, 1)
		const expressMin = addBusinessDays(startDate, 2)
		const expressMax = addBusinessDays(startDate, 3)
		const standardMin = addBusinessDays(startDate, 5)
		const standardMax = addBusinessDays(startDate, 7)

		return {
			premium: {
				rawDates: { from: nextWorkingDay },
				formattedDates: formatDeliveryDate(nextWorkingDay),
				cutoffText:
					'Order within ' +
					(14 - currentHour) +
					' hours for next-day delivery',
			},
			express: {
				rawDates: { from: expressMin, to: expressMax },
				formattedDates: `${formatDeliveryDate(
					expressMin
				)} - ${formatDeliveryDate(expressMax)}`,
			},
			standard: {
				rawDates: { from: standardMin, to: standardMax },
				formattedDates: `${formatDeliveryDate(
					standardMin
				)} - ${formatDeliveryDate(standardMax)}`,
			},
		}
	}

	// Shipping options configuration with dynamic date calculation
	const useShippingOptions = () => {
		const [shippingOptions, setShippingOptions] = useState(null)

		useEffect(() => {
			const deliveryDates = getDeliveryDates()

			setShippingOptions({
				standard: {
					label: 'Standard Delivery',
					price: 3.99,
					dates: deliveryDates.standard.formattedDates,
					rawDates: deliveryDates.standard.rawDates,
					description: 'Delivery within 5-7 working days',
				},
				express: {
					label: 'Express Delivery',
					price: 7.99,
					dates: deliveryDates.express.formattedDates,
					rawDates: deliveryDates.express.rawDates,
					description: 'Delivery within 2-3 working days',
				},
				premium: {
					label: 'Premium Next-Day',
					price: 12.99,
					dates: deliveryDates.premium.formattedDates,
					rawDates: deliveryDates.premium.rawDates,
					description: `Next working day delivery when ordered before 2pm. ${deliveryDates.premium.cutoffText}`,
				},
			})
		}, []) // Run once on component mount

		return shippingOptions
	}

	const shippingOptions = useShippingOptions()

	const handleOrderClick = () => {
		const selectedOption = shippingOptions[selectedShipping]
		const rawDates = selectedOption.rawDates
		const orderData = {
			order_placed: new Date().toISOString().slice(0, 19).replace('T', ' '),
			shipping: {
				method: selectedShipping,
				price: selectedOption.price,
				dates: selectedOption.dates,
				range_from: rawDates.from,
				range_to: rawDates.to || null, // If no range_to, default to null
				description: selectedOption.description,
			},
			order_items: orderItems,
			total: itemsTotal
		}
		console.log('orderData:', orderData)
		dispatch(createOrder(orderData))
		dispatch(clearBasket())
		dispatch(clearBasketItems())
		navigate('/order-confirmation')
	}

	const handleQuantityChange = (e, item) => {
		// console.log('Changing quantity:', item)
		const newQuantity = parseInt(e.target.value, 10)
		// console.log(newQuantity)
		dispatch(
			updateItemQuantity({
				basket_item_id: item.basket_item_id,
				quantity: newQuantity,
			})
		)
	}

	if (!shippingOptions)
		return (
			<StyledPage>
				<StyledMain>
					<div className="container">
						<div className="content">
							<h3>Loading...</h3>
						</div>
					</div>
				</StyledMain>
			</StyledPage>
		)

	return (
		<StyledPage>
			<StyledHeader>
				<nav>
					<HeaderLogo />
					<h1>Secure checkout</h1>
					<BasketButton onClick={() => navigate('/basket')} />
				</nav>
			</StyledHeader>

			<StyledMain>
				<div className="container">
					<div className="content">
						<section className="address">
							<div>
								<h3>
									Delivering to {currentUser.first_name}{' '}
									{currentUser.last_name}
								</h3>
								{currentUser.isLoggedIn && (
									<p>
										{Object.values(formattedAddress).join(', ')}
									</p>
								)}
								{(!currentUser.isLoggedIn && guestAddress === null) ? (
									<p>
										Enter delivery address.
									</p>
								) : (
									<div>
										<form action=""
											onSubmit={(e) => e.preventDefault()}
										>
											<div className="input-group">
												<label htmlFor="guest_name">Name</label>
												<input
													type="text"
													name="guest_name"
													id="guest_name"
													onChange={handleAddressInputChange}
												/>
											</div>
											<div className="input-group">
												<label htmlFor="address_line1">Address Line 1</label>
												<input
													type="text"
													name="address_line1"
													id="address_line1"
													onChange={handleAddressInputChange}
												/>
											</div>
											<div className="input-group">
												<label htmlFor="address_line2">Address Line 2</label>
												<input
													type="text"
													name="address_line2"
													id="address_line2"
													onChange={handleAddressInputChange}
												/>
											</div>
											<div className="input-group">
												<label htmlFor="city">City</label>
												<input
													type="text"
													name="city"
													id="city"
													onChange={handleAddressInputChange}
												/>
											</div>
											<div className="input-group">
												<label htmlFor="postcode">Postcode</label>
												<input
													type="text"
													name="postcode"
													id="postcode"
													onChange={handleAddressInputChange}
												/>
											</div>
											<div className="input-group">
												<label htmlFor="county">County</label>
												<input
													type="text"
													name="county"
													id="county"
													onChange={handleAddressInputChange}
												/>
											</div>
											<div className="input-group">
												<label htmlFor="country">Country</label>
												<input
													type="text"
													name="country"
													id="country"
													onChange={handleAddressInputChange}
												/>
											</div>
											<button
												className="primary-link"
												onClick={handleSave}
											>
												Save address
											</button>
										</form>
									</div>
								)}

								{!currentUser.isLoggedIn && guestAddress && (
									<p>
										{Object.values(guestAddress).join(', ')}
									</p>
								)}
							
								<button className="primary-link">
									Add delivery instructions
								</button>
							</div>
							{currentUser.isLoggedIn ? (
								<button
									className="primary-link"
									onClick={() => navigate('/account/addresses')}
								>
									Change
								</button>
							) : (
								<button
									className="primary-link"
									onClick={handleFormOpen}
								>
									Add
								</button>
							)}
						</section>

						<PaymentSection card={paymentMethod} />

						<section>
							<GiftCardOffer />

							<div className="delivery-date">
								<h3>
									Arriving{' '}
									{shippingOptions[selectedShipping].dates}
								</h3>
							</div>

							<div className="items">
								{basketItems.map((item) => (
									<OrderItem
										key={item.basket_item_id}
										item={item}
										quantity={item.quantity}
										selectedShipping={selectedShipping}
										shippingOptions={shippingOptions}
										onShippingChange={setSelectedShipping}
										handleQuantityChange={
											handleQuantityChange
										}
									/>
								))}
							</div>
						</section>

						<section className="delivery">
							{Object.keys(shippingOptions).map((option, i) => (
								<DeliveryOption
									key={i}
									option={option}
									selected={selectedShipping}
									onChange={onShippingChange}
									shippingOption={shippingOptions[option]}
								/>
							))}
						</section>

						<section className="order-controls">
							<div className="btn-container">
								<button
									className="primary-btn pill-btn"
									onClick={handleOrderClick}
								>
									Buy Now
								</button>
							</div>
							<div className="order-total">
								<h3>
									Order Total: £
									{(
										itemsTotal +
										shippingOptions[selectedShipping]?.price
									).toFixed(2)}
								</h3>
								<PrivacyNotice />
							</div>
						</section>

						<ReturnPolicy />
					</div>

					<aside>
						<OrderSummary
							itemsTotal={itemsTotal}
							shippingMethod={selectedShipping}
							shippingOptions={shippingOptions}
							handleOrderClick={handleOrderClick}
							showPrivacyNotice
						/>
					</aside>
				</div>
			</StyledMain>

			<Footer />
		</StyledPage>
	)
}

// Styled components with simplified and organized CSS
const StyledPage = styled.div`
	min-height: 100svh;
	display: flex;
	flex-direction: column;
`

const StyledHeader = styled.header`
	background-color: var(--dk-blue);
	color: var(--white);
	padding: var(--spacing-xs) var(--spacing-md);

	@media only screen and (max-width: 450px) {
		padding: var(--spacing-sm);
	}

	nav {
		max-width: 120rem;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
`

const StyledLogo = styled.div`
	display: flex;
	align-items: center;
	width: 15rem;

	p {
		margin-top: var(--spacing-sm);
		color: var(--white);
	}
`

const StyledBasket = styled.button`
	display: flex;
	align-items: center;
	gap: var(--spacing-sm);
	color: var(--white);
	background: none;
	border: none;
	cursor: pointer;

	span {
		font-weight: bold;
		@media (max-width: 768px) {
			display: none;
		}
	}

	path {
		fill: var(--white);
	}
`

const StyledMain = styled.main`
	flex: 1;
	background-color: var(--checkout-grey);
	padding: var(--spacing-md) 0;

	@media only screen and (max-width: 1199px) {
		padding: var(--spacing-md);
	}
	@media only screen and (max-width: 450px) {
		padding: var(--spacing-sm) 0;
	}

	.container {
		max-width: 120rem;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr 30rem;
		gap: var(--spacing-md);

		@media only screen and (max-width: 1024px) {
			grid-template-columns: 1fr;
			grid-template-areas:
				'summary'
				'content';

			aside {
				grid-area: summary;
			}

			.content {
				grid-area: content;
			}
		}
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);

		section {
			background: white;
			padding: var(--spacing-md);
			margin: 0;
		}

		@media only screen and (max-width: 450px) {
			gap: var(--spacing-sm);
			section {
				padding: var(--spacing-sm);
			}
		}
	}

	h3 {
		font-size: clamp(var(--font-sm), 2vw, var(--font-md));
	}

	p {
		font-size: clamp(var(--font-xs), 2vw, var(--font-sm));
	}

	.delivery {
		margin: var(--spacing-md) 0;
	}

	.address {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}

	.small {
		font-size: clamp(var(--font-xxs), 2vw, var(--font-xs));
	}

	.delivery-date {
		padding: var(--spacing-sm) 0;
	}

	.items {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	.order-controls {
		display: flex;
		gap: var(--spacing-md);
	}

	.btn-container {
		margin: auto 0;
		width: 20rem;
	}

	.order-subtotal {
		display: flex;
		justify-content: space-between;
	}

	.order-total {
		background: white;
		padding: var(--spacing-md) 0;
	}

	aside {
		height: fit-content;
		background: white;
		padding: var(--spacing-md);
	}

	@media only screen and (max-width: 768px) {
		.order-controls {
			flex-direction: column;
		}

		.btn-container {
			width: 100%;
		}
	}
`