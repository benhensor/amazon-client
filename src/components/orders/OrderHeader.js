import React from 'react'
import { formatDate } from '../../utils/formatDate'
import {
	StyledOrderHeader,
} from '../../assets/styles/OrderStyles'

export default function OrderHeader({ items, currentUser }) {

	const total = items.reduce((sum, item) => {
		return sum + (parseFloat(item.price) || 0)
	}, 0)

	return (
		<StyledOrderHeader>
			<div className="header-item">
				<p>order placed</p>
				<p>
					<strong>{formatDate(items[0].order.order_placed)}</strong>
				</p>
			</div>
			<div className="header-item">
				<p>total</p>
				<p>
					<strong>
						£
						{total.toFixed(2)}
					</strong>
				</p>
			</div>
			<div className="header-item">
				<p>dispatch to</p>
				<p className="primary-link">
					<strong>
						{currentUser.full_name}
					</strong>
				</p>
			</div>
			<div className="header-item">
				<p>
					order #{' '}
					<span className="primary-link">
						{items[0].order.order_id}
					</span>
				</p>
				<p className="primary-link">
					<strong>View order details</strong>
				</p>
			</div>
		</StyledOrderHeader>
	)
}