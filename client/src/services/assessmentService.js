import axios from 'axios';
import API from './api';


const API_URL = '/assessment';

export const createAssessment = async (assessmentData) => {
    try {
        const token = localStorage.getItem('token'); //since this route(/api/assessment) is the authorized/protected route , if we want to let the user in we have to get the token from there localStorage which will be stored during the login process
        
        const response = await API.post(API_URL, assessmentData, {
            headers: {Authorization: `Bearer ${token}`},
            'Content-Type': 'application/json', 
        });
        return response.data;
        
    } catch (error) {
        console.log("assessmentService => createAssessment Error:" , error);
        // throw error;
    }
};

export const getAssessments = async () => {
    try {
        const token = localStorage.getItem('token'); //since this route(/api/assessment) is the authorized/protected route , if we want to let the user in, we have to get the token from there localStorage which will be stored during the login process.
        
        const response = await API.get(API_URL,{
            headers:{Authorization: `Bearer ${token}`},
        });
        
        return response.data;
        
    } catch (error) {
        console.log("assessmentService => getAssessments Error:" , error);
        return { data: [] };   
    }
};


export const getAvailableAssessments = async () => {
    try {
        const token = localStorage.getItem('token');
        
        const response = await API.get(API_URL, {
            headers:{Authorization: `Bearer ${token}`},
        });
        
        return response.data;

    } catch (error) {
        console.log("assessmentService => getAvailableAssessments Error:" , error);
        return { data: [] };   
    }
}

