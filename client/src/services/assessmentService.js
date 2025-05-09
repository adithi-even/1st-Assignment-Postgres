import axios from 'axios';


const API_URL = '/api/assessments';

export const createAssessment = async (assessmentData) => {
    try {
        const token = localStorage.getItem('token'); //since this route(/api/assessments) is the authorized/protected route , if we want to let the user in we have to get the token from there localStorage which will be stored during the login process
        
        const response = await axios.post(API_URL, assessmentData, {
            headers: {Authorization: `Bearer ${token}`},
        });
        return response.data;
        
    } catch (error) {
        console.log("assessmentService => createAssessment Error:" , Error);
    }
};

export const getAssessments = async () => {
    try {
        const token = localStorage.getItem('token'); //since this route(/api/assessments) is the authorized/protected route , if we want to let the user in, we have to get the token from there localStorage which will be stored during the login process.
        
        const response = await axios.get(API_URL,{
            headers:{Authorization: `Bearer ${token}`},
        });
        
        return response.data.assessments;
        
    } catch (error) {
        console.log("assessmentService => getAssessments Error:" , Error);
            throw error;
    }
};





//example of assessmentData = {
//     title: "JavaScript Basics Assessment",   // Title of the assessment
//     description: "Test your knowledge on JS basics.",  // Optional description
//     questions: [
//         "64b8d9f4e3b3f2a2345f1e12",  // IDs of questions (referenced from your database)
//         "64b8da01e3b3f2a2345f1e13",
//         "64b8da14e3b3f2a2345f1e14"
//     ],
//     timeLimit: 30  // Optional: time limit in minutes for the assessment
// };