import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';//adjust based on the backend route

export const login = async (credentials) => {
   const response = await axios.post(`${API_URL}/login`, credentials);
   return response.data;
} //here credentials is an object which contains email and the passsword,

export const register = async(userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
}

export const logout = async() => {
    return axios.post(`${API_URL}/logout`);
}