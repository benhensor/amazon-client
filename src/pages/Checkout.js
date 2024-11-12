import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logo from '../icons/Logo'
import BasketIcon from '../icons/BasketIcon'
import GiftCard from '../assets/img/checkout/gift-card.png'
import Footer from '../components/footer/Footer'
import styled from 'styled-components'

export default function Checkout() {
	const navigate = useNavigate()
	const currentUser = useSelector((state) => state.user.currentUser)
	const defaultAddress = useSelector((state) =>
		state.addresses.addresses.find((address) => address.is_default)
	)
	const basketItems = useSelector((state) => state.basket.items)
	const itemsTotal = useSelector((state) => state.basket.total)
	const orderTotal = itemsTotal + 3.99
	const { address_line1, address_line2, city, postcode, county, country } =
		defaultAddress

	console.log(basketItems)

	const handleBasketClick = () => {
		navigate('/basket')
	}

	const handleChangeAddress = () => {
		navigate('/addresses')
	}

	return (
		<CheckoutPage>
			<Header id="header">
				<HeaderContent>
					<HeaderItem>
						<Link to="/">
							<LogoContainer>
								<Logo letterColor="var(--white)" />
								<p>.co.uk</p>
							</LogoContainer>
						</Link>
					</HeaderItem>
					<div>
						<h1>Secure checkout</h1>
					</div>
					<HeaderItem>
						<BasketContainer onClick={() => handleBasketClick()}>
							<BasketIcon />
							<span>Basket</span>
						</BasketContainer>
					</HeaderItem>
				</HeaderContent>
			</Header>
			<StyledCheckout>
				<CheckoutContainer>
					<CheckoutItems>
						<div className="checkout-block address">
							<div>
								<h3>
									Delivering to {currentUser.first_name}{' '}
									{currentUser.last_name}
								</h3>
								<p className="user-address">{`${address_line1}, ${address_line2}, ${city}, ${postcode}, ${county}, ${country}`}</p>
								<p className="primary-link">
									Add delivery instructions
								</p>
							</div>
							<div>
								<button
									className="primary-link"
									onClick={handleChangeAddress}
								>
									Change
								</button>
							</div>
						</div>
						<div className="checkout-block payment">
							<div>
								<h3>Payment method</h3>
								<p className="primary-link">
									Use a gift card, voucher or promo code
								</p>
							</div>
							<div>
								<button className="primary-link">Change</button>
							</div>
						</div>

						<div className="checkout-block">
							<div className="giftcard">
								<div className="giftcard-img-container">
									<img
										src={GiftCard}
										alt="Scamazon gift card"
									/>
								</div>
								<div className="giftcard-details">
									Get a{' '}
									<strike>
										<strong className="twenty">£20</strong>
									</strike>{' '}
									<span className="thirty">
										<strong>£30</strong>
									</span>{' '}
									<strong>Gift Card</strong> if approved for{' '}
									<strong>The Scamazon Gnarlaycard</strong>.{' '}
									<span className="primary-link">
										<strong>Apply now</strong>
									</span>
									.{' '}
									<strong>
										Representative 28.9% APR variable
									</strong>
									. Credit broker: Scamazon EU S.A.R.L.
									Lender: Gnarlays. T&Cs apply.
								</div>
							</div>
							<div className="delivery-date">
								<h3>Arriving on Thursday, 1st July</h3>
							</div>
							<div className="order-items">
								{basketItems.map((item) => (
									<div className="order-item">
										<div
											key={item.basketItemId}
											className="order-item-details"
										>
											<div className="row">
												<div className="order-item-img">
													<img
														src={item.thumbnail}
														alt={item.title}
													/>
												</div>
												<div className="order-item-info">
													<h4>{item.title}</h4>
													<p>{item.description}</p>
													<p>
														<strong>
															£{item.price}
														</strong>
													</p>
													<p>
														{
															item.shippingInformation
														}
													</p>
													<p>Sold by {item.brand}</p>
												</div>
											</div>
											<div className="order-item-quantity">
												<p>
													<strong>Quantity:</strong>{' '}
													{item.quantity}{' '}
													<button className="primary-link">
														Change
													</button>
												</p>
												<p className="small-print">
													Gift options not available
												</p>
											</div>
										</div>
										<div className="delivery-options">
											<div className="delivery-option">
												<input type="radio" />
												<div className="delivery-option-input">
													<p>
														<strong>
															Monday 25 Nov -
															Saturday 30 Nov
														</strong>
													</p>
													<p>
														£3.99 Standard Delivery
													</p>
												</div>
											</div>
											<div className="delivery-option">
												<input type="radio" />
												<div className="delivery-option-input">
													<p>
														<strong>
															Monday 25 Nov -
															Saturday 30 Nov
														</strong>
													</p>
													<p>
														£3.99 Standard Delivery
													</p>
												</div>
											</div>
											<div className="delivery-option">
												<input type="radio" />
												<div className="delivery-option-input">
													<p>
														<strong>
															Monday 25 Nov -
															Saturday 30 Nov
														</strong>
													</p>
													<p>
														£3.99 Standard Delivery
													</p>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="checkout-block order-controls">
							<div className="btn-container">
								<button className="primary-btn pill-btn">
									Buy Now
								</button>
							</div>
							<div className="order-total">
								<h3>Order Total: £</h3>
								<p className="small-print">
									By placing your order you agree to
									Scamazon's
									<span className="primary-link">
										Conditions of Use & Sale
									</span>
									. Please see our{' '}
									<span className="primary-link">
										Privacy Notice
									</span>
									, our{' '}
									<span className="primary-link">
										Cookies Notice
									</span>{' '}
									and our
									<span className="primary-link">
										{' '}
										Interest-Based Ads Notice
									</span>
									.
								</p>
							</div>
						</div>

						<div className="checkout-block small-print">
							<p>
								Need help? Check our{' '}
								<span className="primary-link">help pages</span>{' '}
								or{' '}
								<span className="primary-link">contact us</span>
							</p>
							<p>
								When you click the "Buy now" button, we'll send
								you an e-mail message acknowledging receipt of
								your order. Your contract to purchase an item
								will not be complete until we send you an e-mail
								to indicate that the item has been dispatched.
							</p>
							<p>
								Within 30 days of delivery, you may return new,
								unopened physical merchandise in its original
								condition. Exceptions and restrictions apply.
								See Scamazon's{' '}
								<span className="primary-link">
									Return Policy
								</span>
								.
							</p>
							<Link to="/basket" className="primary-link">
								Back to basket
							</Link>
						</div>
					</CheckoutItems>

					<OrderTotal>
						<div className="order-summary">
							<button className="primary-btn pill-btn">
								Buy now
							</button>
							<p className="small-print">
								By placing your order you agree to Scamazon's
								<span className="primary-link">
									{' '}
									Conditions of Use & Sale
								</span>
								. Please see our{' '}
								<span className="primary-link">
									Privacy Notice
								</span>
								, our{' '}
								<span className="primary-link">
									Cookies Notice
								</span>{' '}
								and our
								<span className="primary-link">
									{' '}
									Interest-Based Ads Notice
								</span>
								.
							</p>
						</div>
						<hr />
						<div className="order-summary">
							<div className="order-subtotal">
								<p className="small-print">Items:</p>
								<p className="small-print">
									£{itemsTotal.toFixed(2)}
								</p>
							</div>
							<div className="order-subtotal">
								<p className="small-print">
									Postage & Packing:
								</p>
								<p className="small-print">£3.99</p>
							</div>
							<div className="order-subtotal total">
								<h3>Order Total:</h3>
								<h3>£{orderTotal}</h3>
							</div>
							<p className="small-print">
								Order totals include VAT.{' '}
								<span className="primary-link">
									See details
								</span>
							</p>
						</div>
					</OrderTotal>
				</CheckoutContainer>
			</StyledCheckout>
			<Footer />
		</CheckoutPage>
	)
}

const CheckoutPage = styled.div`
	height: 100svh;
`

const Header = styled.header`
	width: 100%;
	display: flex;
	flex-direction: column;
	z-index: 1000000;
`

const HeaderContent = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: var(--dk-blue);
	color: var(--white);
	padding: var(--spacing-sm) var(--spacing-md);
	height: 6rem;
	line-height: var(--lh-sm);
	@media only screen and (min-width: 1199px) {
	}
	@media only screen and (max-width: 450px) {
		padding: var(--spacing-sm) var(--spacing-sm);
	}
`

const HeaderItem = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100%;
	border: 1px solid transparent;
	position: relative;
	transition: var(--tr-fast);
`

const LogoContainer = styled.div`
	display: flex;
	width: 15rem;
	height: auto;
	color: var(--white);
	p {
		position: relative;
		top: 0.5rem;
	}
`

const BasketContainer = styled.div`
	display: flex;
	align-items: flex-end;
	position: relative;
	flex-shrink: 0;
	cursor: pointer;
	p.total {
		position: absolute;
		top: -0.2rem;
		left: 1.8rem;
		color: var(--md-orange);
		border-radius: 50%;
		font-size: var(--font-md);
		font-weight: bold;
	}
	p.total.over-ten {
		left: 1.3rem;
	}
	span {
		font-size: var(--font-sm);
		font-weight: bold;
		display: flex;
		align-items: center;
		color: var(--white);
	}
	path {
		fill: var(--white);
	}

	@media only screen and (max-width: 768px) {
		span {
			display: none;
		}
	}
`

const StyledCheckout = styled.div`
	background-color: var(--checkout-grey);
	span {
		cursor: pointer;
		&:hover {
			text-decoration: underline;
		}
	}
	@media only screen and (max-width: 768px) {
		padding: 0;
	}
`

const CheckoutContainer = styled.div`
	width: 100%;
	max-width: 120rem;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	gap: var(--spacing-md);
	.checkout-block {
		background-color: var(--white);
		padding: var(--spacing-md);
	}
	.address,
	.payment {
		display: flex;
		justify-content: space-between;
	}
	.payment {
		h3 {
			margin-bottom: var(--spacing-md);
		}
	}
	.giftcard {
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid var(--border-grey);
		padding: var(--spacing-md);
	}
	.giftcard-img-container {
		flex: 1;
		display: flex;
		img {
			max-width: 100%;
			height: auto;
		}
	}
	.giftcard-details {
		flex: 5;
		font-size: clamp(var(--font-xs), 2vw, var(--font-sm));
	}
	.twenty {
		color: var(--lt-text);
	}
	.thirty {
		color: var(--discount-red);
	}
	.small-print {
		font-size: clamp(var(--font-xxs), 2vw, var(--font-xs));
		p {
			margin-bottom: var(--spacing-sm);
		}
	}
	.order-items {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}
	.order-item {
		display: flex;
		gap: var(--spacing-md);
		padding: var(--spacing-md);
	}
	.order-item-details {
		flex: 3;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
		background-color: var(--continue-grey);
		border-radius: var(--br-md);
		padding: var(--spacing-md);
	}
	.order-item-img {
		min-width: 15rem;
		img {
			max-width: 100%;
			height: auto;
		}
	}
	.row {
		display: flex;
		gap: var(--spacing-md);
	}
	.order-items-info {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}
	.delivery-options {
		flex: 2;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}
	.delivery-option {
		display: flex;
		align-items: flex-start;
		gap: var(--spacing-xs);
		input {
			margin-top: 0.5rem;
		}
	}
	.delivery-option-input {
		display: flex;
		flex-direction: column;
		line-height: 1.5;
	}
	.order-controls {
		display: flex;
		gap: var(--spacing-md);
	}
	.btn-container {
		flex: 1;
		margin: auto 0;
	}
	.order-total {
		flex: 5;
	}

	@media only screen and (max-width: 1199px) {
		flex-direction: column-reverse;
	}
	@media only screen and (max-width: 768px) {
		gap: 0;
	}
`

const CheckoutItems = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: var(--spacing-md);
	padding: var(--spacing-md);
	.user-address {
		margin-bottom: var(--spacing-md);
	}

	@media only screen and (max-width: 768px) {
		div.basket-header {
			padding: 0 0 var(--spacing-md) 0;
		}
	}
	@media only screen and (max-width: 450px) {
		padding: var(--spacing-md) var(--spacing-sm);
	}
`

const OrderTotal = styled.div`
	width: 35rem;
	height: fit-content;
	padding: var(--spacing-md);
	background-color: var(--white);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: var(--spacing-md);
	margin-top: var(--spacing-md);
	.order-summary {
		&:first-of-type {
			button {
				margin-bottom: var(--spacing-sm);
			}
		}
	}
	.order-subtotal {
		display: flex;
		justify-content: space-between;
	}
	.total {
		font-weight: bold;
	}

	@media only screen and (max-width: 1199px) {
		width: 100%;
	}
	@media only screen and (max-width: 768px) {
		border-bottom: 1px solid var(--lt-grey);
	}
	@media only screen and (max-width: 450px) {
		padding: var(--spacing-md) var(--spacing-sm);
	}
`
