import React from 'react'
import { BrowserRouter as Router, Routes, Navigate, Route } from 'react-router-dom'
import ProtectedRoute from './components/protected/ProtectedRoute'
import Header from './components/header/Header'
import Home from './pages/Home'
import Products from './pages/Products'
import Product from './pages/Product'
import Department from './pages/Department'
import Account from './pages/Account'

function App() {
	return (
		<>
			<Router>
				<Header />
				<main>
					<Routes>
						<Route path="*" element={<Navigate to="/" />} />
						<Route path="/" element={<Home />} />
						<Route path="/products" element={<Products />} />
						<Route path="/department" element={<Department />} />
						<Route path="/product" element={<Product />} />

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
