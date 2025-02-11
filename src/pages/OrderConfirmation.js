import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AmazonMusicImg from '../assets/img/amazon_music.png'
import GiftCard from '../assets/img/checkout/gift-card.png'
import {
	OrderConfirmationContainer,
	StyledGiftCard,
} from '../assets/styles/OrderStyles'

const GiftCardOffer = () => (
	<StyledGiftCard>
		<div className="image">
			<img src={GiftCard} alt="Amazon gift card" />
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
			<strong>The Amazon Barclaycard</strong>.{' '}
			<span className="primary-link">
				<strong>Apply now</strong>
			</span>
			. <strong>Representative 28.9% APR variable</strong>. Credit broker:
			Amazon EU S.A.R.L. Lender: Barclays. T&Cs apply.
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
									order with Prime.{' '}
									<span className="primary-link">
										Learn more
									</span>
								</p>
								<Link className="primary-link" to="/account/orders">
									Review or edit your orders ▸
								</Link>
							</div>
						</div>
					</div>
					<div className="column amazon-music-promo">
						<div className="row promo-elements">
							<div className="promo-image">
								<img
									src={AmazonMusicImg}
									alt="Amazon Music"
								/>
							</div>
							<div className="promo-details">
								<h3>3 months FREE</h3>
								<div className="button-container">
									<button className="primary-btn pill-btn">
										Sign up and pay later
									</button>
								</div>
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
									Amazon’s Conditions of Use
								</span>
								and{' '}
								<span className="primary-link">
									Amazon Music Terms of Use
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
										Amazon Music Settings
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
			<div className="button-container">
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
