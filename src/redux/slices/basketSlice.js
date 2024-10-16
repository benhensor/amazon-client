import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const loadBasketFromSession = () => {
  const savedBasket = sessionStorage.getItem('guestBasket');
  return savedBasket ? JSON.parse(savedBasket) : { items: [], total: 0 };
};

const initialState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
  ...loadBasketFromSession(),
};

// thunks
export const fetchUserBasket = createAsyncThunk(
  'basket/fetchUserBasket',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/basket`, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addItemToBasket = createAsyncThunk(
  'basket/addItemToBasket',
  async (product, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      if (user.isLoggedIn) {
        const response = await axios.post(`${API_URL}/api/basket/add`, product, { withCredentials: true });
        return response.data;
      } else {
        return product;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateItemQuantity = createAsyncThunk(
  'basket/updateItemQuantity',
  async ({ id, quantity }, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      if (user.isLoggedIn) {
        const response = await axios.put(`${API_URL}/api/basket/update/${id}`, { quantity }, { withCredentials: true });
        return response.data;
      } else {
        return { id, quantity };
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeItemFromBasket = createAsyncThunk(
  'basket/removeItemFromBasket',
  async (productId, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      if (user.isLoggedIn) {
        await axios.delete(`${API_URL}/api/basket/remove/${productId}`, { withCredentials: true });
      }
      return productId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const clearBasket = createAsyncThunk(
  'basket/clearBasket',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      if (user.isLoggedIn) {
        await axios.delete(`${API_URL}/api/basket/clear`, { withCredentials: true });
      }
      return true;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const product = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === product.id);
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      state.total = state.items.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
      );
      sessionStorage.setItem('guestBasket', JSON.stringify(state));
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total = state.items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
      sessionStorage.setItem('guestBasket', JSON.stringify(state));
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        state.total = state.items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
        sessionStorage.setItem('guestBasket', JSON.stringify(state));
      }
    },
    clearBasket: (state) => {
      state.items = [];
      state.total = 0;
      sessionStorage.removeItem('guestBasket');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBasket.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserBasket.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.total = action.payload.total;
      })
      .addCase(fetchUserBasket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addItemToBasket.fulfilled, (state, action) => {
        const newItem = action.payload;
        const existingItem = state.items.find(item => item.id === newItem.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push({ ...newItem, quantity: 1 });
        }
        state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      })
      .addCase(removeItemFromBasket.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
        state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        const { id, quantity } = action.payload;
        const item = state.items.find(item => item.id === id);
        if (item) {
          item.quantity = quantity;
          state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        }
      })
      .addCase(clearBasket.fulfilled, (state) => {
        state.items = [];
        state.total = 0;
      });
  },
});

export const selectBasket = state => state.basket || initialState;
export const selectBasketItems = state => {
  const items = state.basket?.items || [];
  return items;
};
export const selectBasketTotal = state => selectBasket(state).total;
export const selectBasketItemCount = state => 
  selectBasketItems(state).reduce((total, item) => total + item.quantity, 0);

export const { addItem, removeItem, updateQuantity, clearBasket: clearGuestBasket } = basketSlice.actions;
export default basketSlice.reducer;