import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDefaultPaymentMethod } from '../../redux/slices/paymentMethodsSlice'
import PaymentMethodThumbnail from './PaymentMethodThumbnail'
import ExclamationIcon from '../../icons/ExclaimationIcon'
import styled from 'styled-components'

export default function PaymentMethod({ card }) {
  const dispatch = useDispatch()
  const defaultPaymentMethod = useSelector((state) => state.paymentMethods.defaultPaymentMethod)

  const handleSetDefaultPaymentMethod = (paymentMethodId) => {
		dispatch(setDefaultPaymentMethod(paymentMethodId))
	}
	return (
		<CardContainer
			key={card.payment_method_id}
			$isActive={
				defaultPaymentMethod.payment_method_id ===
				card.payment_method_id
			}
		>
			<div className="thumbnail-container">
				<PaymentMethodThumbnail
					card={card}
					isMethodInListDisplay={true}
				/>
			</div>
			<button
				onClick={() =>
					handleSetDefaultPaymentMethod(card.payment_method_id)
				}
				className="card-details"
			>
				<p className="card-account">
					{card.bank +
						' ' +
						' ' +
						card.type +
						' ' +
						card.account +
						' Account'}
				</p>
				<p className="card-detail">
					{card.number &&
						`Debit card ending in •••• ${card.number.slice(-4)}`}
				</p>
				{card.status === 'expired' && (
					<p className="expired">
						<ExclamationIcon /> Expired on {card.end_date}
					</p>
				)}
			</button>
		</CardContainer>
	)
}

const CardContainer = styled.div`
	display: flex;
  width: 100%;
	border-radius: var(--br-sm);
	gap: var(--spacing-sm);
	background-color: ${($props) => ($props.$isActive ? 'var(--white)' : '')};
	padding: var(--spacing-md) var(--spacing-sm);
	border-left: ${($props) =>
		$props.$isActive
			? '5px solid var(--active-payment-method)'
			: '5px solid transparent'};
	box-shadow: ${($props) =>
		$props.$isActive ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'};
	z-index: ${($props) => ($props.$isActive ? '1' : '0')};
	transition: background-color 0.3s, box-shadow 0.3s;

	&:hover {
		.card-details .card-account,
		.card-detail {
			cursor: pointer;
			color: var(--active-payment-method);
			text-decoration: underline;
		}
	}

	.thumbnail-container {
		min-width: 8.5rem;
		height: 5.4rem;
	}

	.card-details {
		text-align: left;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
		line-height: 1.2;
		.card-account {
			font-size: var(--font-sm);
			font-weight: 700;
		}

		.card-detail {
			font-size: var(--font-xs);
		}
	}
	.expired {
		font-size: var(--font-xs);
		color: var(--input-error);
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
	}
`