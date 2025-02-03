import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

const addressSlice = createSlice({
	name: 'address',
	initialState: {
		addresses: [],
		loading: false,
		error: null,
	},
	reducers: {
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
		// Handle fetch addresses
		builder
			.addCase(fetchAddresses.pending, (state) => {
				state.loading = true
				state.error = null
				state.addresses = state.addresses || []
			})
			.addCase(fetchAddresses.fulfilled, (state, action) => {
				state.loading = false
				state.addresses = action.payload.data || []
			})
			.addCase(fetchAddresses.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
				state.addresses = state.addresses || []
			})

		// Handle add address
		builder
			.addCase(createNewAddress.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(createNewAddress.fulfilled, (state, action) => {
				state.loading = false
				if (!Array.isArray(state.addresses)) {
					state.addresses = []
				}
				state.addresses.push(action.payload.data)
			})
			.addCase(createNewAddress.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})

		// Handle set default address
		builder
			.addCase(setDefaultAddress.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(setDefaultAddress.fulfilled, (state, action) => {
				state.loading = false
				if (Array.isArray(state.addresses)) {
					state.addresses = state.addresses.map((address) => ({
						...address,
						is_default: address.address_id === action.meta.arg,
					}))
				}
			})
			.addCase(setDefaultAddress.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})

		// Handle update address
		builder
			.addCase(updateAddress.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(updateAddress.fulfilled, (state, action) => {
				state.loading = false
				const index = state.addresses.findIndex(
					(address) => address.address_id === action.payload.id
				)
				if (index !== -1) {
					state.addresses[index] = action.payload
				}
			})
			.addCase(updateAddress.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})

		// Handle delete address
		builder
			.addCase(deleteAddress.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(deleteAddress.fulfilled, (state, action) => {
				state.loading = false
				state.addresses = state.addresses.filter(
					(addr) => addr.address_id !== action.payload
				)
				// console.log('Addresses after filter:', state.addresses)
			})
			.addCase(deleteAddress.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	},
})

export const { addAddress, removeAddress } = addressSlice.actions

// Thunk to fetch all addresses
export const fetchAddresses = createAsyncThunk(
	'address/fetchAddresses',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${API_URL}/api/addresses`, {
				withCredentials: true,
			})
			// console.log('fetchAddresses response:', response.data)
			return response.data
		} catch (error) {
			return rejectWithValue(
				error.response.data.message || 'An error occurred'
			)
		}
	}
)

// Thunk to add an address
export const createNewAddress = createAsyncThunk(
	'address/addAddress',
	async (addressData, { rejectWithValue }) => {
		try {
			console.log('createNewAddress', addressData)
			const response = await axios.post(
				`${API_URL}/api/addresses/add`,
				addressData,
				{
					withCredentials: true,
				}
			)
			return response.data
		} catch (error) {
			return rejectWithValue(
				error.response.data.message || 'An error occurred'
			)
		}
	}
)

// Thunk to set an address as default
export const setDefaultAddress = createAsyncThunk(
	'address/setDefaultAddress',
	async (addressId, { rejectWithValue }) => {
		try {
			const response = await axios.put(
				`${API_URL}/api/addresses/default/${addressId}`,
				{},
				{
					withCredentials: true,
				}
			)
			// console.log('Set default response:', response.data)
			return response.data
		} catch (error) {
			return rejectWithValue(
				error.response.data.message || 'An error occurred'
			)
		}
	}
)

// Thunk to update an address
export const updateAddress = createAsyncThunk(
	'address/updateAddress',
	async ({ addressId, addressData }, { rejectWithValue }) => {
		// console.log('updateAddress thunk:', addressId, addressData)
		try {
			const response = await axios.put(
				`${API_URL}/api/addresses/update/${addressId}`,
				addressData,
				{
					withCredentials: true,
				}
			)
			// console.log('update address response:', response.data)
			return response.data
		} catch (error) {
			return rejectWithValue(
				error.response.data.message || 'An error occurred'
			)
		}
	}
)

// Thunk to delete an address
export const deleteAddress = createAsyncThunk(
	'address/deleteAddress',
	async (addressId, { rejectWithValue }) => {
		try {
			const response = await axios.delete(
				`${API_URL}/api/addresses/delete/${addressId}`,
				{
					withCredentials: true,
				}
			)
			// console.log('Delete response:', response.data)
			const deletedId = response.data.data.address_id
			// Convert to number if it's a string
			return typeof deletedId === 'string'
				? parseInt(deletedId, 10)
				: deletedId
		} catch (error) {
			console.error('Delete error:', error.response?.data)
			return rejectWithValue(
				error.response?.data?.message || 'An error occurred'
			)
		}
	}
)

export default addressSlice.reducer
