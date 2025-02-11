import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const orderAxios = axios.create({
  baseURL: `${API_URL}/api/order`,
  headers: {
    'Content-Type': 'application/json',
  },
});

orderAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const orderAPI = {
  createOrder: async (orderData) => {
    const response = await orderAxios.post('/add', orderData);
    return response.data;
  },
  fetchOrderById: async (orderId) => {
    const response = await orderAxios.get(`/fetch/${orderId}`);
    return response.data;
  },
  fetchOrders: async () => {
    const response = await orderAxios.get('/fetch');
    return response.data;
  },
  updateOrderStatus: async (orderId, orderData) => {
    const response = await orderAxios.put(`/update/${orderId}`, orderData);
    return response.data;
  },
  deleteOrder: async (orderId) => {
    const response = await orderAxios.delete(`/delete/${orderId}`);
    return response.data;
  },
};