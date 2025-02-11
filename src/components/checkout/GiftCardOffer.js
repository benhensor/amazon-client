import React from 'react'
import GiftCard from '../../assets/img/checkout/gift-card.png'
import { StyledGiftCard } from '../../assets/styles/CheckoutStyles'

export default function GiftCardOffer() {
	return (
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
				. <strong>Representative 28.9% APR variable</strong>. Credit
				broker: Amazon EU S.A.R.L. Lender: Barclays. T&Cs apply.
			</div>
		</StyledGiftCard>
	)
}
