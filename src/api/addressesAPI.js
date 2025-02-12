import axios from 'axios';
import { isAuthenticated } from '../utils/auth';

const API_URL = process.env.REACT_APP_API_URL;

const addressAxios = axios.create({
  baseURL: `${API_URL}/api/addresses`,
  headers: {
    'Content-Type': 'application/json',
  }
});

addressAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // console.log('interceptor config: ', config);
    return config;
  },
  (error) => Promise.reject(error)
);

export const addressAPI = {
  fetchAddresses: async () => {
    if (!isAuthenticated()) {
      return [];
    }
    const response = await addressAxios.get('/');
    // console.log('fetchAddresses response: ', response.data);
    return response.data;
  },

  createAddress: async (addressData) => {
    // console.log('createAddress addressData: ', addressData);
    const response = await addressAxios.post('/add', addressData);
    // console.log('createAddress response: ', response.data);
    return response.data;
  },

  setDefaultAddress: async (addressId) => {
    // console.log('setDefaultAddress addressId: ', addressId);
    const response = await addressAxios.put(`/default/${addressId}`);
    // console.log('setDefaultAddress response: ', response.data);
    return response.data;
  },

  updateAddress: async (addressId, addressData) => {
    // console.log('updateAddress addressId: ', addressId);
    const response = await addressAxios.put(`/update/${addressId}`, addressData);
    // console.log('updateAddress response: ', response.data);
    return response.data;
  },

  deleteAddress: async (addressId) => {
    // console.log('deleteAddress addressId: ', addressId);
    const response = await addressAxios.delete(`/delete/${addressId}`);
    // console.log('deleteAddress response: ', response.data);
    return response.data.data;
  }
};