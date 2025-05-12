//CC PAGE
import React, {useEffect, useState } from "react";
import { createQuestion, getQuestions } from '../services/questionService.js'

const QuestionCreationPage = () => {

    

    const [questionData, setQuestionData] = useState({
        question: '',
        options: ['', '', '', ''],
        correctoptionIndex: 0
    });

    const [ questions, setQuestions] = useState([]);
    const [ showModal, setShowModal] = useState(false);

    console.log("questions", questions);
 
    const fetchQuestions = async () =>{
        try {
                const data = await getQuestions();
                console.log("Fetched questions:", data[0].questions[2].id); 
                console.log("Fetched questions:", data[0].questions[2].question); 
                console.log("Fetched questions:", data[0].questions[2].correctoptionIndex); 
                
                if (Array.isArray(data[0]?.questions)) {
                    const sortedQuestions = [...data[0].questions].sort((a, b) => 
                        new Date(b.createdAt) - new Date(a.createdAt)
                    );
                    // setQuestions(data[0].questions);
                    setQuestions(sortedQuestions);
                } else {
                    console.error("Data fetched is not an array:", data);
                    setQuestions([]);
                }
            } catch (error) {
                console.error("error fetchisng questions", error);
                
            }
        };

    useEffect(() => {
        fetchQuestions();
    },[]);

    const handleChange = (e , index = null) => {
        if (index !== null) {
            const newOptions = [...questionData.options]; //for detailed explaination check teams 
            newOptions[index] = e.target.value ;
            setQuestionData({...questionData, options: newOptions });

        }else{
            setQuestionData({...questionData , [e.target.name] : e.target.value});
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(questionData,"questionssssss");
            
            const response = await createQuestion(questionData);
            console.log("response in QuestionCreationPage" , response);
            
            if(response){
                alert('Question Created Successfully 🟩 !');                

                setShowModal(false);
                setQuestionData({
                    question: '',
                    options: ['', '', '', ''],
                    correctoptionIndex: 0
                });

                fetchQuestions();
            }

        } catch (error) {
                alert('Failed to create question ❌');
                console.error('Error creating question:', error.response ? error.response.data : error.message);
            }
            
        }
    

    return (
        <div style={styles.container}>
           
            <h2 style={styles.heading} >Created Questions</h2>
              
            {/* create question button  */}
            <button onClick={()=>setShowModal(true)} style={styles.createButton}>Create Question</button>

            {/* question list */}
            <div style={styles.questionList}>
                {questions && Array.isArray(questions) ? (
                    questions.map((q, index) => 
                    
                         (
                        
                        <div key={q._id || index} style={styles.questionItem}>
                            <h3>{q.question}</h3>
                            {/* <p><strong>Options:</strong>{q.options && Array.isArray(q.options) ? q.options.join(', ') :'No options available'}</p>
                            <p><strong>Correct Option:</strong>{q.options && q.options[q.correctoptionIndex] ? q.options[q.correctoptionIndex]  : 'No correct option Added'}</p> */}

                            <p>
                                <strong>Options:</strong>
                                {q.options && q.options.length > 0
                                    ? q.options.map(opt => opt.text).join(', ')
                                    : 'No options available'}
                            </p>

                            <p>
                                <strong>Correct Option:</strong>
                                {q.options && q.options.length > 0 && typeof q.correctoptionIndex === 'number'
                                    ? q.options[q.correctoptionIndex]?.text || 'No correct option added'
                                    : 'No correct option Added'}

                                    
                            </p>


                        </div>
                    
                         ))
                    ) : (
                        <p>No questions created yet.</p>
                    )  
                }
            </div>

            {/* popup */}

            {showModal && (
             
             <div style={styles.modalOverlay}>
                <div style={styles.modal}>
                    <form onSubmit={handleSubmit} style={styles.form}>

                        <h2 style={styles.heading}>Create Question</h2>

                        <input
                            type="text"
                            name="question"
                            placeholder="Enter question"
                            value={questionData.question}
                            onChange={handleChange}
                        style={styles.input}
                        />

                        {questionData.options.map((option, index) => (
                            
                            <input
                                type="text"
                                key={index}
                                placeholder={`Option ${index + 1}`}
                                value={option}
                                onChange={(e) => handleChange(e, index)}
                                style={styles.input}
                            />
                        ))}

                        <select
                            name="correctoptionIndex"
                            onChange={handleChange}
                            value={questionData.correctoptionIndex}
                            style={styles.select}
                        >
                            {questionData.options.map((_, index) => (
                                <option value={index} key={index}>
                                    Correct Option: {index + 1}
                                </option>
                            ))}
                        </select>

                        <button type="submit" style={styles.button}>
                            Save Question
                        </button>
                    </form>

                </div>
             </div>
            
            )}

        </div>
    );
};

// ✅ Same CSS Styling as RegisterForm.jsx
const styles = {
    container: {
        padding:"20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "Auto",
        backgroundColor: "#f4f4f9",
    },
    heading: {
        textAlign: "center",
        marginBottom: "20px",
        color: "#333",
    },
    questionList: {
        width: "400px",
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px",
        
    },
    questionItem: {
        borderBottom: "1px solid #ddd",
        padding: "10px",
    },
    createButton: {
        padding: "10px",
        backgroundColor: "#007BFF",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "16px",
    },
    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        width: "350px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    input: {
        marginBottom: "15px",
        padding: "10px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        fontSize: "16px",
    },
    select: {
        marginBottom: "15px",
        padding: "10px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        fontSize: "16px",
    },
    button: {
        padding: "10px",
        backgroundColor: "#4CAF50",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "16px",
        marginTop: "10px",
    },
    cancelButton: {
        padding: "10px",
        backgroundColor: "#FF4D4D",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "16px",
        marginTop: "10px",
    },
};


export default QuestionCreationPage;