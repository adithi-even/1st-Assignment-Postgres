import axios from 'axios';

const API_URL = '/api/results';

export const submitResults = async (resultData) => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.post(API_URL, resultData, {
            headers:{
                Authorization: `Bearer ${token}`
            },
        });
        return response.data ;
    } catch (error) {
        console.log("resultService => submitResults", error);
        
    }
    
};

export const getResults = async (assessmentId) => {
    try {
        const token = localStorage.getItem('token');
        
        const response = await axios.get(`${API_URL}/${assessmentId}`, {
            headers:{Authorization: `Bearer ${token}`},
        });
        return response.data ;
        
    } catch (error) {
        console.log("resultService => getResults", error);
    }

};