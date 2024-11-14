import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchUserBasket } from './basketSlice'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

const userSlice = createSlice({
	name: 'user',
	initialState: {
		currentUser: null,
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
		},
		initializeUser(state, action) {
			state.currentUser = action.payload.user
			state.isLoggedIn = true
		},
	},
	extraReducers: (builder) => {
		// Check if user is logged in
		builder
			.addCase(checkLoggedIn.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(checkLoggedIn.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.user) {
          state.currentUser = action.payload.user
          state.isLoggedIn = true
        } else {
          state.currentUser = null
          state.isLoggedIn = false
        }
      })
      .addCase(checkLoggedIn.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        if (action.payload === 'Token expired') {
          state.currentUser = null
          state.isLoggedIn = false
          window.location.href = '/auth'
        }
      })
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
				state.loading = false
				state.error = action.payload.message || 'An error occurred'
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
				state.isLoggedIn = true
			})
			.addCase(fetchUserProfile.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	},
})

export const { setUser, logout, initializeUser } = userSlice.actions

// Thunk to check if a user is logged in
export const checkLoggedIn = createAsyncThunk(
  'user/checkLoggedIn',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/user/current`, {
        withCredentials: true,
      })
			console.log(response.data.user)
      return response.data
    } catch (error) {
      // If it's a 401 (Unauthorized) or 403 (Forbidden), treat it as a non-error case
      if (error.response?.status === 401 || error.response?.status === 403) {
        return { user: null }
      }
      // Only reject for actual errors (network issues, server errors, etc.)
      if (error.response?.data?.message === 'Token expired') {
        return rejectWithValue('Token expired')
      }
      return rejectWithValue(error.response?.data?.message || 'An error occurred')
    }
  }
)

// Thunk to register a user
export const registerUser = createAsyncThunk(
	'user/registerUser',
	async (userData, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${API_URL}/api/user/register`,
				userData
			)
			return response.data
		} catch (error) {
			return rejectWithValue(
				error.response.data.message || 'An error occurred'
			)
		}
	}
)

// Thunk to login a user
export const loginUser = createAsyncThunk(
	'user/loginUser',
	async (credentials, { dispatch, rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${API_URL}/api/user/login`,
				credentials,
				{
					withCredentials: true,
				}
			)
			dispatch(fetchUserBasket())
			return response.data
		} catch (error) {
			return rejectWithValue(
				error.response.data.message || 'An error occurred'
			)
		}
	}
)

// Thunk to logout a user
export const logoutUser = createAsyncThunk(
	'user/logoutUser',
	async (_, { rejectWithValue }) => {
		try {
			await axios.post(
				`${API_URL}/api/user/logout`,
				{},
				{ withCredentials: true }
			)
			return true
		} catch (error) {
			return rejectWithValue(
				error.response.data.message || 'An error occurred'
			)
		}
	}
)

// Thunk to fetch user profile
export const fetchUserProfile = createAsyncThunk(
	'user/fetchUserProfile',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${API_URL}/api/user/profile`, {
				withCredentials: true,
			})
			return response.data
		} catch (error) {
			return rejectWithValue(
				error.response.data.message || 'An error occurred'
			)
		}
	}
)

export default userSlice.reducer
