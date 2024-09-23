import axios from 'axios';

// Product API

export const getAllProducts = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
  // console.log('getAllProducts', response.data);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/${id}`);
  // console.log('getProductById', response.data);
  return response.data;
}

export const searchProducts = async (query) => {
  const response = await axios.get(`https://dummyjson.com/products/search?q=${query}&limit=0`);
  // const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/search?q=${query}`);
  // console.log('searchProducts', response.data);
  return response.data;
}

export const sortProducts = async (sort) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products?sort=${sort}`);
  // console.log('sortProducts', response.data);
  return response.data;
}

export const getProductCategories = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/categories`);
  // console.log('getProductCategories', response.data);
  return response.data;
}

export const getProductCategoryList = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/category-list`);
  // console.log('getProductCategoryList', response.data);
  return response.data;
}

export const getProductsByCategory = async (category) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/category/${category}`);
  // console.log('getProductsByCategory', response.data);
  return response.data;
}