import axios from 'axios';

// Product API

export const getAllProducts = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
  return response.data;
};

export const getSingleProduct = async (id) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/${id}`);
  return response.data;
}

export const searchProducts = async (query) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/search?q=${query}`);
  return response.data;
}

export const sortProducts = async (sort) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products?sort=${sort}`);
  return response.data;
}

export const getProductCategories = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/categories`);
  return response.data;
}

export const getProductsCategoryList = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/category-list`);
  return response.data;
}

export const getProductsByCategory = async (category) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/category/${category}`);
  return response.data;
}