import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productsReducer from './slices/productsSlice';
import basketReducer from './slices/basketSlice';

// Config for redux-persist (products)
const productsPersistConfig = {
  key: 'products',
  storage,
};

// Persist only the products reducer
const persistedProductsReducer = persistReducer(productsPersistConfig, productsReducer);

export const store = configureStore({
  reducer: {
    products: persistedProductsReducer,
    basket: basketReducer,  // Keep basket separate, as it uses sessionStorage
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);