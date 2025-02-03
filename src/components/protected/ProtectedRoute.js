import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Loader } from '../../assets/styles/GlobalStyles'
//import { fetchUserProfile } from '../../redux/slices/userSlice' // Adjust the import path as needed

const ProtectedRoute = ({ children }) => {
	//const dispatch = useDispatch()
	const { isLoggedIn, loading, currentUser } = useSelector(
		(state) => state.user
	)

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

	if (!isLoggedIn && !currentUser) {
		return <Navigate to="/" replace />
	}

	return children
}

export default ProtectedRoute
