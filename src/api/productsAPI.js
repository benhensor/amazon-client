import axios from 'axios';

// Product API
const API_URL = 'https://dummyjson.com';

export const getAllProducts = async () => {
  const response = await axios.get(`${API_URL}/products?limit=0`);
  // console.log('getAllProducts', response.data);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  // console.log('getProductById', response.data);
  return response.data;
}

export const searchProducts = async (query) => {
  const response = await axios.get(`${API_URL}/search?q=${query}&limit=0`);
  // const response = await axios.get(`${API_URL}/api/products/search?q=${query}`);
  // console.log('searchProducts', response.data);
  return response.data;
}

export const sortProducts = async (sort) => {
  const response = await axios.get(`${API_URL}/products?sort=${sort}`);
  // console.log('sortProducts', response.data);
  return response.data;
}

export const getProductCategories = async () => {
  const response = await axios.get(`${API_URL}/products/categories`);
  // console.log('getProductCategories', response.data);
  return response.data;
}

export const getProductCategoryList = async () => {
  const response = await axios.get(`${API_URL}/products/category-list`);
  // console.log('getProductCategoryList', response.data);
  return response.data;
}

export const getProductsByCategory = async (category) => {
  const response = await axios.get(`${API_URL}/products/category/${category}`);
  // console.log('getProductsByCategory', response.data);
  return response.data;
}