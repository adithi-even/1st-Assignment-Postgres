import axios from 'axios';  

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },  
    withCredentials: true
});             //parameters of POST (URL , data , and config)


export default API ;