import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useSelector((state) => state.user)
  const location = useLocation()

  // Don't redirect while checking auth status
  if (loading) {
    return <div>Loading...</div>
  }

  if (!isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute