import React from 'react'
import { BrowserRouter as Router, Routes, Navigate, Route } from 'react-router-dom'
import ProtectedRoute from './components/protected/ProtectedRoute'
import AuthPortal from './pages/AuthPortal'
import Register from './pages/Register'
import Header from './components/header/Header'
import Home from './pages/Home'
import Products from './pages/Products'
import Product from './pages/Product'
import Department from './pages/Department'
import Account from './pages/Account'
import Basket from './pages/Basket'

const HeaderLayout = () => (
  <>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:slug" element={<Products />} />
        <Route path="/search/:searchTerm" element={<Products />} />
        <Route path="/category/:category/search/:searchTerm" element={<Products />} />
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
  </>
)

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes without header */}
        <Route path="/auth" element={<AuthPortal />} />
        
        {/* All other routes with header */}
        <Route path="/*" element={<HeaderLayout />} />
        
        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
