import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkLoggedIn } from '../../redux/slices/userSlice'
import { Loader } from '../../assets/styles/GlobalStyles'
//import { fetchUserProfile } from '../../redux/slices/userSlice' // Adjust the import path as needed

const ProtectedRoute = ({ children }) => {
	const dispatch = useDispatch()
	const { loading } = useSelector(
		(state) => state.user
	)
	
	useEffect(() => {
		dispatch(checkLoggedIn())
	}, [dispatch])

	// console.log('protected route', { isLoggedIn, loading, currentUser })

	// useEffect(() => {
	//     if (authToken && !isLoggedIn && !currentUser) {
	//         dispatch(fetchUserProfile())
	//     }
	// }, [dispatch, authToken, isLoggedIn, currentUser])

	if (loading) {
		return (
			<Loader>
				<div className="loader"></div>
			</Loader>
		) 
	}

	// if (!isLoggedIn && !currentUser) {
	// 	return <Navigate to="/" replace />
	// }

	return children
}

export default ProtectedRoute
