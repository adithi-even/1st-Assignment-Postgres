import axios from "axios";

const API_URL = "http://localhost:5000/api/assessments/";

export const getAssessments = async() => {
    const response = await axios.get(API_URL);
    return response.data;
}

export const getAssessmentById = async(id) => {
    const response = await axios.get(`${API_URL}/:${id}`);
    return response.data;
}

export const createAssessment = async(data) => {
    const response = await axios.post(`${API_URL}/create`, data);
    return response.data;
}