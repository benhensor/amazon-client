import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productsReducer from './slices/productsSlice';
import basketReducer from './slices/basketSlice';

// Config for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['products'], // Only persist the 'products' slice
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, productsReducer, basketReducer);

export const store = configureStore({
  reducer: {
    products: persistedReducer,
    basket: basketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions that involve non-serializable values
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
