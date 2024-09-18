// slices/productsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  status: 'idle',
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setProducts, setStatus, setError } = productsSlice.actions;

export default productsSlice.reducer;

// Thunks for async actions
export const fetchProducts = () => async (dispatch) => {
  dispatch(setStatus('loading'));
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
    dispatch(setProducts(response.data.products));
    dispatch(setStatus('succeeded'));
  } catch (error) {
    dispatch(setError(error.toString()));
    dispatch(setStatus('failed'));
  }
};