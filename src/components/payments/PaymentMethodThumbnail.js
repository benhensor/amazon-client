import React from 'react'
import { useSelector } from 'react-redux'
import { getAttributes } from '../../utils/paymentMethods'
import {
	Thumbnail,
} from '../../assets/styles/PaymentStyles'

export default function PaymentMethodThumbnail({ card, isMethodInListDisplay }) {
	const defaultPaymentMethodId = useSelector((state) => state.paymentMethods?.defaultPaymentMethod?.payment_method_id)
  const { logo, img, typeLogo, background } = getAttributes(card)
	const isDefault = card?.payment_method_id === defaultPaymentMethodId
  return (
    <Thumbnail
				style={{ background: background }}
				$isMethodInListDisplay={isMethodInListDisplay}
			>
				<div className="sash-container">
					{isDefault && (
						<div className={isDefault && isMethodInListDisplay ? "default-sash thumbnail" : "default-sash"}>Default</div>
					)}
				</div>
				<div className="thumbnail-logo">{logo}</div>
				{(card?.bank === 'Lloyds Bank' || card?.bank === 'Halifax') && (
					<div className="thumbnail-img">{img}</div>
				)}
				{card?.status === 'default' && !isMethodInListDisplay && (
					<div className="thumbnail-default">
						<p>•••• •••• •••• {card?.card_number.slice(-4) || null}</p>
						<p>
							{card?.cardholder_name}
						</p>
					</div>
				)}
				<div className="thumbnail-details">
					{typeLogo}
					<p>{card?.card_account}</p>
				</div>
			</Thumbnail>
  )
}
