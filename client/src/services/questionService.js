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
        
        return Array.isArray(response.data)? response.data : [response.data];
        
    } catch (error) {
        console.log('questionService => getQuestions', error);
        throw error;
        
    }
};

export const fetchQuestionsWithPagination = async (pageNumber = 1, pageSize = 10) => {
    try {
        const token = localStorage.getItem('token');
        
        const response = await API.get(`${API_URL}`,{
            headers:{Authorization: `Bearer ${token}`},
            params: {
                page: pageNumber,
                limit: pageSize
            }
        });

        return response.data;

    } catch (error) {
        console.error("Failed to fetch questions", error);
        
    }
};

export const searchQuestions = async (searchTerm) => {
    try {
        const token = localStorage.getItem('token');

        const response = await API.get(`${API_URL}/search`, {
            headers:{Authorization: `Bearer ${token}`},
            params: {
                term: searchTerm
            }
        });

        return response.data;
    } catch (error) {
        console.error("Failed to search questions", error);
        throw error;
    }
}

export const deleteQuestionById = async (questionId) => {
    try {
        const token = localStorage.getItem('token');
        
        const response = await API.delete(`${API_URL}/${questionId}`, {
            headers: {Authorization: `Bearer ${token}`},
        });

        return response.data;
    } catch (error) {
        console.error(`Failed to delete question with ID: ${questionId}`, error);
        throw error;
    }
};

export const updateQuestionById = async (questionId, questionData) => {
    try {
        const token = localStorage.getItem('token');
        
        const response = await API.post(`${API_URL}/${questionId}`, questionData, {
            headers: {Authorization: `Bearer ${token}`},
        });

        return response.data;
    } catch (error) {
        console.error(`Failed to update question with ID: ${questionId}`, error);
        throw error;
    }
};