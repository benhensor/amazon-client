import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export const userAPI = {
	// Login user
	loginUser: async (credentials) => {
		const response = await axios.post(
			`${API_URL}/api/user/login`,
			credentials,
			{ withCredentials: true }
		)
		return response.data
	},
	// Register user
	registerUser: async (userData) => {
		const response = await axios.post(
			`${API_URL}/api/user/register`,
			userData,
			{ withCredentials: true }
		)
		return response.data
	},
	// Logout user
	logoutUser: async () => {
		const response = await axios.post(
      `${API_URL}/api/user/logout`, 
      {},
      { withCredentials: true }
		)
		return response.data
	},
	// Check if user is logged in
	checkAuth: async () => {
		const response = await axios.get(
      `${API_URL}/api/user/current`, 
      { withCredentials: true }
		)
		return response.data
	},
	// Fetch user's profile
	fetchProfile: async () => {
		const response = await axios.get(
      `${API_URL}/api/user/profile`, 
      { withCredentials: true }
		)
		return response.data
	},
}
