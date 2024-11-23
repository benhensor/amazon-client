import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const initialState = {
  orders: [],
  status: 'idle',
  error: null,
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {

})

export const createOrder = createAsyncThunk('orders/createOrder', async (orderData) => {
  const response = await axios.post(`${API_URL}/api/orders`, orderData, {
    withCredentials: true,
  });
  return response.data;
});



const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    removeOrder: (state, action) => {
      state.orders = state.orders.filter(order => order.id !== action.payload.id);
    },
    updateOrderStatus: (state, action) => {
      const order = state.orders.find(order => order.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase('orders/fetchOrders/pending', (state) => {
        state.status = 'loading';
      })
      .addCase('orders/fetchOrders/fulfilled', (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase('orders/fetchOrders/rejected', (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addOrder, removeOrder, updateOrderStatus } = orderSlice.actions;

export default orderSlice.reducer;