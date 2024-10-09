import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    isLoggedIn: false,
    orders: [],
    wishlist: [],
    loading: false,
    error: null
  },
  reducers: {
    setUser(state, action) {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.currentUser = null;
      state.isLoggedIn = false;
      state.orders = [];
      state.wishlist = [];
    },
    addToWishlist(state, action) {
      state.wishlist.push(action.payload);
    },
    removeFromWishlist(state, action) {
      state.wishlist = state.wishlist.filter(item => item.id !== action.payload);
    },
    addOrder(state, action) {
      state.orders.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    // Handle async actions here if needed
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { setUser, logout, addToWishlist, removeFromWishlist, addOrder } = userSlice.actions;

export default userSlice.reducer;