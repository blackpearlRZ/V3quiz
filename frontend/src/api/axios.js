import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  // Remove withCredentials as we're using tokens now
});

// Add request interceptor to include the token
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export { axiosClient };