import React from 'react'
import GiftCard from '../../assets/img/checkout/gift-card.png'
import styled from 'styled-components'

export default function GiftCardOffer() {
	return (
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
				. <strong>Representative 28.9% APR variable</strong>. Credit
				broker: Scamazon EU S.A.R.L. Lender: Gnarlays. T&Cs apply.
			</div>
		</StyledGiftCard>
	)
}

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
