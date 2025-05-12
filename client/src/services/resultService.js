import axios from 'axios';
import API from './api';

const API_URL = '/result';

export const submitResults = async (resultData) => {
    try {
        const token = localStorage.getItem('token');

        const response = await API.post(API_URL, resultData, {
            headers:{
                Authorization: `Bearer ${token}`
            },
        });
        return response.data ;
    } catch (error) {
        console.log("resultService => submitResults", error);
        throw error;
    }
    
};

export const getResults = async (assessmentId) => {
    try {
        const token = localStorage.getItem('token');
        
        const response = await API.get(`${API_URL}/${assessmentId}`, {
            headers:{Authorization: `Bearer ${token}`},
        });
        return response.data ;
        
    } catch (error) {
        console.log("resultService => getResults", error);
        throw error;
    }

};