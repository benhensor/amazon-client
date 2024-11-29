// Orders.js
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders } from '../redux/slices/orderSlice'
import GroupedOrders from '../components/orders/GroupedOrders'
import BuyAgain from '../components/orders/BuyAgain'
import LocalStoreOrders from '../components/orders/LocalStoreOrders'
import CancelledOrders from '../components/orders/CancelledOrders'
import SearchIcon from '../icons/SearchIcon'
import styled from 'styled-components'

export default function Orders() {
	const dispatch = useDispatch()
	const currentUser = useSelector((state) => state.user.currentUser)
	const orders = useSelector((state) => state.orders.orders)
	const [numOfPendingOrders, setNumOfPendingOrders] = useState(0)
	const [activeNav, setActiveNav] = useState('orders')
	const [orderHistoryFilter, setOrderHistoryFilter] = useState('all time')
	const [previouslyOrderedProducts, setPreviouslyOrderedProducts] = useState(
		[]
	)
	const [cancelledOrders, setCancelledOrders] = useState([])

	useEffect(() => {
		dispatch(fetchOrders())
	}, [dispatch])

	useEffect(() => {
		if (orders.length > 0) {
			const orderedProducts = orders.reduce((acc, order) => {
				const products = order.order_items.map(
					(orderItem) => orderItem.product_data
				)
				return [...acc, ...products]
			}, [])
			setPreviouslyOrderedProducts(orderedProducts)
		}
	}, [orders])

	useEffect(() => {
		if (orders.length > 0) {
			const cancelled = orders.filter((order) => order.status === 'cancelled')
			setCancelledOrders(cancelled)
		}
	}, [orders])

	useEffect(() => {
		if (orders.length > 0) {
			const pending = orders.filter((order) => order.status === 'pending')
			setNumOfPendingOrders(pending.length)
		}
	}, [orders])

	const sortedOrders = orders
		.slice()
		.sort((a, b) => new Date(b.order_placed) - new Date(a.order_placed))

	const filteredOrders = sortedOrders.filter((order) => order.status !== 'cancelled').filter((order) => {
		const now = new Date()
		const orderDate = new Date(order.order_placed)

		switch (orderHistoryFilter) {
			case 'past three months':
				return orderDate >= new Date(now.setMonth(now.getMonth() - 3))
			case 'past six months':
				return orderDate >= new Date(now.setMonth(now.getMonth() - 6))
			case 'past year':
				return (
					orderDate >=
					new Date(now.setFullYear(now.getFullYear() - 1))
				)
			default:
				return true
		}
	})

	const handleOrderHistoryFilterChange = (e) => {
		setOrderHistoryFilter(e.target.value)
	}

	const renderNavContent = () => {
		switch (activeNav) {
			case 'orders':
				console.log(filteredOrders)
				return (
					<GroupedOrders
						orders={filteredOrders}
						currentUser={currentUser}
					/>
				)
			case 'buy again':
				return <BuyAgain products={previouslyOrderedProducts} />
			case 'local store orders':
				return <LocalStoreOrders />
			case 'cancelled orders':
				return <GroupedOrders
						orders={cancelledOrders}
						currentUser={currentUser}
					/>
			default:
				return (
					<GroupedOrders
						orders={filteredOrders}
						currentUser={currentUser}
					/>
				)
		}
	}

	return (
		<StyledOrders>
			<OrdersContainer $activeNav={activeNav}>
				<OrdersTopSection>
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
								placeholder="Search all orders"
							/>
							<div className="icon-wrapper">
								<SearchIcon />
							</div>
							<button>Search Orders</button>
						</SearchForm>
					</PageHeader>
					<OrderFilters>
						<nav>
							<ul>
								<li
									className={
										activeNav === 'orders'
											? 'primary-link active'
											: 'primary-link'
									}
									onClick={() => setActiveNav('orders')}
								>
									Orders
								</li>
								<li
									className={
										activeNav === 'buy again'
											? 'primary-link active'
											: 'primary-link'
									}
									onClick={() => setActiveNav('buy again')}
								>
									Buy Again
								</li>
								<li
									className={
										activeNav === 'not yet dispatched'
											? 'primary-link active'
											: 'primary-link'
									}
									onClick={() =>
										setActiveNav('not yet dispatched')
									}
								>
									Not Yet Dispatched
								</li>
								<li
									className={
										activeNav === 'local store orders'
											? 'primary-link active'
											: 'primary-link'
									}
									onClick={() =>
										setActiveNav('local store orders')
									}
								>
									Local Store Orders
								</li>
								<li
									className={
										activeNav === 'cancelled orders'
											? 'primary-link active'
											: 'primary-link'
									}
									onClick={() =>
										setActiveNav('cancelled orders')
									}
								>
									Cancelled Orders
								</li>
							</ul>
						</nav>
					</OrderFilters>
					{activeNav !== 'buy again' && (
						<OrderHistorySection>
							<p>
								<strong>
									{numOfPendingOrders} order
									{orders.length > 1 && 's'}
								</strong>{' '}
								placed in
							</p>
							<select
								name="order-history"
								id="order-history"
								value={orderHistoryFilter}
								onChange={handleOrderHistoryFilterChange}
							>
								<option value="all time">all time</option>
								<option value="past year">past year</option>
								<option value="past six months">
									past six months
								</option>
								<option value="past three months">
									past three months
								</option>
							</select>
						</OrderHistorySection>
					)}
				</OrdersTopSection>

				{renderNavContent()}
			</OrdersContainer>
		</StyledOrders>
	)
}

const StyledOrders = styled.div`
	background-color: var(--white);
	overflow-x: hidden;
`

const OrdersContainer = styled.div`
	margin: 0 auto var(--spacing-lg) auto;

	@media only screen and (max-width: 959px) {
		padding: 0 var(--spacing-md);
	}

	@media only screen and (max-width: 879px) {
		padding: 0 var(--spacing-sm);
	}
`

const OrdersTopSection = styled.div`
	max-width: 92rem;
	margin: 0 auto;
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
	position: relative;

	.icon-wrapper {
		position: absolute;
		top: 50%;
		left: var(--spacing-sm);
		transform: translateY(-50%);
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.8rem;
		height: 1.8rem;
	}

	input {
		max-width: 50rem;
		padding: var(--spacing-sm);
		border: 1px solid var(--border-grey);
		border-radius: var(--br-sm);
		&::placeholder {
			padding-left: 2rem;
		}
	}

	button {
		padding: var(--spacing-sm);
		background-color: var(--order-search-btn-bg);
		color: var(--white);
		border: none;
		border-radius: var(--br-25);
		margin-left: var(--spacing-sm);
		font-weight: bold;
		&:hover {
			background-color: var(--order-search-btn-bg-hover);
		}
	}

	@media only screen and (max-width: 450px) {
		display: none;
	}
`

const OrderFilters = styled.div`
	margin: 0 auto;
	nav {
		font-size: clamp(var(--font-xs), 3vw, var(--font-sm));
		font-weight: 600;
		border-bottom: 1px solid var(--lt-grey);

		ul {
			padding: 0 var(--spacing-md);
			display: flex;
			align-items: center;
			gap: var(--spacing-lg);

			li {
				padding: var(--spacing-ms);
				cursor: pointer;
			}
			.active {
				color: var(--dk-blue);
				position: relative;
			}

			.active::after {
				content: '';
				position: absolute;
				bottom: -1px;
				left: 0;
				width: 100%;
				height: 1px;
				background-color: var(--star-rating);
			}
		}
	}

	@media only screen and (max-width: 879px) {
		nav {
			overflow-x: auto;
			-webkit-overflow-scrolling: touch;
			scrollbar-width: none; /* Firefox */
		}

		nav::-webkit-scrollbar {
			display: none; /* Chrome/Safari */
		}

		nav ul {
			flex-wrap: nowrap;
			min-width: min-content;
			padding-bottom: var(--spacing-xs); /* Space for scrollbar */
		}

		nav ul li {
			flex-shrink: 0;
		}

		nav ul li .active::after {
				content: '';
				position: absolute;
				bottom: -4px;
				left: 0;
				width: 100%;
				height: 1px;
				background-color: var(--star-rating);
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
