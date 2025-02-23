import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { paymentMethodsAPI } from '../../api/paymentMethodsAPI'

export const fetchPaymentMethods = createAsyncThunk(
	'paymentMethods/fetchPaymentMethods',
	async (_, { dispatch, rejectWithValue }) => {
		// console.log('fetchPaymentMethods called')
		try {
			const response = await paymentMethodsAPI.fetchPaymentMethods()
			// console.log('fetchPaymentMethods return: ', response.data)
			return response.data
		} catch (error) {
			return rejectWithValue(error.response.data)
		}
	}
)

export const addPaymentMethod = createAsyncThunk(
	'paymentMethods/addPaymentMethod',
	async (paymentMethodData, { rejectWithValue }) => {
		try {
			const response = await paymentMethodsAPI.addPaymentMethod(
				paymentMethodData
			)
			// console.log('addPaymentMethod return: ', response.data)
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
			const response = await paymentMethodsAPI.setDefaultPaymentMethod(
				paymentMethodId
			)
			// console.log('setDefaultPaymentMethod return: ', response.data)
			return response.data
		} catch (error) {
			return rejectWithValue(error.response.data)
		}
	}
)

export const deletePaymentMethod = createAsyncThunk(
	'paymentMethods/deletePaymentMethod',
	async (paymentMethodId, { rejectWithValue }) => {
		try {
			const response = await paymentMethodsAPI.deletePaymentMethod(
				paymentMethodId
			)
			// console.log('deletePaymentMethod return: ', response.data)
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
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload
		},
		setError: (state, action) => {
			state.error = action.payload
		},
	},
	extraReducers: (builder) => {
		// Handle fetching payment methods
		builder
			.addCase(fetchPaymentMethods.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchPaymentMethods.fulfilled, (state, action) => {
				state.loading = false
				// Access the payment methods array from the data property
				state.paymentMethods = action.payload || []
				state.defaultPaymentMethod = state.paymentMethods.find((method) => method.status === 'default')
			})
			.addCase(fetchPaymentMethods.rejected, (state, action) => {
				state.loading = false
				state.error =
					action.payload || 'Failed to fetch payment methods'
			})

		// Handle adding a payment method
		builder
			.addCase(addPaymentMethod.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(addPaymentMethod.fulfilled, (state, action) => {
				state.loading = false
				// Safely access the payment method data from the response
				const newPaymentMethod = action.payload
				if (newPaymentMethod) {
					// Ensure paymentMethods is an array before pushing
					if (!Array.isArray(state.paymentMethods)) {
						state.paymentMethods = []
					}

					state.paymentMethods.push(newPaymentMethod)

					if (newPaymentMethod.status === 'default') {
						// Update the status of all other payment methods
						state.paymentMethods = state.paymentMethods.map(
							(method) =>
								method.payment_method_id !==
								newPaymentMethod.payment_method_id
									? { ...method, status: 'valid' }
									: method
						)
						state.defaultPaymentMethod = newPaymentMethod
					}
				}
			})
			.addCase(addPaymentMethod.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload || 'Failed to add payment method'
			})

		// Handle setting a default payment method
		builder
			.addCase(setDefaultPaymentMethod.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(setDefaultPaymentMethod.fulfilled, (state, action) => {
				state.loading = false
				state.defaultPaymentMethod = action.payload
				state.paymentMethods = state.paymentMethods.map((method) =>
					method.payment_method_id ===
					action.payload.payment_method_id
						? { ...method, status: 'default' }
						: { ...method, status: 'valid' }
				)
			})
			.addCase(setDefaultPaymentMethod.rejected, (state, action) => {
				state.loading = false
				state.error =
					action.payload || 'Failed to set default payment method'
			})

		// Handle deleting a payment method
		builder
			.addCase(deletePaymentMethod.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(deletePaymentMethod.fulfilled, (state, action) => {
				state.loading = false
				state.paymentMethods = state.paymentMethods.filter(
					(method) => method.payment_method_id !== action.meta.arg
				)
				if (
					state.defaultPaymentMethod?.payment_method_id ===
					action.meta.arg
				) {
					state.defaultPaymentMethod = null
				}
			})
			.addCase(deletePaymentMethod.rejected, (state, action) => {
				state.loading = false
				state.error =
					action.payload || 'Failed to delete payment method'
			})
	},
})

export const { setLoading, setError } = paymentMethodsSlice.actions

export default paymentMethodsSlice.reducer
