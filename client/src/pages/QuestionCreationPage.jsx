//CC PAGE
import React, {useEffect, useState } from "react";
import { createQuestion, fetchQuestionsWithPagination } from '../services/questionService.js'

const QuestionCreationPage = () => {

    const [questionData, setQuestionData] = useState({
        question: '',
        options: ['', '', '', ''],
        correctoptionIndex: 0
    });

    const [questions, setQuestions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(second)

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0)

    console.log("questions", questions);

    const fetchQuestions = async () =>{
        try {
                // const data = await getQuestions();
                const data = await fetchQuestionsWithPagination(currentPage, pageSize);
                setQuestions(data.questions);
                setTotalPages(data.totalPages);
                setTotalCount(data.totalCount);
                console.log("dataaaaaaaaaa", data);
                
                if (Array.isArray(data?.questions)) {
                    const sortedQuestions = [...data.questions].sort((a, b) => 
                        new Date(b.createdAt) - new Date(a.createdAt)
                    );
                    // setQuestions(data[0].questions);
                    setQuestions(sortedQuestions);
                } else {
                    console.error("Data fetched is not an array:", data);
                    setQuestions([]);
                }
            } catch (error) {
                console.error("error fetching questions", error);
 
            }
    };

    useEffect(() => {
        fetchQuestions();
    },[currentPage, pageSize]);

    const handleChange = (e , index = null) => {
        if (index !== null) {
            const newOptions = [...questionData.options]; //for detailed explaination check teams 
            newOptions[index] = e.target.value ;
            setQuestionData({...questionData, options: newOptions });

        }else{
            setQuestionData({...questionData , [e.target.name] : e.target.value});
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handlePageSizeChange = (newSize) => {
        setPageSize(newSize);
        setCurrentPage(1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(questionData,"questionssssss");

            let response = await createQuestion(questionData);
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
    };

    const handleEdit = (question) => {

    };

    const confirmDelete = (question) => {

    };

    const renderPagenumbers = () => {

        const pageNumbers= [];
        for (let i = 1;i <= totalPages; i++) {
            pageNumbers.push(
                <button 
                key={i}
                onClick={() => handlePageChange(i)}
                style={currentPage === i ? styles.activePageButton : styles.pageButton}
                >

                {i}
                </button>
            );
        }
        return pageNumbers;
    }

    return (
        <div style={styles.container}>
           
            <h2 style={styles.subheading} >Created Questions</h2>
              
            {/* create question button  */}
            <button onClick={()=>{
                setIsEditing(false);
                setCurrentEditId(null);
                setQuestionData({
                    question: '',
                    options: ['', '', '', ''],
                    correctoptionIndex: 0
                }),
            
               
                setShowModal(true)
                
                }} style={styles.createButton}>Create Question</button>

            {/* question list */}
            <div style={styles.questionList}>
                {questions && Array.isArray(questions) ? (
                    questions.map((q, index) => 
                    
                         (
                        
                        <div key={q.id || index} style={styles.questionItem}>
                            <h3><p>{(currentPage - 1) * pageSize + index + 1}</p>{q.question}</h3>
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
            {/* Pagination Controller  */}
                {totalPages > 1 && (
                    <div style={styles.paginationControls}>
                        <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        style={styles.paginationButton}
                        >
                            Previous
                        </button>
                        {renderPagenumbers()}
                        <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        style={styles.paginationButton}
                        >
                            Next
                        </button>
                        <select 
                        value={pageSize}
                        onChange={(e) => handlePageSizeChange(parseInt(e.target.value))}
                        style={styles.pageSizeSelect}
                        >
                            <option value="10">10 per page</option>
                            <option value="20">20 per page</option>
                            <option value="50">50 per page</option>
                        </select>
                        <p style={styles.paginationInfo}>
                            Page {currentPage} of {totalPages} (Total: {totalCount} questions)
                        </p>
                    </div>
                )}

            {/* popup */}

            {showModal && (
             
             <div style={styles.modalOverlay}>
                <div style={styles.modal}>
                    <form onSubmit={handleSubmit} style={styles.form}>

                        <h2 style={styles.heading}>{isEditing ? 'Edit Question' : 'Create Question'}</h2>

                        <input
                            type="text"
                            name="question"
                            placeholder="Enter question"
                            value={questionData.question}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />

                        {questionData.options.map((option, index) => (
                            
                            <input
                                type="text"
                                key={index}
                                placeholder={`Option ${index + 1}`}
                                value={option}
                                onChange={(e) => handleChange(e, index)}
                                style={styles.input}
                                required
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


                        <div>
                            <button onClick={() => setShowModal(false)} type="submit" style={styles.button}>
                                Cancel
                            </button>
                            <button type="submit" style={styles.button}>
                                {isEditing ? 'Update Question ': 'Save Question'}
                            </button>
                        </div>
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
        padding: '20px',
    },
    subheading: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    createButton: {
        padding: '10px 15px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: '20px',
    },
    questionList: {
        marginBottom: '20px',
    },
    questionItem: {
        border: '1px solid #ccc',
        padding: '15px',
        marginBottom: '10px',
        borderRadius: '5px',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '80%',
        maxWidth: '500px',
    },
    heading: {
        fontSize: '20px',
        marginBottom: '15px',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    select: {
        padding: '10px',
        marginBottom: '15px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    button: {
        padding: '10px 15px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    paginationControls: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    paginationButton: {
        padding: '8px 12px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    activePageButton: {
        backgroundColor: '#007bff',
        color: 'white',
        border: '1px solid #007bff',
        borderRadius: '4px',
        padding: '8px 12px',
        cursor: 'pointer',
    },
    pageSizeSelect: {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    paginationInfo: {
        marginLeft: 'auto',
    },
};


export default QuestionCreationPage;