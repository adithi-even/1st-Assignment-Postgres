import React from 'react';
import { getAssessments } from '../services/assessmentService';

function dashboard() {
     useEffect (()=> {
        const fetchAssessments = async () => {
           await getAssessments();
           

        }
     },[]);
  return (
    <div>dashboard</div>
  )
}

export default dashboard