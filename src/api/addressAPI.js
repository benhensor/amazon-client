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
    return response.data;
  },

  createAddress: async (addressData) => {
    const response = await addressAxios.post('/add', addressData);
    return response.data;
  },

  setDefaultAddress: async (addressId) => {
    const response = await addressAxios.put(`/default/${addressId}`);
    return response.data;
  },

  updateAddress: async (addressId, addressData) => {
    const response = await addressAxios.put(`/update/${addressId}`, addressData);
    return response.data;
  },

  deleteAddress: async (addressId) => {
    const response = await addressAxios.delete(`/delete/${addressId}`);
    return response.data;
  }
};