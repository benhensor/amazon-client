import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
	updateOrderStatus,
	deleteOrderById,
} from '../../redux/slices/orderSlice'
import { addItemToBasket } from '../../redux/slices/basketSlice'
import OrderHeader from '../orders/OrderHeader'
import styled from 'styled-components'

export default function GroupedOrders({ orders, currentUser }) {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const buyItAgain = (product) => {
		dispatch(addItemToBasket({ product, quantity: 1 }))
	}

	const handleViewItem = (itemId) => {
		navigate(`/product/${itemId}`)
	}

	const handleUpdateOrderStatus = (orderId, status) => {
		console.log(orderId, status)
		dispatch(updateOrderStatus({ orderId, status }))
	}

	const groupedItems = orders.reduce((acc, order) => {
		order.order_items.forEach((item) => {
			const category = item.product_data.category
			if (!acc[category]) acc[category] = []
			acc[category].push({ ...item, order })
		})
		console.log(acc)
		return acc
	}, {})

	console.log('groupedItems', groupedItems)

	const RenderOrderOptions = ({ order }) => {
		console.log('renderorderoptions', order)
		const enroute = order.order.status === 'pending'
		const delivered = order.order.status === 'delivered'
		const cancelled = order.order.status === 'cancelled'
		return (
			<OrderOptions>
				{enroute && (
					<>
						<button className="accent">Problem with order</button>
						<button className="accent">Track package</button>
						<button
							onClick={() =>
								handleUpdateOrderStatus(
									order.order_id,
									'cancelled'
								)
							}
						>
							Cancel order
						</button>
					</>
				)}
				{delivered && (
					<>
						<button>Return items</button>
						<button>Delete order</button>
					</>
				)}
				{cancelled && (
					<>
						<button>View order details</button>
						<button>Delete order</button>
					</>
				)}
			</OrderOptions>
		)
	}

	return (
		<Orders>
			{Object.entries(groupedItems).map(([category, items]) => {
				const pending = items[0].order.status === 'pending'
				const delivered = items[0].order.status === 'delivered'
				const cancelled = items[0].order.status === 'cancelled'
				return (
					<OrderItem key={category}>
						<OrderHeader items={items} currentUser={currentUser} />

						<OrderBody>
							<div className="order-body-items">
								<div className="order-status">
									<h3>
										{pending ? 'Not yet dispatched' : ''}
										{delivered ? 'Order delivered' : ''}
										{cancelled ? 'Order cancelled' : ''}
									</h3>
									<p
										className={`${
											cancelled
												? 'cancelled'
												: new Date(
														items[0].order.shipping.range_from
												  ) > new Date()
												? 'enroute'
												: 'delivered'
										}`}
									>
										{cancelled
                      ? ''
                      : new Date(
											    items[0].order.shipping.range_from
										      ) > new Date()
											? 'Delivery estimate: '
											: 'Delivered '}
										<strong>
											{cancelled ? '' : items[0].order.shipping.dates}
										</strong>
									</p>
								</div>
								{items.map(({ order, ...item }) => (
									<div
										key={item.order_item_id}
										className="order-item"
									>
										<div className="order-item-details">
											<div className="order-item-image">
												<img
													src={
														item.product_data
															.thumbnail
													}
													alt={
														item.product_data.title
													}
												/>
											</div>
											<div className="order-item-info">
												<p className="primary-link">
													{item.product_data.title}
												</p>
												<p className="description primary-link">
													{
														item.product_data
															.description
													}
												</p>
												<p className="returns-policy">
													{
														item.product_data
															.returnPolicy
													}
												</p>
												<div className="order-buttons">
													<button
														onClick={() =>
															buyItAgain(
																item.product_data
															)
														}
														className="primary-btn"
													>
														Buy it again
													</button>
													<button
														onClick={() =>
															handleViewItem(
																item
																	.product_data
																	.id
															)
														}
													>
														View item
													</button>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
							<RenderOrderOptions order={items[0]} />
						</OrderBody>
						<div className="order-archive">
							<button
								onClick={() =>
									dispatch(
										deleteOrderById(items.order.order_id)
									)
								}
								className="primary-link"
							>
								Delete order
							</button>
						</div>
					</OrderItem>
				)
			})}
		</Orders>
	)
}

const Orders = styled.section`
	max-width: 92rem;
	margin: 0 auto;
`

const OrderOptions = styled.div`
	display: flex;
	flex-direction: column;
	gap: var(--spacing-xs);
	padding-left: var(--spacing-lg);
	min-width: 25rem;

	button {
		padding: var(--spacing-ms) var(--spacing-md);
		background-color: transparent;
		color: var(--paleblue);
		border: 1px solid var(--lt-text);
		border-radius: var(--br-25);
		transition: var(--tr-fast);

		&:hover {
			background-color: var(--secondary-hover);
		}

		&.accent {
			background-color: var(--yellow);
		}
	}

	@media only screen and (max-width: 879px) {
		padding: 0;
	}
`

const OrderBody = styled.div`
	display: flex;
	padding: var(--spacing-md);
	border-bottom: 1px solid var(--border-grey);

	.order-body-items {
		.order-status {
			margin-bottom: var(--spacing-sm);
			p {
				font-weight: 600;
			}
		}

    .cancelled {
      color: var(--input-error);  
    }

		.delivered {
			color: var(--dk-blue);
		}

		.enroute {
			color: var(--stock-green);
		}

		.order-item {
			margin-bottom: var(--spacing-md);

			.order-item-details {
				display: flex;

				.order-item-image {
					max-width: 10rem;
					height: auto;
					margin-right: var(--spacing-md);
					img {
						max-width: 100%;
						height: auto;
					}
				}

				.order-item-info {
					.description {
						font-size: var(--font-xs);
					}

					p {
						display: inline-block;
						width: 100%;
					}

					.returns-policy {
						font-size: var(--font-xs);
						margin-bottom: var(--spacing-sm);
					}
				}

				.order-buttons {
					display: flex;
					gap: var(--spacing-sm);

					button {
						width: 10rem;
						border: 1px solid var(--lt-text);
						color: var(--dk-blue);
						border-radius: var(--br-25);
						margin-right: var(--spacing-sm);
						padding: var(--spacing-ms) var(--spacing-sm);
						font-size: var(--font-xs);
						&:hover {
							background-color: var(--lt-grey);
						}
					}
				}
			}
		}
	}

	@media only screen and (max-width: 879px) {
		flex-direction: column;

		.order-body-items {
			margin-bottom: var(--spacing-md);
		}
	}
`

const OrderItem = styled.div`
	border: 1px solid var(--border-grey);
	border-radius: var(--br-lg);
	overflow: hidden;
	margin-bottom: var(--spacing-md);

	.order-archive {
		display: flex;
		padding: var(--spacing-sm) var(--spacing-md);

		.archive-btn {
			background: none;
			border: none;
			cursor: pointer;
		}
	}
`
