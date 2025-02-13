import React, { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { format, addBusinessDays } from 'date-fns'
import {
	hydrateBasket,
	updateItemQuantity,
	clearBasket,
	clearBasketItems,
} from '../redux/slices/basketSlice'
import { fetchAddresses } from '../redux/slices/addressSlice'
import { createOrder } from '../redux/slices/orderSlice'
import { fetchPaymentMethods } from '../redux/slices/paymentMethodsSlice'
import GiftCardOffer from '../components/checkout/GiftCardOffer'
import ReturnPolicy from '../components/checkout/ReturnPolicy'
import PrivacyNotice from '../components/checkout/PrivacyNotice'
import DeliveryOption from '../components/checkout/DeliveryOption'
import AddressSection from '../components/checkout/AddressSection'
import PaymentSection from '../components/checkout/PaymentSection'
import OrderItem from '../components/checkout/OrderItem'
import OrderSummary from '../components/checkout/OrderSummary'
import Logo from '../icons/AmazonLogo'
import BasketFullIcon from '../icons/BasketFullIcon'
import Footer from '../components/footer/Footer'
import { Loader } from '../assets/styles/GlobalStyles'
import {
	StyledPage,
	StyledHeader,
	StyledMain,
	StyledLogo,
	StyledBasket,
} from '../assets/styles/CheckoutStyles'

export default function Checkout() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [selectedShipping, setSelectedShipping] = useState('standard')
	const currentUser = useSelector((state) => state.user) || {}
	const addresses = useSelector((state) => state.addresses.addresses)
	const userAddress = useMemo(() => {
		const defaultAddress = addresses.find((address) => address.is_default);
		return defaultAddress || null;
	}, [addresses]);

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
	const [validationErrors, setValidationErrors] = useState({
		address: null,
		payment: null,
	})
	const [hasGuestAddress, setHasGuestAddress] = useState(false)
	const [hasGuestPayment, setHasGuestPayment] = useState(false)

	const canPlaceOrder = useMemo(() => {
		if (currentUser?.isLoggedIn) {
			return addresses.some((addr) => addr.is_default) && paymentMethod
		} else {
			return hasGuestAddress && hasGuestPayment
		}
	}, [
		currentUser?.isLoggedIn,
		addresses,
		paymentMethod,
		hasGuestAddress,
		hasGuestPayment,
	])

	useEffect(() => {
		if (currentUser.isLoggedIn) {
			dispatch(fetchAddresses())
			dispatch(fetchPaymentMethods())
		}
	}, [dispatch, currentUser.isLoggedIn])

	useEffect(() => {
		dispatch(hydrateBasket())
	}, [dispatch])

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

	const formattedAddress = useMemo(() => {
		if (!userAddress) return null;
		
		return {
			address1: userAddress.address_line1,
			address2: userAddress.address_line2,
			city: userAddress.city,
			postcode: userAddress.postcode,
			county: userAddress.county,
			country: userAddress.country,
		};
	}, [userAddress]);

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
		const errors = {}

		if (currentUser?.isLoggedIn) {
			if (!addresses.some((addr) => addr.is_default)) {
				errors.address = 'Please add a delivery address'
			}
			if (!paymentMethod) {
				errors.payment = 'Please add a payment method'
			}
		} else {
			if (!hasGuestAddress) {
				errors.address = 'Please add a delivery address'
			}
			if (!hasGuestPayment) {
				errors.payment = 'Please add a payment method'
			}
		}

		if (Object.keys(errors).length > 0) {
			setValidationErrors(errors)
			return
		}

		const selectedOption = shippingOptions[selectedShipping]
		const rawDates = selectedOption.rawDates
		const orderData = {
			order_placed: new Date()
				.toISOString()
				.slice(0, 19)
				.replace('T', ' '),
			delivery_address: userAddress,
			payment_method: paymentMethod,
			shipping: {
				method: selectedShipping,
				price: selectedOption.price,
				dates: selectedOption.dates,
				range_from: rawDates.from,
				range_to: rawDates.to || null, // If no range_to, default to null
				description: selectedOption.description,
			},
			order_items: orderItems,
			total: itemsTotal,
		}
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
					<Loader>
						<div className="loader"></div>
					</Loader>
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
						<AddressSection
							user={currentUser}
							address={formattedAddress}
							error={validationErrors.address}
							onAddressSet={() => {
								setValidationErrors((prev) => ({
									...prev,
									address: null,
								}))
								setHasGuestAddress(true)
							}}
							onAddressRemoved={() => setHasGuestAddress(false)}
						/>

						<PaymentSection
							user={currentUser}
							card={paymentMethod}
							error={validationErrors.payment}
							onPaymentSet={() => {
								setValidationErrors((prev) => ({
									...prev,
									payment: null,
								}))
								setHasGuestPayment(true)
							}}
							onPaymentRemoved={() => setHasGuestPayment(false)}
						/>

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
									disabled={!canPlaceOrder}
									style={{ opacity: canPlaceOrder ? 1 : 0.6 }}
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
