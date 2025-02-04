import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
	updateOrderStatus,
	deleteOrderById,
} from '../../redux/slices/orderSlice'
import { addItemToBasket } from '../../redux/slices/basketSlice'
import OrderHeader from '../orders/OrderHeader'
import {
	Orders,
	OrderItem,
	OrderBody,
	OrderOptions,
} from '../../assets/styles/OrderStyles'

export default function GroupedOrders({ orders, currentUser }) {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const orderedProducts = useSelector(
		(state) => state.products.orderedProducts
	)

	const productMap = useMemo(() => {
		const map = orderedProducts.reduce((acc, order) => {
			order.products.forEach((product) => {
				acc[order.order_id] = acc[order.order_id] || {}
				acc[order.order_id][product.id] = product
			})
			return acc
		}, {})
		return map
	}, [orderedProducts])

	const groupedItems = orders.reduce((acc, order) => {
		order.order_items.forEach((item) => {
			const productData = productMap[order.order_id]?.[item.product_id]
			if (productData) {
				const category = productData.category
				if (!acc[category]) acc[category] = []
				acc[category].push({
					...item,
					product_data: productData,
					order,
				})
			}
		})
		return acc
	}, {})

	const buyItAgain = (product) => {
		dispatch(addItemToBasket({ product, quantity: 1 }))
	}

	const handleViewItem = (itemId) => {
		navigate(`/product/${itemId}`)
	}

	const handleUpdateOrderStatus = (orderId, status) => {
		console.log('orderId, status', orderId, status)
		dispatch(updateOrderStatus({ orderId, status }))
	}

	const RenderOrderOptions = ({ order }) => {
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
											{cancelled
												? ''
												: items[0].order.shipping.dates}
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
