import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';//adjust based on the backend route

export const login = async () //here credentials is an object which contains email and the passsword