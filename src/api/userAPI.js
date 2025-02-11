import axios from 'axios'

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

// Helper to process queued requests
const processQueue = (error, token = null) => {
  refreshSubscribers.forEach(callback => callback(error, token));
  refreshSubscribers = [];
};

// Add token refresh interceptor
userAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error wasn't 401 or request was for refreshing token, reject
    if (error.response?.status !== 401 || originalRequest.url === '/refresh-token') {
      return Promise.reject(error);
    }

    // If not refreshing already, initiate refresh
    if (!isRefreshing) {
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Call refresh token endpoint
        const response = await axios.post(`${API_URL}/api/user/refresh-token`, {
          refreshToken
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data.data;
        
        // Store new tokens
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        // Process queued requests with new token
        processQueue(null, accessToken);
        
        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);

      } catch (refreshError) {
        // Process queued requests with error
        processQueue(refreshError, null);
        
        // Clear tokens and reject
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // If already refreshing, queue this request
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
);

// Add access token to requests
userAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
);

export const userAPI = {
  loginUser: async (credentials) => {
    const response = await userAxios.post('/login', credentials)
    const { accessToken, refreshToken } = response.data.data
    
    // Store both tokens
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    
    return response.data
  },

  registerUser: async (userData) => {
    const response = await userAxios.post('/register', userData)
    const { accessToken, refreshToken } = response.data.data
    
    // Store both tokens
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    
    return response.data
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

  checkAuth: async () => {
    // If no access token exists, don't even try the request
    if (!localStorage.getItem('accessToken')) {
      throw new Error('No access token')
    }
    const response = await userAxios.get('/current')
    return response.data
  },

  fetchProfile: async () => {
    const response = await userAxios.get('/profile')
    return response.data
  }
}