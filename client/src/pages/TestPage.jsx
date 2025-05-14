//END USER PAGE
import React, {useState, useEffect} from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { getAssessmentById } from '../services/assessmentService';
import { submitResults } from '../services/resultService';

const TestPage=() => {
    const {assessmentId} = useParams(); //since we are using the react router dom we are using the url for fetching assessment id
    const [assessment, setAssessment] = useState(null);
    const [answers, setAnswers] = useState({});
 
    const navigate = useNavigate();

    const startSession = async () => {

        try {
            console.log("Fetching assessmentId...",assessmentId);
            
            const data = await getAssessmentById(assessmentId);
        
            console.log("response of setAssessment", data.assessment);
            
            setAssessment(data);
            console.log('data.Questions', data.Questions[0]);
            console.log('data', data);
            
        } catch (error) {
            console.error('Error fetching the answers', error.response);
            
        }
    };

    useEffect(()=>{
        startSession();
    },[assessmentId]);


    const handleAnswerChange = (questionId, optionIndex) => {
        setAnswers({...answers, [questionId] : optionIndex });
    };

    
    const handleSubmit = async () => {

        try {
             const token = localStorage.getItem('token');
                
                // Format answers for submission
                const formattedAnswers = Object.keys(answers).map(questionId => {
                    const question = assessment.Questions.find(q => q.id === questionId);
                    const selectedIndex = answers[questionId];
                    const isCorrect = question.correctoptionIndex === selectedIndex;
                    
                    return {
                        questionId,
                        selectedOptionIndex: selectedIndex,
                        isCorrect
                    };
                });
                
                // Calculate score
                const correctAnswers = formattedAnswers.filter(answer => answer.isCorrect).length;
                const totalQuestions = formattedAnswers.length;
                const score = Math.round((correctAnswers / totalQuestions) * 100);
                
                const response = await axios.post(
                    `/api/result/submit`,
                    { 
                        assessmentId, 
                        userId: JSON.parse(localStorage.getItem('user')).id, // Assuming user info is stored in localStorage
                        answers: formattedAnswers,
                        score
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                    }
                );
        
                if (response.status === 201) {
                    console.log("Test Submitted Successfully:", response.data);
                    navigate(`/results/${response.data.result.id}`);
                } else {
                    console.error("Unexpected response status:", response.status);
                }
        } catch (error) {
            
            console.error("Error submitting test:", error);
        }
       
    };
    if(!assessment) return <div>Loading assessment...</div>;

  return (
    <div style={styles.container}>
        <h1  style={styles.heading}>{assessment.title}</h1>
 <div style={styles.questionList}>
     {assessment?.Questions && assessment.Questions.length > 0 ? (
        assessment.Questions.map((question, index) => (
            <div key={question.id}  style={styles.questionItem}>
                 <h3 style={styles.questionText}>{index + 1}. {question.question}</h3>

                {question.options?.map((option, idx) => (
                    <div key={option.id} style={styles.optionContainer}>
                        <input
                         type="radio"
                         name={question.id}
                         value={idx}
                         onChange={() => handleAnswerChange(question.id, idx)}
                         checked={answers[question.id] === idx}
                          style={styles.radioInput}
                         />
                        <label style={styles.optionText}>{option.text}</label>
                    </div>
                ))}
            </div>
        ))
      

    ) : (
        <div>No questions available for this assessment</div>
    )}
</div>
        <button type='submit' className="bg-blue-500 text-white px-4 py-2 rounded"  onClick={handleSubmit}>Submit</button>
    </div>
  );


   
};

export default TestPage;

const styles = {
  container: {
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "Auto",
    backgroundColor: "#f8f9fa",
    maxWidth: "800px",
    margin: "0 auto",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "24px",
    color: "#2c3e50",
    fontSize: "32px",
    fontWeight: "600",
  },
  subheading: {
    marginTop: '20px',
    marginBottom: '15px',
    alignSelf: 'center',
    color: '#2c3e50',
    fontSize: '24px',
    fontWeight: "500",
  },
  questionList: {
    flex: 1,
    width: "100%",
    maxHeight: 'auto',
    overflowY: 'auto',
    padding: '20px',
    border: '1px solid #e1e4e8',
    borderRadius: '8px',
    marginBottom: '25px',
    backgroundColor: '#ffffff',
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
  },
  questionItem: {
    borderBottom: "1px solid #eaeaea",
    padding: "16px 10px",
    marginBottom: "15px",
  },
  questionText: {
    fontSize: "18px",
    fontWeight: "500",
    marginBottom: "12px",
    color: "#34495e",
  },
  optionContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "8px",
    padding: "8px",
    borderRadius: "4px",
    transition: "background-color 0.2s",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f5f7fa",
    },
  },
  optionText: {
    marginLeft: "8px",
    fontSize: "16px",
    color: "#333",
    cursor: "pointer",
  },
  radioInput: {
    cursor: "pointer",
    width: "18px",
    height: "18px",
  },
  noQuestionsMessage: {
    textAlign: "center",
    padding: "20px",
    color: "#7f8c8d",
    fontSize: "16px",
    fontStyle: "italic",
  },
  submitButton: {
    padding: "12px 30px",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#2980b9",
    },
  },
  createButton: {
    padding: "12px 20px",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    marginBottom: "15px",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#2980b9",
    },
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
    width: "400px",
    maxWidth: "90%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginBottom: "18px",
    padding: "12px 15px",
    borderRadius: "6px",
    border: "1px solid #dfe4ea",
    fontSize: "16px",
    transition: "border-color 0.3s",
    "&:focus": {
      borderColor: "#3498db",
      outline: "none",
    },
  },
  select: {
    marginBottom: "18px",
    padding: "12px 15px",
    borderRadius: "6px",
    border: "1px solid #dfe4ea",
    fontSize: "16px",
    backgroundColor: "#fff",
    cursor: "pointer",
  },
  button: {
    padding: "12px",
    backgroundColor: "#2ecc71",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    marginTop: "15px",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#27ae60",
    },
  },
  cancelButton: {
    padding: "12px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    marginTop: "12px",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#c0392b",
    },
  },
};