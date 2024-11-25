import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToBasket } from '../redux/slices/basketSlice'
import { fetchOrders, deleteOrderById } from '../redux/slices/orderSlice'
import styled from 'styled-components'

export default function Orders() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const currentUser = useSelector((state) => state.user.currentUser)
	const orders = useSelector((state) => state.orders.orders)

	useEffect(() => {
		// fetch orders
		dispatch(fetchOrders())
	}, [dispatch])

	console.log('orders: ', orders)
	console.log('user: ', currentUser)

	const formatDate = (dateString) => {
		const date = new Date(dateString)
		const options = { day: '2-digit', month: 'long', year: 'numeric' }
		return date.toLocaleDateString('en-GB', options)
	}

	const buyItAgain = (product) => {
		dispatch(addItemToBasket({product, quantity: 1}))
	}

	const handleViewItem = (itemId) => {
		navigate(`/product/${itemId}`)
	}

	return (
		<YourOrders>
			<div className="content">
				<div className="breadcrumb">
					<Link to="/account" className="primary-link">
						Your Account
					</Link>
					<span>▸</span>
					<p>Your Orders</p>
				</div>

				<div className="header">
					<h1>Your Orders</h1>
					<form action="">
						<input
							id="order-search"
							name="order-search"
							type="text"
						/>
						<button>Search Orders</button>
					</form>
				</div>

				<div className="order-filters">
					<nav>
						<ul>
							<li className="primary-link">Orders</li>
							<li className="primary-link">Buy Again</li>
							<li className="primary-link">Not Yet Dispatched</li>
							<li className="primary-link">Local Store Orders</li>
							<li className="primary-link">Cancelled Orders</li>
						</ul>
					</nav>
				</div>

				<div className="order-history">
					<p>
						<strong>
							{orders.length} order
							{orders.length > 1 && 's'}
						</strong>{' '}
						placed in
					</p>
					<select name="" id="">
						<option value="">past three months</option>
						<option value="">past six months</option>
						<option value="">past year</option>
						<option value="">all time</option>
					</select>
				</div>

				<div className="order-list">
					{orders
						.slice() // Create a copy of the array to avoid mutating the original state
						.sort(
							(a, b) =>
								new Date(b.order_placed) -
								new Date(a.order_placed)
						) // Sort by most recent first
						.map((order) => (
							<div key={order.order_id} className="order">
								<div className="order-header">
									<div className="order-header-item">
										<p>order placed</p>
										<p>{formatDate(order.order_placed)}</p>
									</div>
									<div className="order-header-item">
										<p>total</p>
										<p>£{order.total}</p>
									</div>
									<div className="order-header-item">
										<p>dispatch to</p>
										<p className="primary-link">
											{currentUser.first_name +
												' ' +
												currentUser.last_name}
										</p>
									</div>
									<div className="order-header-item">
										<p>order # {order.order_id}</p>
										<p className="primary-link">
											View order details
										</p>
									</div>
								</div>

								<div className="order-body">
									<div className="order-body-items">
										<div className="order-status">
											<p>
												Delivered{' '}
												{formatDate(order.order_placed)}
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
																item
																	.product_data
																	.thumbnail
															}
															alt={
																item
																	.product_data
																	.title
															}
														/>
													</div>
													<div className="order-item-info">
														<p className="primary-link">
															{
																item
																	.product_data
																	.title
															}
														</p>
														<p className="description primary-link">
															{
																item
																	.product_data
																	.description
															}
														</p>
														<p className="returns-policy">
															Return items:{' '}
															{
																item
																	.product_data
																	.returnPolicy
															}
														</p>
														<div className="order-buttons">
															<button 
																onClick={() => buyItAgain(item.product_data)}
																className="primary-btn"
															>
																Buy it again
															</button>
															<button
																onClick={() => handleViewItem(item.product_data.id)}
															>
																View item
															</button>
														</div>
													</div>
												</div>
											</div>
										))}
									</div>

									<div className="order-options">
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
									</div>
								</div>

								<div className="order-archive-btn">
									<button 
										onClick={() => dispatch(deleteOrderById(order.order_id))}
										className="archive-btn primary-link"
									>
										Delete order
									</button>
								</div>
							</div>
						))}
				</div>
			</div>
		</YourOrders>
	)
}

const YourOrders = styled.div`
	background-color: var(--white);
	overflow-x: hidden;
	.content {
		max-width: 92rem;
		margin: 0 auto var(--spacing-lg) auto;
	}

	.breadcrumb {
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
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: var(--spacing-md) 0;

		form {
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
		}
	}

	.order-filters {
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
	}

	.order-history {
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
	}

	.order-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
		.order {
			border: 1px solid var(--border-grey);
			border-radius: var(--br-lg);
			overflow: hidden;

			.order-header {
				display: flex;
				background-color: var(--order-header-grey);
				padding: var(--spacing-md);
				border-bottom: 1px solid var(--lt-grey);

				.order-header-item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: flex-start;
					font-size: var(--font-xs);
					margin-right: var(--spacing-lg);
					p {
						&:first-child {
							text-transform: uppercase;
						}
					}
					&:last-child {
						margin-left: auto;
						margin-right: 0;
						align-items: flex-end;
					}
				}
			}

			.order-body {
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

					.order-item {
						margin-bottom: var(--spacing-md);
						.order-item-details {
							display: flex;
							.order-item-image {
								min-width: 10rem;
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
								width: 12rem;
								border: 1px solid var(--lt-text);
								color: var(--dk-blue);
								border-radius: var(--br-25);
								margin-right: var(--spacing-sm);
								&:hover {
									background-color: var(--lt-grey);
								}
							}
						}
					}
				}

				.order-options {
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
					}
					.accent {
						background-color: var(--yellow);
					}
				}
			}
			.order-archive-btn {
				display: flex;
				padding: var(--spacing-sm) var(--spacing-md);
				button.archive-btn {
					background-color: none;
					border: none;
				}
			}
		}
	}

	@media only screen and (max-width: 959px) {
		padding: 0 var(--spacing-md);
	}
	@media only screen and (max-width: 879px) {
		padding: 0 var(--spacing-sm);

		.order-list .order .order-body {
			flex-direction: column;
		}

		.order-list .order .order-body .order-body-items {
			margin-bottom: var(--spacing-md);
		}

		.order-list .order .order-body .order-options {
			padding: 0;
		}

		.order-filters {
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
	}
	@media only screen and (max-width: 450px) {
		padding: 0 var(--spacing-sm);

		.order {
			.order-header {
				flex-direction: column;
				.order-header-item {
					margin: 0;
					margin-bottom: var(--spacing-sm);
					&:last-child {
						margin: 0;
						align-items: flex-start;
					}
				}
			}
		}

		.order-filters {
			padding: 0;
			nav {
				ul {
					justify-content: space-between;
					gap: 0;
					li {
						padding: 0;
					}
				}
			}
		}
	}
`
