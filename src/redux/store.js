import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './slices/userSlice';
import addressReducer from './slices/addressSlice';
import productsReducer from './slices/productsSlice';
import basketReducer from './slices/basketSlice';

// Config for redux-persist (user)
const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['currentUser', 'isLoggedIn'],
}
// Config for redux-persist (address)
const addressPersistConfig = {
  key: 'address',
  storage,
}
// Config for redux-persist (products)
const productsPersistConfig = {
  key: 'products',
  storage,
};

// Persist the user reducer
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

// Persist the address reducer
const persistedAddressReducer = persistReducer(addressPersistConfig, addressReducer);

// Persist the products reducer
const persistedProductsReducer = persistReducer(productsPersistConfig, productsReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    addresses: persistedAddressReducer,
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