import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

// Create axios instance just for user endpoints
const userAxios = axios.create({
  baseURL: `${API_URL}/api/user`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Simple interceptor that just prevents 401s from being logged
userAxios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status !== 401) {
      console.error('User API Error:', error)
    }
    return Promise.reject(error)
  }
);

export const userAPI = {
  loginUser: async (credentials) => {
    const response = await userAxios.post('/login', credentials)
    return response.data
  },

  registerUser: async (userData) => {
    const response = await userAxios.post('/register', userData)
    return response.data
  },

  logoutUser: async () => {
    const response = await userAxios.post('/logout', {})
    return response.data
  },

  checkAuth: async () => {
    const response = await userAxios.get('/current')
    return response.data
  },

  fetchProfile: async () => {
    const response = await userAxios.get('/profile')
    return response.data
  }
}