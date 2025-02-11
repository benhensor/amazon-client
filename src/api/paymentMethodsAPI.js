import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const paymentMethodsAxios = axios.create({
  baseURL: `${API_URL}/api/payment-methods`,
  headers: {
    'Content-Type': 'application/json',
  },
});

paymentMethodsAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const paymentMethodsAPI = {
  fetchPaymentMethods: async () => {
    const response = await paymentMethodsAxios.get('/');
    console.log('fetchPaymentMethods return: ', response.data);
    return response.data;
  },
  addPaymentMethod: async (paymentMethodData) => {
    const response = await paymentMethodsAxios.post('/', paymentMethodData);
    return response.data;
  },
  setDefaultPaymentMethod: async (paymentMethodId) => {
    const response = await paymentMethodsAxios.put(`/${paymentMethodId}`);
    return response.data;
  },
  deletePaymentMethod: async (paymentMethodId) => {
    const response = await paymentMethodsAxios.delete(`/${paymentMethodId}`);
    return response.data;
  }
};