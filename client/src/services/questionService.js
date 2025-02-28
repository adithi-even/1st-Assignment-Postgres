import axios from "axios";

const API_URL = "http://localhost:5000/api/questions"; // Update with correct backend port

export const createQuestion = async(questionData) => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.post(API_URL, questionData,{
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

        const response = await axios.get(API_URL,{
            headers:{Authorization: `Bearer ${token}`},
        });

        return Array.isArray( response.data)? response.data : [ response.data];

    } catch (error) {
        console.log('questionService => getQuestions', error);
        
    }
};