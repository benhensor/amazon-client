import React, { useEffect } from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Navigate,
	Route,
} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { checkLoggedIn } from './redux/slices/userSlice'
import { fetchUserBasket } from './redux/slices/basketSlice'
import ProtectedRoute from './components/protected/ProtectedRoute'
import AuthPortal from './pages/AuthPortal'
import Header from './components/header/Header'
import Home from './pages/Home'
import Products from './pages/Products'
import Product from './pages/Product'
import Department from './pages/Department'
import Account from './pages/Account'
import Orders from './pages/Orders'
import Basket from './pages/Basket'
import Footer from './components/footer/Footer'
import Addresses from './pages/Addresses'
import AddNewAddress from './pages/AddNewAddress'
import UnderConstruction from './pages/UnderConstruction'
import Checkout from './pages/Checkout'

const HeaderLayout = () => (
	<>
		<Header />
		<main>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/category/:slug" element={<Products />} />
				<Route path="/search/:searchTerm" element={<Products />} />
				<Route
					path="/category/:category/search/:searchTerm"
					element={<Products />}
				/>
				<Route path="/department/:slug" element={<Department />} />
				<Route path="/product/:id" element={<Product />} />
				<Route path="/basket" element={<Basket />} />
				<Route
					path="/account"
					element={
						<ProtectedRoute>
							<Account />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/account/orders"
					element={
						<ProtectedRoute>
							<Orders />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/account/addresses"
					element={
						<ProtectedRoute>
							<Addresses />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/account/addresses/new-address"
					element={
						<ProtectedRoute>
							<AddNewAddress />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/account/under-construction"
					element={
						<ProtectedRoute>
							<UnderConstruction />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</main>
		<Footer />
	</>
)

function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		// console.log('check logged in')
		dispatch(checkLoggedIn())
	}, [dispatch])

	useEffect(() => {
		// console.log('fetch user basket')
		dispatch(fetchUserBasket())
	}, [dispatch])
	
	return (
		<Router>
			<Routes>
				{/* Auth routes without header */}
				<Route path="/auth" element={<AuthPortal />} />

				{/* Checkout route without header */}
				<Route path="/checkout" element={<Checkout />} />

				{/* All other routes with header */}
				<Route path="/*" element={<HeaderLayout />} />

				{/* Catch-all redirect */}
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</Router>
	)
}

export default App
