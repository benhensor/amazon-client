import axios from 'axios'
import { store } from '../redux/store'; 
import { logout, setTokens } from '../redux/slices/userSlice'; 

const API_URL = process.env.REACT_APP_API_URL

const userAxios = axios.create({
  baseURL: `${API_URL}/api/user`,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
// Store callbacks for requests that came in while refreshing
let refreshSubscribers = [];

const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const needsRefresh = (token) => {
  const decoded = decodeToken(token);
  if (!decoded) return true;
  
  const expiresIn = decoded.exp * 1000 - Date.now();
  return expiresIn < 5 * 60 * 1000; // 5 minutes
};

// Helper to process queued requests
const processQueue = (error, token = null) => {
  refreshSubscribers.forEach(callback => callback(error, token));
  refreshSubscribers = [];
};

// Modified refresh token logic
const refreshAuthToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) throw new Error('No refresh token available');

  const response = await axios.post(`${API_URL}/api/user/refresh-token`, {
    refreshToken
  });

  const { accessToken, refreshToken: newRefreshToken } = response.data.data;
  
  // Update localStorage
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', newRefreshToken);
  
  // Update Redux state
  store.dispatch(setTokens({ accessToken, refreshToken: newRefreshToken }));
  
  return accessToken;
};

// Add token refresh interceptor
userAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshSubscribers.push((error, token) => {
            if (error) {
              reject(error);
            } else {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axios(originalRequest));
            }
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const accessToken = await refreshAuthToken();
        processQueue(null, accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        store.dispatch(logout());
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Add access token to requests
userAxios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('accessToken');
    
    if (accessToken && needsRefresh(accessToken)) {
      try {
        const newAccessToken = await refreshAuthToken();
        config.headers.Authorization = `Bearer ${newAccessToken}`;
      } catch (error) {
        store.dispatch(logout());
        throw error;
      }
    } else if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

export const userAPI = {
  loginUser: async (credentials) => {
    try {
      const response = await userAxios.post('/login', credentials);
      const { accessToken, refreshToken } = response.data.data;
      
      if (response.data.status.code === 200) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      }
        
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        throw error.response.data;
      }
      throw new Error({
        status: {
        code: 500,
        description: 'An unexpected error occurred'
      }
    });
    }
  },

  registerUser: async (userData) => {
    try {
      const response = await userAxios.post('/register', userData);
      const { accessToken, refreshToken } = response.data.data;
        
      if (response.data.status.code === 201) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      }
        
        return response.data;
    } catch (error) {
      if (error.response?.data) {
        throw error.response.data;
      }
      throw new Error({
          status: {
          code: 500,
          description: 'An unexpected error occurred'
        }
      });
    }
  },

  logoutUser: async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      await userAxios.post('/logout', { refreshToken })
    } finally {
      // Clear tokens regardless of logout success
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
  },

  updateUser: async (userData) => {
    const response = await userAxios.put('/update', userData)
    return response.data
  },

  checkAuth: async () => {
    // If no access token exists, don't even try the request
    // if (!localStorage.getItem('accessToken')) {
    //   throw new Error('No access token')
    // }
    const response = await userAxios.get('/current')
    // console.log('checkAuth response: ', response)
    return response.data
  },

  fetchProfile: async () => {
    const response = await userAxios.get('/profile')
    return response.data
  },

  deleteUser: async () => {
    const response = await userAxios.delete('/delete')
    return response.data
  }
}