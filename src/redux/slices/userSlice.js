import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { userAPI } from '../../api/userAPI'
// import { fetchUserBasket } from './basketSlice'

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
			state.currentUser = action.payload.data.user
			state.isLoggedIn = true
		},
		clearError(state) {
			state.error = null
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
				if (action.payload.status?.code === 200) {
					// console.log('checkLoggedIn', action.payload.data)
					state.currentUser = action.payload.data.user
					state.isLoggedIn = true
				} else {
					state.currentUser = null
					state.isLoggedIn = false
				}
			})
			.addCase(checkLoggedIn.rejected, (state, action) => {
				state.loading = false;
        state.currentUser = null;
        state.isLoggedIn = false;
			})
		// Handle registration
		builder
			.addCase(registerUser.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.loading = false
				state.currentUser = action.payload.data.user
				state.isLoggedIn = true
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading = false
				state.error =
					action.payload?.status?.description || 'An error occurred'
			})

		// Handle login
		builder
			.addCase(loginUser.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false
				state.currentUser = action.payload.data.user
				state.isLoggedIn = true
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload?.status?.description
			})

		// Handle logout
		builder
			.addCase(logoutUser.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.loading = false
				state.currentUser = null
				state.isLoggedIn = false
				state.error = null
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.loading = false;
        state.currentUser = null;
        state.isLoggedIn = false;
			})

		// Handle fetch user profile
		builder
			.addCase(fetchUserProfile.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchUserProfile.fulfilled, (state, action) => {
				state.loading = false
				state.currentUser = action.payload.data.user
				state.isLoggedIn = true
			})
			.addCase(fetchUserProfile.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	},
})

export const { setUser, logout, initializeUser, clearError } = userSlice.actions

// Thunk to check if a user is logged in
export const checkLoggedIn = createAsyncThunk(
  'user/checkLoggedIn',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userAPI.checkAuth();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await userAPI.registerUser(userData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          status: {
            description: 'An error occurred',
          },
        }
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await userAPI.loginUser(userData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          status: {
            description: 'An error occurred',
          },
        }
      );
    }
  }
);

// Thunk to logout a user
export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { dispatch }) => {
    try {
      await userAPI.logoutUser();
      dispatch(logout());
    } catch (error) {
      dispatch(logout());
      throw error;
    }
  }
);

// Thunk to fetch user profile
export const fetchUserProfile = createAsyncThunk(
	'user/fetchUserProfile',
	async (_, { rejectWithValue }) => {
		try {
			const response = await userAPI.fetchProfile()
			return response
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || 'An error occurred'
			)
		}
	}
)

export default userSlice.reducer
