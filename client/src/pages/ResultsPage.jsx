import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const ResultsPage = () => {
  const { resultId } = useParams();
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("Rendering ResultsPage with resultId:", resultId);

  useEffect(() => {
    if (!resultId) {
      setError("Invalid Result ID in URL");
      setLoading(false);
      return;
    }

    const fetchResult = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/result/${resultId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log("Fetched result data:", response.data);

        if (!response.data.result) {
          setError("No result found for this ID.");
          setLoading(false);
          return;
        }

        setResult(response.data.result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching result:', error);
        setError(`Failed to load results: ${error.message}`);
        setLoading(false);
      }
    };

    fetchResult();
  }, [resultId]);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p className="mt-2">Loading your results...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="text-center p-8">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    </div>
  );

  if (!result) return <div className="text-center p-8">No results found</div>;

  const scorePercentage = result.score || 0;
  const scoreColor = scorePercentage >= 70 ? 'text-green-600' : 
                      scorePercentage >= 40 ? 'text-yellow-600' : 
                      'text-red-600';

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">Test Results</h1>

        <div className="mb-6">
          <p className="text-lg">
            <span className="font-semibold">Assessment:</span> {result.Assessment?.title || "Unknown Assessment"}
          </p>
          
          <div className="mt-4 flex items-center">
            <span className="font-semibold mr-2">Your Score:</span>
            <span className={`text-xl font-bold ${scoreColor}`}>{scorePercentage}%</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div 
              className={`h-2.5 rounded-full ${scorePercentage >= 70 ? 'bg-green-600' : scorePercentage >= 40 ? 'bg-yellow-500' : 'bg-red-600'}`} 
              style={{ width: `${scorePercentage}%` }}
            ></div>
          </div>
        </div>

        <h2 className="text-xl font-bold mt-6 mb-4">Question Details</h2>
        
        {result.ResultAnswers && result.ResultAnswers.length > 0 ? (
          <div className="space-y-6">
            {result.ResultAnswers.map((answer, index) => (
              <div key={index} className={`p-4 rounded-lg ${answer.isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                <div className="flex justify-between">
                  <p className="font-medium">Question {index + 1}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${answer.isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    {answer.isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </div>
                
                <p className="mt-2">{answer.Question?.question || "Unknown Question"}</p>
                
                {answer.Question?.Options?.map((option, idx) => (
                  <div 
                    key={idx} 
                    className={`mt-2 p-2 rounded ${
                      idx === answer.selectedOptionIndex && answer.isCorrect ? 'bg-green-200' : 
                      idx === answer.selectedOptionIndex ? 'bg-red-200' : 
                      idx === answer.Question.correctoptionIndex ? 'bg-green-100' : ''
                    }`}
                  >
                    <div className="flex items-start">
                      {idx === answer.selectedOptionIndex && (
                        <span className="mr-2">👉</span>
                      )}
                      {idx === answer.Question.correctoptionIndex && (
                        <span className="mr-2">✓</span>
                      )}
                      <span>{option.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <p>No answers recorded</p>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;