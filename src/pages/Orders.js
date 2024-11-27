// Orders.js
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToBasket } from '../redux/slices/basketSlice'
import { fetchOrders, deleteOrderById } from '../redux/slices/orderSlice'
import styled from 'styled-components'

const formatDate = (dateString) => {
	const date = new Date(dateString)
	const options = { day: '2-digit', month: 'long', year: 'numeric' }
	return date.toLocaleDateString('en-GB', options)
}

export default function Orders() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const currentUser = useSelector((state) => state.user.currentUser)
	const orders = useSelector((state) => state.orders.orders)

	useEffect(() => {
		dispatch(fetchOrders())
	}, [dispatch])

	const buyItAgain = (product) => {
		dispatch(addItemToBasket({ product, quantity: 1 }))
	}

	const handleViewItem = (itemId) => {
		navigate(`/product/${itemId}`)
	}

	const sortedOrders = orders
		.slice()
		.sort((a, b) => new Date(b.order_placed) - new Date(a.order_placed))

	return (
		<StyledOrders>
			<OrderContainer>
				<BreadcrumbNav>
					<Link to="/account" className="primary-link">
						Your Account
					</Link>
					<span>▸</span>
					<p>Your Orders</p>
				</BreadcrumbNav>

				<PageHeader>
					<h1>Your Orders</h1>
					<SearchForm>
						<input
							id="order-search"
							name="order-search"
							type="text"
						/>
						<button>Search Orders</button>
					</SearchForm>
				</PageHeader>

				<OrderFilters>
					<nav>
						<ul>
							<li className="primary-link">Orders</li>
							<li className="primary-link">Buy Again</li>
							<li className="primary-link">Not Yet Dispatched</li>
							<li className="primary-link">Local Store Orders</li>
							<li className="primary-link">Cancelled Orders</li>
						</ul>
					</nav>
				</OrderFilters>

				<OrderHistorySection>
					<p>
						<strong>
							{orders.length} order{orders.length > 1 && 's'}
						</strong>{' '}
						placed in
					</p>
					<select>
						<option value="">past three months</option>
						<option value="">past six months</option>
						<option value="">past year</option>
						<option value="">all time</option>
					</select>
				</OrderHistorySection>

				<div className="order-list">
					{sortedOrders.map((order) => (
						<OrderItem key={order.order_id}>
							<OrderHeader>
								<div className="header-item">
									<p>order placed</p>
									<p><strong>{formatDate(order.order_placed)}</strong></p>
								</div>
								<div className="header-item">
									<p>total</p>
									<p><strong>£{order.total}</strong></p>
								</div>
								<div className="header-item">
									<p>dispatch to</p>
									<p className="primary-link">
										<strong>
											{currentUser.first_name +
												' ' +
												currentUser.last_name}
										</strong>
									</p>
								</div>
								<div className="header-item">
									<p>order # <span className="primary-link">{order.order_id}</span></p>
									<p className="primary-link">
										<strong>View order details</strong>
									</p>
								</div>
							</OrderHeader>

							<OrderBody>
								<div className="order-body-items">
									<div className="order-status">
										<h3>{new Date(
												order.shipping.range_from
											) > new Date()
												? 'Not yet dispatched'
												: ''}</h3>
										<p
											className={
												new Date(
													order.shipping.range_from
												) > new Date()
													? 'enroute'
													: 'delivered'
											}
										>
											{new Date(
												order.shipping.range_from
											) > new Date()
												? 'Delivery estimate: '
												: 'Delivered '}
											<strong>
												{order.shipping.dates}
											</strong>
										</p>
									</div>

									{order.order_items.map((item) => (
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
															item.product_data
																.title
														}
													/>
												</div>
												<div className="order-item-info">
													<p className="primary-link">
														{
															item.product_data
																.title
														}
													</p>
													<p className="description primary-link">
														{
															item.product_data
																.description
														}
													</p>
													<p className="returns-policy">
														Return items:{' '}
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

								<OrderOptions>
									<button className="accent">
										Problem with order
									</button>
									<button className="accent">
										Track package
									</button>
									<button>Return items</button>
									<button>Delete order</button>
									<button>Leave seller feedback</button>
									<button>Write a product review</button>
								</OrderOptions>
							</OrderBody>

							<div className="order-archive">
								<button
									onClick={() =>
										dispatch(
											deleteOrderById(order.order_id)
										)
									}
									className="primary-link"
								>
									Delete order
								</button>
							</div>
						</OrderItem>
					))}
				</div>
			</OrderContainer>
		</StyledOrders>
	)
}

const StyledOrders = styled.div`
	background-color: var(--white);
	overflow-x: hidden;
`

const OrderContainer = styled.div`
	max-width: 92rem;
	margin: 0 auto var(--spacing-lg) auto;

	@media only screen and (max-width: 959px) {
		padding: 0 var(--spacing-md);
	}

	@media only screen and (max-width: 879px) {
		padding: 0 var(--spacing-sm);
	}
`

const BreadcrumbNav = styled.div`
	display: flex;
	align-items: center;
	gap: var(--spacing-xs);
	margin: var(--spacing-md) 0;
	font-size: var(--font-xs);

	p {
		color: var(--order-breadcrumb);
	}

	span {
		margin-bottom: 2px;
	}
`

const PageHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: var(--spacing-md) 0;
`

const SearchForm = styled.form`
	display: flex;
	align-items: center;

	input {
		padding: var(--spacing-sm);
		border: 1px solid var(--border-grey);
		border-radius: var(--br-sm);
	}

	button {
		padding: var(--spacing-sm);
		background-color: var(--order-search-btn-bg);
		color: var(--white);
		border: none;
		border-radius: var(--br-25);
		margin-left: var(--spacing-sm);

		&:hover {
			background-color: var(--order-search-btn-bg-hover);
		}
	}
`

const OrderFilters = styled.div`
	padding: 0 var(--spacing-md);

	nav {
		font-size: clamp(var(--font-xs), 3vw, var(--font-sm));
		font-weight: 600;
		border-bottom: 1px solid var(--lt-grey);

		ul {
			display: flex;
			align-items: center;
			gap: var(--spacing-lg);

			li {
				padding: var(--spacing-ms);
				cursor: pointer;
			}
		}
	}

	@media only screen and (max-width: 879px) {
		padding: 0;

		nav {
			font-size: var(--font-xxs);

			ul {
				justify-content: space-between;
				gap: 0;

				li {
					padding: 0;
				}
			}
		}
	}
`

const OrderHistorySection = styled.div`
	display: flex;
	align-items: center;
	gap: var(--spacing-sm);
	margin: var(--spacing-md) 0;
	font-size: var(--font-xs);

	select {
		padding: var(--spacing-xs);
		border: 1px solid var(--border-grey);
		background-color: var(--lt-grey);
		border-radius: var(--br-md);
		font-size: var(--font-xs);
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

const OrderHeader = styled.div`
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

	@media only screen and (max-width: 450px) {
		flex-direction: column;

		.header-item {
			margin: 0;
			margin-bottom: var(--spacing-sm);

			&:last-child {
				margin: 0;
				align-items: flex-start;
			}
		}
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

const OrderOptions = styled.div`
	display: flex;
	flex-direction: column;
	gap: var(--spacing-xs);
	padding-left: var(--spacing-lg);
	min-width: 25rem;

	button {
		padding: var(--spacing-sm) var(--spacing-md);
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
