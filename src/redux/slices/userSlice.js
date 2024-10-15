import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

const userSlice = createSlice({
	name: 'user',
	initialState: {
		currentUser: null,
		addresses: [],
		isLoggedIn: false,
		loading: false,
		error: null,
	},
	reducers: {
		setUser(state, action) {
			state.currentUser = action.payload
			state.isLoggedIn = true
		},
		logout(state) {
			state.currentUser = null
			state.isLoggedIn = false
			state.addresses = []
		},
		addAddress(state, action) {
			state.addresses.push(action.payload)
		},
		removeAddress(state, action) {
			state.addresses = state.addresses.filter(
				(address) => address.id !== action.payload
			)
		},
	},
	extraReducers: (builder) => {
		// Handle registration
		builder
			.addCase(registerUser.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.loading = false
				state.currentUser = action.payload.user
				state.isLoggedIn = true
			})
			.addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'An error occurred';
      })

		// Handle login
		builder
			.addCase(loginUser.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false
				state.currentUser = action.payload.user
				state.isLoggedIn = true
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})

		// Handle logout
		builder.addCase(logoutUser.fulfilled, (state) => {
			state.currentUser = null
			state.isLoggedIn = false
			state.addresses = []
		})

		// Handle fetch user profile
		builder
			.addCase(fetchUserProfile.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchUserProfile.fulfilled, (state, action) => {
				state.loading = false
				state.currentUser = action.payload.user
				state.addresses = action.payload.addresses
				state.isLoggedIn = true
			})
			.addCase(fetchUserProfile.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	},
})

export const { setUser, logout, addToWishlist, removeFromWishlist, addOrder } =
	userSlice.actions

// Thunk to register a user
export const registerUser = createAsyncThunk(
	'user/registerUser',
	async (userData, { rejectWithValue }) => {
		try {
      console.log(userData)
			const response = await axios.post(`${API_URL}/api/user/register`, userData)
      console.log(response.data)
			return response.data
		} catch (error) {
			return rejectWithValue(error.response.data.message || 'An error occurred');
		}
	}
)

// Thunk to login a user
export const loginUser = createAsyncThunk(
	'user/loginUser',
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await axios.post(`${API_URL}/api/user/login`, credentials, {
				withCredentials: true,
			})
			return response.data
		} catch (error) {
			return rejectWithValue(error.response.data.message || 'An error occurred');
		}
	}
)

// Thunk to logout a user
export const logoutUser = createAsyncThunk(
	'user/logoutUser',
	async (_, { rejectWithValue }) => {
		try {
			await axios.post(`${API_URL}/api/user/logout`, {}, { withCredentials: true })
			return true
		} catch (error) {
			return rejectWithValue(error.response.data.message || 'An error occurred');
		}
	}
)

// Thunk to fetch user profile (including addresses)
export const fetchUserProfile = createAsyncThunk(
	'user/fetchUserProfile',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${API_URL}/api/user/profile`, {
				withCredentials: true,
			})
			return response.data
		} catch (error) {
			return rejectWithValue(error.response.data.message || 'An error occurred');
		}
	}
)

export default userSlice.reducer
