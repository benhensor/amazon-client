import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	setDefaultPaymentMethod,
	deletePaymentMethod,
} from '../../redux/slices/paymentMethodsSlice'
import PaymentMethodThumbnail from './PaymentMethodThumbnail'
import ExclamationIcon from '../../icons/ExclaimationIcon'
import { CardContainer } from '../../assets/styles/PaymentStyles'

export default function PaymentMethod({ card }) {
	const dispatch = useDispatch()

	const defaultPaymentMethodId = useSelector(
		(state) => state.paymentMethods?.defaultPaymentMethod?.payment_method_id
	)
	const isDefault = card?.payment_method_id === defaultPaymentMethodId

	const handleSetDefaultPaymentMethod = (card) => {
		if (card.status === 'expired') {
			console.log('Expired card cannot be set as default')
			return
		} else {
			dispatch(setDefaultPaymentMethod(card.payment_method_id))
		}
	}
	return (
		<CardContainer $isActive={isDefault}>
			<div className="card-section-container">
				<div className="thumbnail-container">
					<PaymentMethodThumbnail
						card={card}
						isMethodInListDisplay={true}
					/>
				</div>
				<button
					onClick={() => handleSetDefaultPaymentMethod(card)}
					className="card-details"
				>
					<p className="card-account">
						{`${card?.bank} ${card.card_type
							.split(' ')
							.map(
								(word) =>
									word.charAt(0).toUpperCase() +
									word.slice(1).toLowerCase()
							)
							.join(' ')} ${card?.card_account} Account`}
					</p>
					<p className="card-detail">
						{card?.card_number &&
							`Debit card ending in •••• ${card?.card_number.slice(
								-4
							)}`}
					</p>
				</button>
			</div>
			{card?.status === 'expired' && (
				<div className="expired">
					<ExclamationIcon /> Expired on {card?.end_date}
					<button
						className="primary-link"
						onClick={() => {
							dispatch(
								deletePaymentMethod(card?.payment_method_id)
							)
						}}
					>
						Remove
					</button>
				</div>
			)}
		</CardContainer>
	)
}
