import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/protected/ProtectedRoute'
import Header from './components/header/Header'
import Home from './pages/Home'
import Products from './pages/Products'
import Account from './pages/Account'

function App() {
	return (
		<>
			<Router>
				<Header />
				<main>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/" element={<Home />} />
						<Route path="/" element={<Home />} />
						<Route path="/" element={<Home />} />
						<Route path="/" element={<Home />} />
						<Route path="/" element={<Home />} />
						<Route path="/products" element={<Products />} />

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
