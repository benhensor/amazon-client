import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
	// const { isLoading, isAuthenticated } = useAuth()

	// if (isLoading) {
	// 	return <div>Loading...</div> 
	// }

	// if (!isAuthenticated) {
	// 	return <Navigate to="/" replace />
	// }

	return children
}

export default ProtectedRoute