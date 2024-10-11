import { createSlice } from '@reduxjs/toolkit';

const loadBasketFromSession = () => {
  const savedBasket = sessionStorage.getItem('guestBasket');
  return savedBasket ? JSON.parse(savedBasket) : { items: [], total: 0 };
};

const initialState = loadBasketFromSession();

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
});

export const selectBasket = state => state.basket || initialState;
export const selectBasketItems = state => {
  const items = state.basket?.items || [];
  return items;
};
export const selectBasketTotal = state => selectBasket(state).total;
export const selectBasketItemCount = state => 
  selectBasketItems(state).reduce((total, item) => total + item.quantity, 0);

export const { addItem, removeItem, updateQuantity, clearBasket } = basketSlice.actions;
export default basketSlice.reducer;