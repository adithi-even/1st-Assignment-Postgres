//cc page
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssessmentCreationPage = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [assessments,setAssesments] = useState([]);
  // const [users, setUsers] = useState([])

  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log("Fetching questions..."); // Debugging log

      const response = await axios.get("http://localhost:5000/api/questions", {
        headers: { Authorization: `Bearer ${token}` }
      });

      // console.log("Fetching Questions:",response.data.questions);
      console.log("Fetching Questions:",response.data);

      if (Array.isArray(response.data)) {
        setQuestions(response.data);
      } else if (response.data.questions && Array.isArray(response.data.questions)) {
          setQuestions(response.data.questions);
      } else {
          console.error("Unexpected data format:", response.data);
          setQuestions([]); 
      }
            
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const fetchAssessments = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get("http://localhost:5000/api/assessments", {
        headers: { Authorization: `Bearer ${token}` }
      });


      if(Array.isArray(response.data)){
        setAssesments(response.data);
      }else if(response.data.assessments && Array.isArray(response.data.assessments)){
        setAssesments(response.data.assessments);
      }else{
        console.error("Unexpected data format",response.data);
        setAssesments([]);
      }        
    } catch (error) {
      console.error("Error fetching Assessments", error);
      
      
    }
  };

  // const fetchUsers = async () => {
  //   try {
  //     const token = localStorage.getItem('token');

  //     const response = await axios.get("http://localhost:5000/api/users", {
  //       headers: { Authorization: `Bearer ${token}` }
  //     });

  //     console.log(response,"rrrr");
      
  //     const userMap = {} ;
  //     response.data.forEach(user => {
  //       userMap[user._id] = user;
  //     });

  //     setUsers(userMap);  // Save to state
  //     console.log("userMap", userMap);
      

  //   } catch (error) {
  //     console.error("Error fetching the createdBy users in the asssessment CreationPage", error.message);
      
  //   }
  // };


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
    const userId = user ? user._id : null  ;

    if(!userId){
      setMessage("user not found , login again !");
      return;
    }

    const requestBody = {
      title,
      questions: selectedQuestions,
      createdBy: userId  
    };

    console.log("assessment created req.body:", requestBody);

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

      <div style={styles.assessmentItem}>
          {assessments.length > 0 ? (
              assessments.map((assessment, index) => (
                  <div key={assessment._id} style={styles.assessmentItem}>
                      <h4>{index + 1}. {assessment.title}</h4>
                      <p><strong>Questions.</strong> {assessment.questions.length}</p>
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
            questions.map((question) => (
              <div key={question._id} style={styles.questionItem}>
                <label style={styles.label}>
                  <input
                    type="checkbox"
                    checked={selectedQuestions.includes(question._id)}
                    onChange={() => handleQuestionSelect(question._id)}
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
