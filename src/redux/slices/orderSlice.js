import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchOrderedProducts } from './productsSlice'
import { orderAPI } from '../../api/orderAPI'

const initialState = {
	orders: [],
	status: 'idle',
	error: null,
}

export const createOrder = createAsyncThunk(
	'orders/add',
	async (orderData, { rejectWithValue }) => {
		try {
			const response = await orderAPI.createOrder(orderData)
			// console.log('createOrder return: ', response.data)
			return response.data.order // Return the order object
		} catch (error) {
			return rejectWithValue(error.response.data)
		}
	}
)

export const fetchOrderById = createAsyncThunk(
	'orders/fetchOrderById',
	async (orderId, { rejectWithValue }) => {
		try {
			const response = await orderAPI.fetchOrderById(orderId)
			// console.log('fetchOrderById return: ', response.data.order)
			return response.data.order
		} catch (error) {
			return rejectWithValue(error.response.data)
		}
	}
)

export const fetchOrders = createAsyncThunk(
	'orders/fetchOrders',
	async (_, { dispatch, rejectWithValue }) => {
		try {
			const response = await orderAPI.fetchOrders()
			const orders = response.data.orders
			// console.log('Orders fetched:', orders) // Check orders data

			await dispatch(fetchOrderedProducts(orders))
			// console.log('Products fetched:', productResponse)
			return response.data.orders
		} catch (error) {
			throw rejectWithValue(error.response.data)
		}
	}
)

export const updateOrderStatus = createAsyncThunk(
	'orders/updateOrderStatus',
	async ({ orderId, status }, { rejectWithValue }) => {
		try {
			// console.log('updateOrderStatus', orderId, status)
			const response = await orderAPI.updateOrderStatus(orderId, {
				status,
			})
			// console.log('updateOrderStatus return: ', response)
			return response.data.order
		} catch (error) {
			return rejectWithValue(error.response.data)
		}
	}
)

export const deleteOrderById = createAsyncThunk(
	'orders/deleteOrder',
	async (orderId, { rejectWithValue }) => {
		try {
			const response = await orderAPI.deleteOrder(orderId)
			console.log('deleteOrder return: ', response.data)
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
			// Create Order
			.addCase(createOrder.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(createOrder.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.orders.push(action.payload)
			})
			.addCase(createOrder.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload || action.error.message
			})
			// Fetch Order By Id
			.addCase(fetchOrderById.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchOrderById.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.orders.push(action.payload)
			})
			.addCase(fetchOrderById.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload || action.error.message
			})
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
			// Update Order Status
			.addCase(updateOrderStatus.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(updateOrderStatus.fulfilled, (state, action) => {
				state.status = 'succeeded'
				const updatedOrder = action.payload
				const index = state.orders.findIndex(
					(order) => order.order_id === updatedOrder.order_id
				)
				if (index !== -1) {
					state.orders[index] = updatedOrder
				}
			})
			.addCase(updateOrderStatus.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload || action.error.message
			})
			// Delete Order
			.addCase(deleteOrderById.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(deleteOrderById.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.orders = state.orders.filter(
					(order) => order.order_id !== action.payload
				)
			})
			.addCase(deleteOrderById.rejected, (state, action) => {
				state.error = action.payload || action.error.message
			})
	},
})

export const { addOrder, deleteOrder } = orderSlice.actions

export default orderSlice.reducer
