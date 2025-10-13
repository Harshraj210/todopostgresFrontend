
import axios from 'axios';

// Your backend's base URL
const API_URL = 'http://localhost:3000/api/v1/users';

export const signup = (userData) => {
  return axios.post(`${API_URL}/signup`, userData);
};



 
export const login = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};