//END USER PAGE
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


export const ResultsPage = () => {
  console.log("Rendering ResultsPage...");

  
  // console.log("Extracted resultId:", resultId);
  
  // Capture the URL parameters
  const params = useParams();
  console.log("Params from URL:", params);
  
  if(!params.resultId){
    console.error("ERROR: resultId is undefined!");
    return <div>Error: Invalid Result ID in URL.</div>;
  }
  const { resultId } = useParams(); //since we are using the react router dom we are using the url for fetching assessment id
  
  console.log("Extracted resultId:", resultId);
  console.log(useParams(), "ussee params");
  

    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    
    
    
    useEffect(() => {

      if(!resultId){
        setError("Invalid Result ID in URL");
        return;
      }

      const fetchResult = async () => {
        try {
          const response = await axios.get(`/api/results/${resultId}`);
          console.log("Fetched result data........", response.data);
          
          if (!response.data.result) {
            setError("No result found for this ID.");
            return;
          }
          
          setResult(response.data.result);
          console.log(result, "result");
        } catch (error) {
          console.error('Error fetching result:', error);
        }
      };
      fetchResult();
    }, [resultId]);
  
 
    if (error) return <div style={{ color: 'red' }}>{error}</div>;
    if (!result) return <div>Loading results...</div>;

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Results</h1>

        <p>Assessment: {result?.AssesmentId?.title || "Unknown"}</p>
        <p>Score: {result.score} / {result.answers?.length}</p>

        <h2 className="text-xl font-bold mt-4">Your answsers</h2>
        {result.answers?.map((answer, index) => (
                <div key={index}>
                    <p>Q {index + 1}: {answer?.questionId?.question || "Question not found"}</p>
                    <p>Your Answer: {answer.selectedOptionIndex}</p>
                    {/* <p>Correct Answer: {answer?.questionId?.correctOption || "N/A"}</p> */}
                    <p>{answer.isCorrect ? "✅ Correct" : "❌ Incorrect"}</p>
                    <hr />
                </div>
            ))}
      </div>
    );
  };
  
  