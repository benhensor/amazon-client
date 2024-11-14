import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  status: 'idle',
  error: null,
};

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