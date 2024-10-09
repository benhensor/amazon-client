import React from 'react'
import { BrowserRouter as Router, Routes, Navigate, Route } from 'react-router-dom'
import ProtectedRoute from './components/protected/ProtectedRoute'
import Header from './components/header/Header'
import Home from './pages/Home'
import Products from './pages/Products'
import Product from './pages/Product'
import Department from './pages/Department'
import Account from './pages/Account'
import Basket from './pages/Basket'

function App() {
	return (
		<>
			<Router>
				<Header />
				<main>
					<Routes>
						<Route path="*" element={<Navigate to="/" />} />
						<Route path="/" element={<Home />} />
						<Route path="/category/:slug" element={<Products />} />
						<Route path="/category/search/:searchTerm" element={<Products />} />
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
					</Routes>
				</main>
			</Router>
		</>
	)
}

export default App
