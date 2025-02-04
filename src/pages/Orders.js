import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders } from '../redux/slices/orderSlice'
import GroupedOrders from '../components/orders/GroupedOrders'
import BuyAgain from '../components/orders/BuyAgain'
import LocalStoreOrders from '../components/orders/LocalStoreOrders'
import CancelledOrders from '../components/orders/CancelledOrders'
import SearchIcon from '../icons/SearchIcon'
import {
	StyledOrders,
	OrdersContainer,
	OrdersTopSection,
	BreadcrumbNav,
	PageHeader,
	SearchForm,
	OrderFilters,
	OrderHistorySection,
} from '../assets/styles/OrderStyles'

export default function Orders() {
	const dispatch = useDispatch()
	const currentUser = useSelector((state) => state.user.currentUser)
	const orders = useSelector((state) => state.orders.orders)
	const orderedProducts = useSelector((state) => state.products.orderedProducts)
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
    const extractedProducts = orderedProducts.flatMap(order => order.products);
    const uniqueProducts = extractedProducts.filter((product, index, self) =>
        index === self.findIndex((p) => p.id === product.id)
    );
    setPreviouslyOrderedProducts(uniqueProducts);
}, [orderedProducts])

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
				return <CancelledOrders 
						orders={cancelledOrders}
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
