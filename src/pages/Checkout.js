import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { format, addBusinessDays } from 'date-fns'
import Logo from '../icons/Logo'
import BasketFullIcon from '../icons/BasketFullIcon'
import GiftCard from '../assets/img/checkout/gift-card.png'
import Footer from '../components/footer/Footer'
import styled from 'styled-components'
import { updateItemQuantity, clearBasket, clearBasketItems } from '../redux/slices/basketSlice'
import { fetchAddresses } from '../redux/slices/addressSlice'
import { addOrder } from '../redux/slices/orderSlice'

// Separate components for better organization
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

const GiftCardOffer = () => (
	<StyledGiftCard>
		<div className="image">
			<img src={GiftCard} alt="Scamazon gift card" />
		</div>
		<div className="details">
			Get a{' '}
			<strike>
				<strong className="old-price">£20</strong>
			</strike>{' '}
			<span className="new-price">
				<strong>£30</strong>
			</span>{' '}
			<strong>Gift Card</strong> if approved for{' '}
			<strong>The Scamazon Gnarlaycard</strong>.{' '}
			<span className="primary-link">
				<strong>Apply now</strong>
			</span>
			. <strong>Representative 28.9% APR variable</strong>. Credit broker:
			Scamazon EU S.A.R.L. Lender: Gnarlays. T&Cs apply.
		</div>
	</StyledGiftCard>
)

const PrivacyNotice = () => (
	<p className="small">
		By placing your order you agree to Scamazon's{' '}
		<span className="primary-link">Conditions of Use & Sale</span>. Please
		see our <span className="primary-link">Privacy Notice</span>, our{' '}
		<span className="primary-link">Cookies Notice</span> and our{' '}
		<span className="primary-link">Interest-Based Ads Notice</span>.
	</p>
)

const ReturnPolicy = () => (
	<section className="return-policy">
		<p>
			Need help? Check our{' '}
			<span className="primary-link">help pages</span> or{' '}
			<span className="primary-link">contact us</span>
		</p>
		<p>
			When you click the "Buy now" button, we'll send you an e-mail
			message acknowledging receipt of your order. Your contract to
			purchase an item will not be complete until we send you an e-mail to
			indicate that the item has been dispatched.
		</p>
		<p>
			Within 30 days of delivery, you may return new, unopened physical
			merchandise in its original condition. Exceptions and restrictions
			apply. See Scamazon's{' '}
			<span className="primary-link">Return Policy</span>.
		</p>
		<Link to="/basket" className="primary-link">
			Back to basket
		</Link>
	</section>
)

const PaymentSection = () => (
	<section className="payment">
		<div>
			<h3>Payment method</h3>
			<button className="primary-link">
				Use a gift card, voucher or promo code
			</button>
		</div>
		<button className="primary-link">Change</button>
	</section>
)

const DeliveryOption = ({ option, selected, onChange, shippingOption }) => {
	if (!shippingOption) return null

	return (
		<StyledDeliveryOption>
			<input
				type="radio"
				checked={selected === option}
				onChange={() => onChange(option)}
				name="shipping"
			/>
			<div>
				<p>
					<strong>{shippingOption.dates}</strong>
				</p>
				<p className="small">
					£{shippingOption.price.toFixed(2)} - {shippingOption.label}
				</p>
				<p className="small description">
					{shippingOption.description}
				</p>
			</div>
		</StyledDeliveryOption>
	)
}

const OrderItem = ({ item, quantity, handleQuantityChange }) => {
	return (
		<StyledOrderItem>
			<div className="details">
				<div className="row">
					<div className="image">
						<img src={item.product_data.thumbnail} alt={item.product_data.title} />
					</div>
					<div className="info">
						<h4>{item.title}</h4>
						<p className="description">{item.product_data.description}</p>
						<p className="small">
							<strong>£{item.product_data.price}</strong>
						</p>
						<p className="small">{item.product_data.shippingInformation}</p>
						<p className="small">Sold by {item.product_data.brand}</p>
						<div className="quantity">
							<p>
								<strong>Quantity:</strong> {quantity}{' '}
								<select
                  name="quantity"
                  id={item.basket_item_id}
                  onChange={(e) => handleQuantityChange(e, item)}
                  value=""
									className='primary-link'
                >
                  <option value="">Change</option>
                  {[...Array(5)].map((_, i) => (
                    <option
                      key={i + 1}
                      value={i + 1}
                    >
                      {i + 1}
                    </option>
                  ))}
                </select>
							</p>
							<p className="small">Gift options not available</p>
						</div>
					</div>
				</div>
			</div>
		</StyledOrderItem>
	)
}

const OrderSummary = ({
	itemsTotal,
	shippingMethod,
	shippingOptions,
	showPrivacyNotice,
	handleOrderClick,
}) => {
	const shippingCost = shippingOptions[shippingMethod]?.price || 0
	const orderTotal = itemsTotal + shippingCost
	return (
		<StyledOrderSummary>
			<button className="primary-btn pill-btn" onClick={handleOrderClick}>Buy now</button>
			{showPrivacyNotice && <PrivacyNotice />}
			<hr />
			<div className="subtotals">
				<div className="order-summary">
					<div className="order-subtotal">
						<p className="small">Items:</p>
						<p className="small">£{itemsTotal.toFixed(2)}</p>
					</div>
					<div className="order-subtotal">
						<p className="small">Postage & Packing:</p>
						<p className="small">£{shippingCost.toFixed(2)}</p>
					</div>
					<div className="order-subtotal total">
						<h3>Order Total:</h3>
						<h3>£{orderTotal.toFixed(2)}</h3>
					</div>
					<p className="small">
						Order totals include VAT.{' '}
						<span className="primary-link">See details</span>
					</p>
				</div>
			</div>
		</StyledOrderSummary>
	)
}

export default function Checkout() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [selectedShipping, setSelectedShipping] = useState('standard')
	const currentUser = useSelector((state) => state.user.currentUser) || { first_name: '', last_name: '' };
	const defaultAddress = useSelector((state) =>
		state.addresses.addresses.find((address) => address.is_default)
	) || { address_line1: '', address_line2: '', city: '', postcode: '', county: '', country: '' };
	const basketItems = useSelector((state) => state.basket.items)
	const itemsTotal = useSelector((state) => state.basket.total)
	const [orderData, setOrderData] = useState({
		shipping: selectedShipping,
		items: basketItems,
		total: itemsTotal,
	})

	useEffect(() => {
		dispatch(fetchAddresses())
	}, [dispatch])

	const onShippingChange = (option) => {
		setSelectedShipping(option)
	}

	const formattedAddress = {
		address1: defaultAddress.address_line1,
		address2: defaultAddress.address_line2,
		city: defaultAddress.city,
		postcode: defaultAddress.postcode,
		county: defaultAddress.county,
		country: defaultAddress.country,
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
				dates: formatDeliveryDate(nextWorkingDay),
				cutoffText:
					'Order within ' +
					(14 - currentHour) +
					' hours for next-day delivery',
			},
			express: {
				dates: `${formatDeliveryDate(
					expressMin
				)} - ${formatDeliveryDate(expressMax)}`,
			},
			standard: {
				dates: `${formatDeliveryDate(
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
					dates: deliveryDates.standard.dates,
					description: 'Delivery within 5-7 working days',
				},
				express: {
					label: 'Express Delivery',
					price: 7.99,
					dates: deliveryDates.express.dates,
					description: 'Delivery within 2-3 working days',
				},
				premium: {
					label: 'Premium Next-Day',
					price: 12.99,
					dates: deliveryDates.premium.dates,
					description: `Next working day delivery when ordered before 2pm. ${deliveryDates.premium.cutoffText}`,
				},
			})
		}, []) // Run once on component mount

		return shippingOptions
	}

	const handleOrderClick = () => {
		dispatch(addOrder(orderData))
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

	const shippingOptions = useShippingOptions()

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
								<p>
									{Object.values(formattedAddress).join(', ')}
								</p>
								<button className="primary-link">
									Add delivery instructions
								</button>
							</div>
							<button
								className="primary-link"
								onClick={() => navigate('/account/addresses')}
							>
								Change
							</button>
						</section>

						<PaymentSection />

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
										handleQuantityChange={handleQuantityChange}
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
								<button className="primary-btn pill-btn" onClick={handleOrderClick}>
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

		.return-policy {
			display: flex;
			flex-direction: column;
			gap: var(--spacing-sm);
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

	.payment {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
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

const StyledOrderItem = styled.article`
	display: grid;
	grid-template-columns: 1fr;
	gap: var(--spacing-md);

	.details {
		background: var(--continue-grey);
		border-radius: var(--br-md);
		padding: var(--spacing-md);
	}

	.row {
		display: flex;
		gap: var(--spacing-md);
	}

	.image {
		width: 12rem; /* Set fixed width for consistency */
		flex-shrink: 0; /* Prevent image from shrinking */
		img {
			width: 100%;
			height: auto;
			object-fit: cover;
		}
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
		min-width: 0; /* Enable text truncation in child elements */
	}

	h4 {
		font-size: clamp(var(--font-sm), 2vw, var(--font-md));
	}

	.description {
		display: -webkit-box;
		-webkit-line-clamp: 5; /* Show 3 lines of text */
		-webkit-box-orient: vertical;
		overflow: hidden;
		line-height: 1.5;
		//max-height: 4.5em; /* 3 lines * 1.5 line height */
	}

	.quantity {
		margin-top: auto; /* Push quantity to bottom */
		p {
			display: flex;
			gap: var(--spacing-sm);
		}
	}

	.delivery {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
		border: none;
		background: none;

		&:focus {
			outline: none;
		}

	}

	@media only screen and (max-width: 768px) {
		grid-template-columns: 1fr;
	}

	@media only screen and (max-width: 450px) {
		.details {
			padding: var(--spacing-sm);
		}
		.image {
			width: 100px; /* Smaller image on mobile */
			img {
				width: 100%;
				height: auto;
			}
		}
	}
`

const StyledGiftCard = styled.div`
	display: flex;
	align-items: center;
	gap: var(--spacing-md);
	border: 1px solid var(--border-grey);
	padding: var(--spacing-md);

	.image {
		img {
			max-width: 100%;
			height: auto;
			object-fit: cover;
		}
	}

	.details {
		flex: 5;
		font-size: clamp(var(--font-xs), 2vw, var(--font-sm));
	}

	.old-price {
		color: var(--lt-text);
	}

	.new-price {
		color: var(--discount-red);
	}

	@media only screen and (max-width: 450px) {
		padding: var(--spacing-sm);
		.image {
			width: 8.6rem;
		}
	}
`

const StyledDeliveryOption = styled.label`
	display: flex;
	align-items: flex-start;
	gap: var(--spacing-sm);
	font-size: clamp(var(--font-xs), 2vw, var(--font-sm));
	cursor: pointer;

	input {
		margin-top: var(--spacing-xs);
	}

	div {
		display: flex;
		flex-direction: column;
		margin-bottom: var(--spacing-sm);
	}
`

const StyledOrderSummary = styled.div`
	background: white;

	.subtotals {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.row {
		display: flex;
		justify-content: space-between;
	}

	.total {
		font-weight: bold;
		margin-top: var(--spacing-sm);
	}

	hr {
		margin: var(--spacing-md) 0;
		border: none;
		border-top: 1px solid var(--lt-grey);
	}

	button {
		width: 100%;
		margin-bottom: var(--spacing-md);
	}
`
