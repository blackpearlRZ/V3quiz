import { axiosClient } from '../../api/axios';

export const register = async (data) => {
  const response = await axiosClient.post('/api/register', data);
  // Store the token in localStorage
  localStorage.setItem('auth_token', response.data.token);
  return response;
};

export const login = async (data) => {
  const response = await axiosClient.post('/api/login', data);
  // Store the token in localStorage
  localStorage.setItem('auth_token', response.data.token);
  return response;
};

export const logout = async () => {
  // Get token from localStorage
  const token = localStorage.getItem('auth_token');
  
  try {
    const response = await axiosClient.post('/api/logout', {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    // Remove token from localStorage
    localStorage.removeItem('auth_token');
    return response;
  } catch (error) {
    localStorage.removeItem('auth_token');
    throw error;
  }
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('auth_token');
  
  if (!token) {
    return null;
  }

  try {
    const response = await axiosClient.get('/api/utilisateur', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    localStorage.removeItem('auth_token');
    return null;
  }
};