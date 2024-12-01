import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import addressReducer from './slices/addressSlice';
import productsReducer from './slices/productsSlice';
import basketReducer from './slices/basketSlice';
import orderReducer from './slices/orderSlice';
import paymentMethodsReducer from './slices/paymentMethodsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    addresses: addressReducer,
    products: productsReducer,
    basket: basketReducer,  // Keep basket separate if it was meant to use sessionStorage or similar
    orders: orderReducer,
    paymentMethods: paymentMethodsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,  // Remove serializable check config if not needed
    }),
});
