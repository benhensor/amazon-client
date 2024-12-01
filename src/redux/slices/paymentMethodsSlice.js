import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export const fetchPaymentMethods = createAsyncThunk(
	'paymentMethods/fetchPaymentMethods',
	async (_, { rejectWithValue }) => {
		// console.log('fetchPaymentMethods called')
		try {
			const response = await axios.get(
				`${API_URL}/api/payment-methods`,
				{ withCredentials: true }
			)
			// console.log('fetchPaymentMethods return: ', response.data)
			return response.data
		} catch (error) {
			return rejectWithValue(error.response.data)
		}
	}
)

export const setDefaultPaymentMethod = createAsyncThunk(
	'paymentMethods/setDefaultPaymentMethod',
	async (paymentMethodId, { rejectWithValue }) => {
		try {
			const response = await axios.put(
				`${API_URL}/api/payment-methods/default`,
				{},
				{ withCredentials: true }
			)
			console.log('setDefaultPaymentMethod return: ', response.data)
			return response.data
		} catch (error) {
			return rejectWithValue(error.response.data)
		}
	}
)

const paymentMethodsSlice = createSlice({
	name: 'paymentMethods',
	initialState: {
		paymentMethods: [],
		defaultPaymentMethod: null,
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		// Handle fetching payment methods
		builder
			.addCase(fetchPaymentMethods.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchPaymentMethods.fulfilled, (state, action) => {
				state.loading = false
				state.paymentMethods = action.payload  // Set the fetched payment methods
				state.defaultPaymentMethod = action.payload.find((method) => method.status === 'default')  // Set the default payment method
			})
			.addCase(fetchPaymentMethods.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload || 'Failed to fetch payment methods'
			})

		// Handle setting a default payment method
		builder
			.addCase(setDefaultPaymentMethod.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(setDefaultPaymentMethod.fulfilled, (state, action) => {
				state.loading = false
				// Update the default payment method
				state.defaultPaymentMethod = action.payload
				// Update the status of all payment methods
				state.paymentMethods = state.paymentMethods.map((method) =>
					method.payment_method_id === action.payload.payment_method_id
						? { ...method, status: 'default' }
						: { ...method, status: 'valid' }
				)
			})
			.addCase(setDefaultPaymentMethod.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload || 'Failed to set default payment method'
			})

	},
})

export default paymentMethodsSlice.reducer
