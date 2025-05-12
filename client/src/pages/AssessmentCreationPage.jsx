//cc page
import React, { useState, useEffect } from 'react';
import { getQuestions }  from '../services/questionService.js';
import { getAssessments } from '../services/assessmentService.js'
import axios from 'axios';
import API from '../services/api';

const AssessmentCreationPage = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [assessments,setAssesments] = useState([]);

  const fetchQuestions = async () => {
    try {
      const data = await getQuestions();
      console.log("Fetched questions:", data);  // Debugging log

      if (data[0]?.questions && Array.isArray(data[0].questions)) {
          setQuestions(data[0].questions);
          console.log(data[0].questions,"data.questions");
          
      } else {
          console.error("Unexpected data format:", data);
          setQuestions([]); 
      }
            
    } catch (error) {
      console.error('Error fetching questions:', error);
      setMessage(`Failed to fetch questions: ${error.message}`); 
    }
  };

  const fetchAssessments = async () => {
    try {
      const response = await getAssessments();
      console.log("Fetched assessments:", response);

      if(response?.data && Array.isArray(response.data)){
        setAssesments(response.data);
      }else{
        console.error("Unexpected data format",response.data);
        setAssesments([]);
      }        
    } catch (error) {
      console.error("Error fetching Assessments", error);
      setMessage(`Failed to fetch Assessments: ${error.message}`); 
    }
  };

  useEffect(() => {
    fetchAssessments();
    fetchQuestions();
  }, []);

  const handleQuestionSelect = (questionId) => {
    setSelectedQuestions((prevSelected) => {
      if (prevSelected.includes(questionId)) {
        return prevSelected.filter((id) => id !== questionId);
      } else {
        return [...prevSelected, questionId];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || selectedQuestions.length === 0) {
      setMessage('Please provide a title and select at least one question.');
      return;
    }

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userId = user ? user.id : null  ;

    if(!userId){
      setMessage("user not found , login again !");
      return;
    }

    const requestBody = {
      title,
      questions: selectedQuestions,
      createdBy: userId  
    };

    console.log("assessment created requestBody:", requestBody);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/assessments',requestBody ,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log("assessment created res.data:", response.data);
      
      setMessage('Assessment created successfully!');
      setTitle('');
      setSelectedQuestions([]);

      fetchAssessments();
    } catch (error) {
      console.error('Error creating assessment:', error);
      setMessage('Error creating assessment.');
    }
  };

  return (
    <div style={styles.container}>
      {/* Display Created Assessments */}
      <h3 style={styles.subheading}>Created Assessments:</h3>
    <div style={styles.container2}>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {assessments.length > 0 ? (
          assessments.map((assessment, index) => (
            <div key={assessment.id || index} style={styles.assessmentItem}>
              <h4>{index + 1}. {assessment.title}</h4>
              <p><strong>Questions:</strong> {assessment.questions.length}</p>
            </div>
          ))
        ) : (
          <p style={styles.noAssessments}>No assessments created yet.</p>
        )}
      </div>


      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Create Assessment</h2>
        
        <input
          type="text"
          placeholder="Assessment Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />

        <h3 style={styles.subheading}>Select Questions:</h3>
        <div style={styles.questionList}>
          {questions && questions.length > 0 ? (
            questions.map((question, index) => (
              <div key={question.id || index} style={styles.questionItem}>
                <label  style={styles.label}>
                  <input
                    type="checkbox"
                    checked={selectedQuestions.includes(question.id)}
                    onChange={() => handleQuestionSelect(question.id)}
                    style={styles.checkbox}
                  />
                  {question.question}
                </label>
              </div>
            ))
          ) : (
            <p style={styles.noQuestions}>No questions available. Please add some questions first.</p>
          )}
        </div>

        <button type="submit" style={styles.button}>Create Assessment</button>
      </form>

    </div>

      {message && <p style={styles.message}>{message}</p>}
      
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f9',
    padding: '20px',
  },
  container2: {
    display: 'flex',
    flexDirection:'row',
    gap:'10px',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f9',
    padding: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    width: '400px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  subheading: {
    marginTop: '20px',
    marginBottom: '10px',
    color: '#555',
  },
  input: {
    marginBottom: '20px',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  questionList: {
    maxHeight: '200px',
    overflowY: 'auto',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '20px',
    backgroundColor: '#fafafa',
  },
  questionItem: {
    marginBottom: '10px',
  },
  label: {
    fontSize: '16px',
    color: '#333',
  },
  checkbox: {
    marginRight: '10px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  message: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#ff4d4d',
  },
  noQuestions: {
    color: '#777',
    fontStyle: 'italic',
  },
  assessmentItem:{
    flexDirection:'column',
  }
};

export default AssessmentCreationPage;
