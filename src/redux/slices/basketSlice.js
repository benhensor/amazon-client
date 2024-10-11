import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { basketAPI } from '../../api/basketAPI';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

// Async thunks
export const fetchBasketItems = createAsyncThunk(
  'basket/fetchItems',
  async (_, { rejectWithValue }) => {
    try {
      return await basketAPI.getBasketItems();
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch basket items');
    }
  }
);

export const addToBasket = createAsyncThunk(
  'basket/add',
  async (newItem, { rejectWithValue }) => {
    try {
      console.log('product', newItem.product, 'quantity', newItem.quantity);
      return await basketAPI.addItemToBasket({
        product: newItem.product,
        quantity: newItem.quantity, 
      });
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to add item to basket');
    }
  }
);

export const removeFromBasket = createAsyncThunk(
  'basket/removeItem',
  async (id, { rejectWithValue }) => {
    try {
      await basketAPI.removeItemFromBasket(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to remove item from basket');
    }
  }
);

export const updateBasketItemQuantity = createAsyncThunk(
  'basket/updateItemQuantity',
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      return await basketAPI.updateItemQuantity(id, quantity);
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update item quantity');
    }
  }
);

export const clearBasket = createAsyncThunk(
  'basket/clearBasket',
  async (_, { rejectWithValue }) => {
    try {
      await basketAPI.clearBasket();
      return;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to clear basket');
    }
  }
);

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch basket items
      .addCase(fetchBasketItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBasketItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.totalQuantity = action.payload.reduce((total, item) => total + item.quantity, 0);
        state.totalAmount = action.payload.reduce((total, item) => total + (item.price * item.quantity), 0);
      })
      .addCase(fetchBasketItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Add to basket
      .addCase(addToBasket.fulfilled, (state, action) => {
        const newItem = action.payload;
        const existingItemIndex = state.items.findIndex(item => item.id === newItem.id);
        
        if (existingItemIndex >= 0) {
          state.items[existingItemIndex].quantity++;
          state.items[existingItemIndex].totalPrice += newItem.price;
        } else {
          state.items.push({
            ...newItem,
            quantity: 1,
            totalPrice: newItem.price
          });
        }
        
        state.totalQuantity++;
        state.totalAmount += newItem.price;
      })
      
      // Remove from basket
      .addCase(removeFromBasket.fulfilled, (state, action) => {
        const id = action.payload;
        const existingItem = state.items.find(item => item.id === id);
        
        if (existingItem) {
          state.totalQuantity--;
          state.totalAmount -= existingItem.price;
          
          if (existingItem.quantity === 1) {
            state.items = state.items.filter(item => item.id !== id);
          } else {
            existingItem.quantity--;
            existingItem.totalPrice -= existingItem.price;
          }
        }
      })
      
      // Update basket item quantity
      .addCase(updateBasketItemQuantity.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        const existingItem = state.items.find(item => item.id === updatedItem.id);
        
        if (existingItem) {
          const quantityDifference = updatedItem.quantity - existingItem.quantity;
          existingItem.quantity = updatedItem.quantity;
          existingItem.totalPrice = updatedItem.quantity * existingItem.price;
          
          state.totalQuantity += quantityDifference;
          state.totalAmount += quantityDifference * existingItem.price;
        }
      })
      
      // Clear basket
      .addCase(clearBasket.fulfilled, (state) => {
        return initialState;
      });
  }
});

// Selectors
export const selectBasketItems = state => state.basket.items;
export const selectBasketTotalQuantity = state => state.basket.totalQuantity;
export const selectBasketTotalAmount = state => state.basket.totalAmount;
export const selectBasketStatus = state => state.basket.status;
export const selectBasketError = state => state.basket.error;

export default basketSlice.reducer;