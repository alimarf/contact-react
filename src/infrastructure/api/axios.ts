import axios from 'axios';

// Get API base URL from environment variables or use default
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Create a shared axios instance with common configuration
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for common error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors here (e.g., 401 Unauthorized, 403 Forbidden)
    if (error.response) {
      const { status } = error.response;
      
      if (status === 401) {
        // Handle unauthorized (e.g., redirect to login)
        localStorage.removeItem('auth_token');
        // You might want to redirect to login page or dispatch an action
      }
      
      if (status === 403) {
        // Handle forbidden
        console.error('Access forbidden');
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
