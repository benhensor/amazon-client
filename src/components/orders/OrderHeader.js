import React from 'react'
import { formatDate } from '../../utils/formatDate'
import styled from 'styled-components'

export default function OrderHeader({ items, currentUser }) {
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
						{items
							.reduce(
								(sum, item) => sum + item.product_data.price,
								0
							)
							.toFixed(2)}
					</strong>
				</p>
			</div>
			<div className="header-item">
				<p>dispatch to</p>
				<p className="primary-link">
					<strong>
						{currentUser.first_name + ' ' + currentUser.last_name}
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

const StyledOrderHeader = styled.div`
	display: flex;
	background-color: var(--order-header-grey);
	padding: var(--spacing-md);
	border-bottom: 1px solid var(--lt-grey);

	.header-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		font-size: var(--font-xs);
		margin-right: var(--spacing-lg);

		p:first-child {
			text-transform: uppercase;
		}

		&:last-child {
			margin-left: auto;
			margin-right: 0;
			align-items: flex-end;
		}
	}

	@media only screen and (max-width: 768px) {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--spacing-sm);

		.header-item {
			margin: 0;

			&:nth-child(1),
			&:nth-child(2),
			&:nth-child(3),
			&:nth-child(4) {
				justify-content: flex-start;
			}

			&:last-child {
				align-items: flex-start;
			}
		}
	}
`
