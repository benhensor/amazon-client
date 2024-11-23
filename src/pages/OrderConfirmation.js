import React from 'react'
import { useNavigate } from 'react-router-dom'
import ScamazonMusicImg from '../assets/img/scamazon_music.png'
import GiftCard from '../assets/img/checkout/gift-card.png'
import styled from 'styled-components'

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

export default function OrderConfirmation() {
	const navigate = useNavigate()

	const handleContinueShopping = () => {
		navigate('/')
	}
	return (
		<OrderConfirmationContainer>
			<div className="outer">
				<div className="order-confirmation-container">
					<div className="column order-details">
						<div className="row divider">
							<div className="column">
								<div className="column">
									<p className="thanks">
										Order placed, thanks!
									</p>
									<p>
										Confirmation will be sent to your email.
									</p>
								</div>
								<p>Delivery to ...</p>
							</div>
						</div>
						<div className="row divider">
							<div className="column">
								<p>actual date</p>
								<p>Delivery date</p>
							</div>
							<div>
								<img src="" alt="" />
							</div>
						</div>
						<div className="row">
							<div className="column spacer">
								<p>actual date</p>
								<p>Esitmated delivery</p>
							</div>
							<div>
								<img src="" alt="" />
							</div>
						</div>
						<div className="row">
							<div className="column">
								<p>
									You saved £4.99 in delivery fees on this
									order with Crime.{' '}
									<span className="primary-link">
										Learn more
									</span>
								</p>
								<p className="primary-link">
									Review or edit your orders ▸
								</p>
							</div>
						</div>
					</div>
					<div className="column scamazon-music-promo">
						<div className="row promo-elements">
							<div className="promo-image">
								<img
									src={ScamazonMusicImg}
									alt="Scamazon Music"
								/>
							</div>
							<div className="promo-details">
								<h3>3 months FREE</h3>
								<button className="primary-btn pill-btn">
									Sign up and pay later
								</button>
								<p>
									£9.99/month after 3 months trial. Cancel
									anytime.
								</p>
							</div>
						</div>
						<div className="terms">
							<p>
								By clicking "Sign up and pay now", you
								acknowledge that you have read and agree to{' '}
								<span className="primary-link">
									Scamazon’s Conditions of Use
								</span>
								and{' '}
								<span className="primary-link">
									Scamazon Music Terms of Use
								</span>
								. You authorise us to charge your default card
								or another card on file,{' '}
								<strong>
									£9.99 per month, including taxes after your
									trial.{' '}
									<span className="primary-link">
										Terms & Conditions apply:
									</span>{' '}
									Your subscription will renew automatically
									after the introductory offer. Cancel renewal
									any time by visiting{' '}
									<span className="primary-link">
										Scamazon Music Settings
									</span>
									.
								</strong>
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="gift-card-container">
				<GiftCardOffer />
			</div>
			<div className="continue-shopping">
				<button
					className="primary-btn pill-btn"
					onClick={handleContinueShopping}
				>
					Continue shopping
				</button>
			</div>
		</OrderConfirmationContainer>
	)
}

const OrderConfirmationContainer = styled.div`
	margin: 0 auto;
	width: 100%;
	background-color: var(--white);

	.outer {
		background-color: var(--lt-grey);
		border-radius: var(--br-lg);
		padding: var(--spacing-lg);
		margin: var(--spacing-lg);
	}

	.order-confirmation-container {
		background-color: var(--white);
		border: 1px solid var(--md-grey);
		padding: var(--spacing-lg) var(--spacing-md);
		border-radius: var(--br-lg);
		display: flex;
	}

	.column {
		display: flex;
		flex-direction: column;
	}

	.row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.order-details {
		flex: 3;
	}

	.scamazon-music-promo {
		flex: 2;
		padding: var(--spacing-md);
		display: flex;
		gap: var(--spacing-md);
	}

	.promo-elements {
		display: flex;
		gap: var(--spacing-md);
	}

	.promo-image {
		flex: 1;
		img {
			max-width: 100%;
			width: 100%;
			height: auto;
		}
	}

	.promo-details {
		flex: 1;
		text-align: center;
		display: flex;
		flex-direction: column;
		height: 100%;
		h3 {
			font-size: var(--font-md);
		}
		p {
			font-size: var(--font-sm);
		}
	}

	.terms {
		p {
			font-size: var(--font-xs);
		}
	}

	.divider {
		border-bottom: 1px solid var(--lt-grey);
		padding-bottom: var(--spacing-md);
		margin-bottom: var(--spacing-md);
	}

	.spacer {
		margin-bottom: var(--spacing-xxl);
	}

	.thanks {
		color: var(--def-address-green);
		font-weight: bold;
	}

	.gift-card-container {
		max-width: 75rem;
		margin: 0 auto var(--spacing-lg) auto;
	}

	.continue-shopping {
		width: 50rem;
		text-align: center;
		margin: var(--spacing-lg) auto;
	}

	@media only screen and (max-width: 1099px) {
		.order-confirmation-container {
			flex-direction: column;
		}

		.scamazon-music-promo {
			margin-top: var(--spacing-lg);
			flex-direction: column;
			padding: 0;
		}
	}

	@media only screen and (max-width: 450px) {
		.outer {
			background-color: var(--lt-grey);
			border-radius: 0;
			padding: var(--spacing-xs);
			margin: 0;
		}
		.order-confirmation-container {
			flex-direction: column;
		}

		.scamazon-music-promo {
			margin-top: var(--spacing-lg);
			flex-direction: column;
			padding: 0;
		}
		.promo-elements {
			flex-direction: column;
		}
		.continue-shopping {
			width: 30rem;
			text-align: center;
			margin: var(--spacing-lg) auto;
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
