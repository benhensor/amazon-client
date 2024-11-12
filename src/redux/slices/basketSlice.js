import { createSlice, createAction, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { getProductById } from '../../api/productsAPI';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Helper function to normalize basket data from API
const normalizeBasketData = async (apiResponse) => {
  if (!apiResponse) return { items: [], total: 0 };
  
  // Handle full basket response
  if (apiResponse.BasketItems) {
    // Fetch all product details in parallel
    const productPromises = apiResponse.BasketItems.map(async (item) => {
      try {
        const product = await getProductById(item.product_id);
        return {
          basketItemId: parseInt(item.basket_item_id, 10),
          ...product,
          quantity: item.quantity,
          is_selected: item.is_selected,
        };
      } catch (error) {
        console.error(`Error fetching product ${item.product_id}:`, error);
        return null;
      }
    });

    const items = (await Promise.all(productPromises)).filter(item => item !== null);
    return { items };
  }
  
  // Handle single item response
  if (apiResponse.basket_item_id && apiResponse.product_id) {
    try {
      const product = await getProductById(apiResponse.product_id);
      return {
        items: [{
          basketItemId: parseInt(apiResponse.basket_item_id, 10),
          ...product,
          quantity: apiResponse.quantity,
        }]
      };
    } catch (error) {
      console.error(`Error fetching product ${apiResponse.product_id}:`, error);
      return { items: [] };
    }
  }
  
  // Handle success message responses (e.g., from delete operation)
  if (apiResponse.message) {
    return { message: apiResponse.message };
  }
  
  console.warn('Unexpected API response format:', apiResponse);
  return { items: [] };
};

const loadBasketFromSession = () => {
  try {
    const savedBasket = sessionStorage.getItem('guestBasket');
    return savedBasket ? JSON.parse(savedBasket) : { items: [] };
  } catch (error) {
    console.error('Error loading basket from session:', error);
    return { items: [] };
  }
};

const initialState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
  ...loadBasketFromSession(),
};


const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === product.id);
      
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += quantity;
      } else {
        state.items.push({ ...product, quantity, basketItemId: `guest-${Date.now()}` });
      }
      // Update session storage with entire basket state
      sessionStorage.setItem('guestBasket', JSON.stringify({
        items: state.items,
        total: calculateTotal(state.items)
      }));
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      sessionStorage.setItem('guestBasket', JSON.stringify({
        items: state.items,
        total: calculateTotal(state.items)
      }));
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.id === productId);
      if (item) {
        item.quantity = quantity;
        sessionStorage.setItem('guestBasket', JSON.stringify({
          items: state.items,
          total: calculateTotal(state.items)
        }));
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
        state.error = null;
      })
      .addCase(fetchUserBasket.fulfilled, (state, action) => {
        state.loading = false;
        // Ensure we're not overwriting existing items if the payload is empty
        if (action.payload.items?.length > 0) {
          state.items = action.payload.items;
          state.total = calculateTotal(state.items);
        }
        state.error = null;
      })
      .addCase(fetchUserBasket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    builder
      .addCase(toggleItemSelected.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleItemSelected.fulfilled, (state, action) => {
        state.loading = false;
        const { basketItemId, is_selected } = action.payload;
      
        // Find and update the is_selected for the item
        const itemIndex = state.items.findIndex(item => item.basketItemId === basketItemId);
        if (itemIndex !== -1) {
          state.items[itemIndex].is_selected = is_selected;
        }
      })
      .addCase(toggleItemSelected.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    builder
      .addCase(toggleGuestItemSelected, (state, action) => {
        const { basketItemId } = action.payload;
        const itemIndex = state.items.findIndex(item => item.basketItemId === basketItemId);
        if (itemIndex !== -1) {
          state.items[itemIndex].is_selected = !state.items[itemIndex].is_selected;
        }
      })  
      
    builder
      .addCase(selectAllItems.fulfilled, (state) => {
        state.items.forEach(item => item.is_selected = true);
      })

    builder
      .addCase(deselectAllItems.fulfilled, (state) => {
        state.items.forEach(item => item.is_selected = false);
      })

    builder
      .addCase(updateItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        const { items } = action.payload;
        if (items?.length > 0) {
          // Update quantities while preserving other items
          const updatedItems = [...state.items];
          items.forEach(newItem => {
            const existingIndex = updatedItems.findIndex(item => item.id === newItem.id);
            if (existingIndex !== -1) {
              updatedItems[existingIndex] = newItem;
            } else {
              updatedItems.push(newItem);
            }
          });
          state.items = updatedItems;
          state.total = calculateTotal(state.items);
        }
      })
      .addCase(updateItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    builder
      .addCase(removeItemFromBasket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeItemFromBasket.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.message) {
          // Remove specific item while keeping others
          state.items = state.items.filter(item => item.basketItemId !== action.meta.arg);
          state.total = calculateTotal(state.items);
        } else if (action.payload.items) {
          // Update with new items list while preserving structure
          state.items = action.payload.items;
          state.total = calculateTotal(state.items);
        }
        state.error = null;
      })
      .addCase(removeItemFromBasket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    builder
      .addCase(clearBasket.fulfilled, (state) => {
        state.items = [];
        state.total = 0;
      })
  }
});

const calculateTotal = (items =[]) => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

// Memoized selectors
export const selectBasket = state => state.basket;

export const selectBasketItems = createSelector(
  [selectBasket],
  basket => basket?.items ?? []
);

export const selectBasketItemCount = createSelector(
  [selectBasketItems],
  items => {
    const count = items.reduce((total, item) => total + (item.quantity || 0), 0);
    console.log('Basket count calculated:', count, items);
    return count;
  }
);

export const selectBasketItemsSelected = createSelector(
  [selectBasketItems],
  items => items.filter(item => item.is_selected)
);

export const selectBasketTotal = createSelector(
  [selectBasketItems],
  (items) => calculateTotal(items)
);

export const { addItem, removeItem, updateQuantity, clearBasket: clearGuestBasket } = basketSlice.actions;

// thunks
export const fetchUserBasket = createAsyncThunk(
  'basket/fetchUserBasket',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      
      if (user?.isLoggedIn) {
        const response = await axios.get(`${API_URL}/api/basket`, { 
          withCredentials: true 
        });
        return await normalizeBasketData(response.data);
      }
      
      // For guest users, return empty basket if no items
      const guestBasket = loadBasketFromSession();
      return guestBasket.items.length > 0 
        ? await normalizeBasketData(guestBasket) 
        : { items: [] };
    } catch (error) {
      console.error('Error fetching basket:', error);
      return rejectWithValue(error.response?.data || 'Failed to fetch basket');
    }
  }
);


export const syncGuestBasket = createAsyncThunk(
  'basket/syncGuestBasket',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { basket } = getState();
      
      console.log('Basket state:', basket); // Debug the basket state here

      // Ensure you're sending only necessary fields from the basket
      const basketItems = basket?.items?.map(item => ({
        productId: item.id,
        quantity: item.quantity,
      })) || [];

      if (basketItems.length === 0) {
        console.log('No items in guest basket to sync.');
        return rejectWithValue('No items to sync');
      }

      const response = await axios.post(
        `${API_URL}/api/basket/sync`, 
        { items: basketItems },  // Send items as an array
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const addItemToBasket = createAsyncThunk(
  'basket/addItemToBasket',
  async ({productId, quantity = 1}, { getState, dispatch, rejectWithValue }) => {
    console.log('Adding item to basket:', productId, quantity);
    try {
      const { user } = getState();
      if (user.isLoggedIn) {
        const response = await axios.post(
          `${API_URL}/api/basket/add`, 
          { productId, quantity }, 
          { withCredentials: true }
        );
        return normalizeBasketData(response.data);
      } else {
        dispatch(addItem({productId, quantity}));
        return productId;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to add item');
    }
  }
);

export const updateItemQuantity = createAsyncThunk(
  'basket/updateItemQuantity',
  async ({ basketItemId, quantity }, { getState, dispatch, rejectWithValue }) => {
    try {
      const { user } = getState();
      if (user.isLoggedIn) {
        const response = await axios.put(
          `${API_URL}/api/basket/update/${basketItemId}`, 
          { quantity }, 
          { withCredentials: true }
        );
        return normalizeBasketData(response.data);
      } else {
        dispatch(updateQuantity({ quantity }));
        return { basketItemId, quantity };
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update quantity');
    }
  }
);

export const toggleItemSelected = createAsyncThunk(
  'basket/toggleItemSelected',
  async (id, { getState, dispatch, rejectWithValue }) => {
    try {
      const { user, basket } = getState();
      const currentItem = basket.items.find(item => item.basketItemId === id);
      const newIsSelected = !currentItem.is_selected;

      if (user.isLoggedIn) {
        await axios.put(
          `${API_URL}/api/basket/select/${id}`,
          { is_selected: newIsSelected },
          { withCredentials: true }
        );
        return { basketItemId: id, is_selected: newIsSelected };
      } else {
        // For guest users, update the local state directly
        dispatch(toggleGuestItemSelected(id));
        return { basketItemId: id, is_selected: newIsSelected };
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update selection');
    }
  }
);

export const selectAllItems = createAsyncThunk(
  'basket/selectAllItems',
  async (_, { getState, dispatch }) => {
    try {
      const { user } = getState();
      if (user.isLoggedIn) {
        const response = await axios.put(`${API_URL}/api/basket/select-all`, {}, { withCredentials: true });
        return response.data;
      } else {
        // For guest users, update all items in the basket
        dispatch(toggleGuestItemSelected('all'));
        return { message: 'All items selected' };
      }
    } catch (error) {
      return error.response?.data || 'Failed to select all items';
    }
  }
);

export const deselectAllItems = createAsyncThunk(
  'basket/deselectAllItems',
  async (_, { getState, dispatch }) => {
    try {
      const { user } = getState();
      if (user.isLoggedIn) {
        const response = await axios.put(`${API_URL}/api/basket/deselect-all`, {}, { withCredentials: true });
        return response.data;
      } else {
        // For guest users, deselect all items in the basket
        dispatch(toggleGuestItemSelected('none'));
        return { message: 'All items deselected' };
      }
    } catch (error) {
      return error.response?.data || 'Failed to deselect all items';
    }
  }
);

// New action creator for guest users
export const toggleGuestItemSelected = createAction(
  'basket/toggleGuestItemSelected',
  (basketItemId) => ({
    payload: { basketItemId }
  })
);

export const removeItemFromBasket = createAsyncThunk(
  'basket/removeItemFromBasket',
  async (basketItemId, { getState, dispatch, rejectWithValue }) => {
    try {
      const { user } = getState();
      if (user.isLoggedIn) {
        const response = await axios.delete(
          `${API_URL}/api/basket/remove/${basketItemId}`, 
          { withCredentials: true }
        );
        const normalizedData = await normalizeBasketData(response.data);
        
        // After successful deletion, fetch the updated basket
        if (normalizedData.message) {
          const updatedBasket = await dispatch(fetchUserBasket()).unwrap();
          return updatedBasket;
        }
        
        return normalizedData;
      } else {
        dispatch(removeItem(basketItemId));
        return { message: 'Item removed from basket' };
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to remove item');
    }
  }
);

export const clearBasket = createAsyncThunk(
  'basket/clearBasket',
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const { user } = getState();
      if (user.isLoggedIn) {
        await axios.delete(`${API_URL}/api/basket/clear`, { withCredentials: true });
      } else {
        dispatch(clearGuestBasket());  // Correct action for guest users
      }
      return true;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export default basketSlice.reducer;