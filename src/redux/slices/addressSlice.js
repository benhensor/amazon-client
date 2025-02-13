import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addressAPI } from '../../api/addressesAPI';
import { handleApiError } from '../../utils/errorHandler';

export const fetchAddresses = createAsyncThunk(
  'address/fetchAddresses',
  async (_, thunkAPI) => {
    try {
      const response = await addressAPI.fetchAddresses();
      // console.log('fetchAddresses response: ', response);
      return response || [];
    } catch (error) {
      // For unauthorized requests (401) or any auth-related errors, 
			// silently return null without logging the error
			if (error.response?.status.code === 401 || error.message?.includes('Unauthorized')) {
				return null;
			}
      return handleApiError(error, thunkAPI);
    }
  }
);

export const createNewAddress = createAsyncThunk(
  'address/addAddress',
  async (addressData, thunkAPI) => {
    try {
      const response = await addressAPI.createAddress(addressData);
      // console.log('createNewAddress response: ', response);
      return response;
    } catch (error) {
      return handleApiError(error, thunkAPI);
    }
  }
);

export const setDefaultAddress = createAsyncThunk(
  'address/setDefaultAddress',
  async (addressId, thunkAPI) => {
    try {
      const response = await addressAPI.setDefaultAddress(addressId);
      // console.log('setDefaultAddress response: ', response);
      return response;
    } catch (error) {
      return handleApiError(error, thunkAPI);
    }
  }
);

export const updateAddress = createAsyncThunk(
  'address/updateAddress',
  async ({ addressId, addressData }, thunkAPI) => {
    try {
      const response = await addressAPI.updateAddress(addressId, addressData);
      // console.log('updateAddress response: ', response);
      return response;
    } catch (error) {
      return handleApiError(error, thunkAPI);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  'address/deleteAddress',
  async (addressId, thunkAPI) => {
    try {
      const response = await addressAPI.deleteAddress(addressId);
      // console.log('deleteAddress response: ', response);
      return response.data.address_id;
    } catch (error) {
      return handleApiError(error, thunkAPI);
    }
  }
);

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    addresses: [],
    defaultAddress: null,
    loading: false,
    error: null,
  },
  reducers: {
    addAddress(state, action) {
      state.addresses.push(action.payload);
    },
    removeAddress(state, action) {
      state.addresses = state.addresses.filter(
        (address) => address.address_id !== action.payload
      );
    },
    clearAddresses(state) {
      state.addresses = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch addresses
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload.data || [];
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.status?.description;
        if (action.payload?.status?.code === 401) {
          state.addresses = [];
        }
      })
      // Create address
      .addCase(createNewAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses.push(action.payload.data);
      })
      .addCase(createNewAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.status?.description;
      })
      // Set default address
      .addCase(setDefaultAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setDefaultAddress.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.addresses)) {
          state.addresses = state.addresses.map((address) => ({
            ...address,
            is_default: address.address_id === action.meta.arg,
          }));
        }
      })
      .addCase(setDefaultAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.status?.description;
      })
      // Update address
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.addresses.findIndex(
          (address) => address.address_id === action.payload.id
        );
        if (index !== -1) {
          state.addresses[index] = action.payload;
        }
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.status?.description;
      })
      // Delete address
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = state.addresses.filter(
          (addr) => addr.address_id !== action.payload
        );
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.status?.description;
      })
      // Handle user logout
      .addCase('user/logout', (state) => {
        state.addresses = [];
        state.error = null;
        state.loading = false;
      });
  },
});

export const { addAddress, removeAddress, clearAddresses } = addressSlice.actions;
export default addressSlice.reducer;