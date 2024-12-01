import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
//import { fetchUserProfile } from '../../redux/slices/userSlice' // Adjust the import path as needed



const ProtectedRoute = ({ children }) => {
    //const dispatch = useDispatch()
    const { isLoggedIn, loading, currentUser } = useSelector((state) => state.user)

    // console.log('protected route', { isLoggedIn, loading, currentUser })

    // useEffect(() => {
    //     if (authToken && !isLoggedIn && !currentUser) {
    //         dispatch(fetchUserProfile())
    //     }
    // }, [dispatch, authToken, isLoggedIn, currentUser])

    if (loading) {
        return <div>Loading...</div> // Consider using a proper loading component
    }

    if (!isLoggedIn && !currentUser) {
        return <Navigate to="/auth" replace />
    }

    return children
}

export default ProtectedRoute