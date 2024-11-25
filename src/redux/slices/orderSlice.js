import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

const initialState = {
	orders: [],
	status: 'idle',
	error: null,
}

export const createOrder = createAsyncThunk(
	'orders/add',
	async (orderData, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${API_URL}/api/orders/add`,
				orderData,
				{ withCredentials: true }
			)
			console.log('createOrder return: ', response.data.orders)
			return response.data.orders // Return the order object
		} catch (error) {
			return rejectWithValue(error.response.data)
		}
	}
)

export const fetchOrders = createAsyncThunk(
	'orders/fetchOrders',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${API_URL}/api/orders/fetch`, {
				withCredentials: true,
			})
			console.log('fetchOrders return: ', response.data.orders)
			return response.data.orders
		} catch (error) {
			throw rejectWithValue(error.response.data)
		}
	}
)



export const deleteOrderById = createAsyncThunk(
	'orders/deleteOrder',
	async (orderId, { rejectWithValue }) => {
		try {
			const response = await axios.delete(
				`${API_URL}/api/orders/delete/${orderId}`,
				{ withCredentials: true }
			)
			return response.data
		} catch (error) {
			return rejectWithValue(error.response.data)
		}
	}
)

const orderSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// Fetch Orders
			.addCase(fetchOrders.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchOrders.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.orders = action.payload
			})
			.addCase(fetchOrders.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload || action.error.message
			})
			// Delete Order
			.addCase(deleteOrderById.fulfilled, (state, action) => {
				const deletedOrderId = action.meta.arg // The `orderId` passed to the thunk
				state.orders = state.orders.filter(
					(order) => order.order_id !== deletedOrderId
				)
			})
			.addCase(deleteOrderById.rejected, (state, action) => {
				state.error = action.payload || action.error.message
			})
	},
})

export const { addOrder, deleteOrder, updateOrderStatus } = orderSlice.actions

export default orderSlice.reducer
