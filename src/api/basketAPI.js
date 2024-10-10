import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const basketAPI = {
  getBasket: async () => {
    const response = await axios.get(`${API_URL}/basket`);
    return response.data;
  },

  addItemToBasket: async (productData) => {
    const response = await axios.post(`${API_URL}/basket/add`, productData);
    return response.data;
  },

  removeItemFromBasket: async (id) => {
    const response = await axios.delete(`${API_URL}/basket/remove`, { data: { id } });
    return response.data;
  },

  clearBasket: async () => {
    await axios.delete(`${API_URL}/basket/clear`);
  }
};