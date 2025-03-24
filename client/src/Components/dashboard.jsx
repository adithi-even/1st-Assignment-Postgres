import React from 'react';
import { getAssessments } from '../services/assessmentService';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';


function Dashboard() {

    const [assessments, setAssessments] = useState([]);
    const navigate = useNavigate();
    
     useEffect (()=> {
        const fetchAssessments = async () => {
            try {
              const assessmentData = await getAssessments();
              setAssessments(assessmentData);
            } catch (error) {
                console.log(error,"error in the useEffect of the DASHBOARD component");
                
            }
        }

        fetchAssessments();
     },[]);

     const startTest =(assessmentId) => {
        navigate(`/assessmet/${assessmentId}`);
     }

  return (
    <div>
        <h2>Available Assessments</h2>
        <div >
            {assessments && Array.isArray(assessments) ? (assessments.map((assessment)=>{
                return (
                    <div key={assessments.id}>
                        <h2>{assessment.title}</h2>
                        <button onClick={()=>startTest(assessment.id)}>Start Test {assessment.id}</button>
                    </div>
                )
            })):(
                <h3>No assessments found</h3>
            )}
        </div>
    </div>
  );
};

export default Dashboard;