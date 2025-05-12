import axios from "axios";
import API from './api.js'

const API_URL = "/question"; // Update with correct backend port

export const createQuestion = async(questionData) => {
    try {
        const token = localStorage.getItem('token');

        const response = await API.post(API_URL, questionData,{
            headers:{Authorization: `Bearer ${token}`},
        });

        return response.data;

    } catch (error) {
        console.log('questionService => createQuestion', error);
        throw error;
    }
};

export const getQuestions = async() => {
    try {
        const token = localStorage.getItem('token');
        
        const response = await API.get(API_URL,{
            headers:{Authorization: `Bearer ${token}`},
        });
        
        return Array.isArray( response.data)? response.data : [ response.data];
        
    } catch (error) {
        console.log('questionService => getQuestions', error);
        throw error;
        
    }
};