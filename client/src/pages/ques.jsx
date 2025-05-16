import React, {useEffect, useState } from "react";
import { 
    createQuestion, 
    fetchQuestionsWithPagination, 
    deleteQuestionById, 
    updateQuestionById,
    searchQuestions 
} from '../services/questionService.js';

const QuestionCreationPage = () => {
    const [questionData, setQuestionData] = useState({
        question: '',
        options: ['', '', '', ''],
        correctoptionIndex: 0
    });

    const [questions, setQuestions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEditId, setCurrentEditId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    
    // Search functionality
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    // confirmation modal for delete
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [questionToDelete, setQuestionToDelete] = useState(null);

    const fetchQuestions = async () => {
        try {
            if (isSearching && searchTerm) {
                const data = await searchQuestions(searchTerm);
                if (Array.isArray(data?.questions)) {
                    setQuestions(data.questions);
                    setTotalPages(data.totalPages);
                    setTotalCount(data.totalCount);
                } else {
                    console.error("Search data fetched is not an array:", data);
                    setQuestions([]);
                    setTotalPages(1);
                    setTotalCount(0);
                }
            } else {
                const data = await fetchQuestionsWithPagination(currentPage, pageSize);
                if (Array.isArray(data?.questions)) {
                    const sortedQuestions = [...data.questions].sort((a, b) => 
                        new Date(b.createdAt) - new Date(a.createdAt)
                    );
                    setQuestions(sortedQuestions);
                    setTotalPages(data.totalPages);
                    setTotalCount(data.totalCount);
                } else {
                    console.error("Data fetched is not an array:", data);
                    setQuestions([]);
                    setTotalPages(1);
                    setTotalCount(0);
                }
            }
        } catch (error) {
            console.error("error fetching questions", error);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, [currentPage, pageSize, isSearching]);

    const handleChange = (e, index = null) => {
        if (index !== null) {
            const newOptions = [...questionData.options];
            newOptions[index] = e.target.value;
            setQuestionData({...questionData, options: newOptions});
        } else {
            setQuestionData({...questionData, [e.target.name]: e.target.value});
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setIsSearching(!!searchTerm);
        setCurrentPage(1);
        fetchQuestions();
    };

    const clearSearch = () => {
        setSearchTerm('');
        setIsSearching(false);
        setCurrentPage(1);
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
            let response;
            
            if (isEditing && currentEditId) {
                response = await updateQuestionById(currentEditId, questionData);
                if (response) {
                    alert('Question Updated Successfully 🟩 !');
                }
            } else {
                response = await createQuestion(questionData);
                if (response) {
                    alert('Question Created Successfully 🟩 !');
                }
            }

            setShowModal(false);
            setIsEditing(false);
            setCurrentEditId(null);
            setQuestionData({
                question: '',
                options: ['', '', '', ''],
                correctoptionIndex: 0
            });

            fetchQuestions();
        } catch (error) {
            alert(`Failed to ${isEditing ? 'update' : 'create'} question ❌`);
            console.error(`Error ${isEditing ? 'updating' : 'creating'} question:`, error.response ? error.response.data : error.message);
        }
    };

    const handleEdit = (question) => {
        // Format question data for editing
        const options = question.options.map(opt => opt.text);
        
        setQuestionData({
            question: question.question,
            options: options,
            correctoptionIndex: question.correctoptionIndex
        });
        
        setIsEditing(true);
        setCurrentEditId(question.id);
        setShowModal(true);
    };

    const confirmDelete = (question) => {
        setQuestionToDelete(question);
        setShowDeleteConfirm(true);
    };

    const handleDelete = async () => {
        if (!questionToDelete) return;
        
        try {
            await deleteQuestionById(questionToDelete.id);
            alert('Question Deleted Successfully!');
            setQuestionToDelete(null);
            setShowDeleteConfirm(false);
            fetchQuestions();
        } catch (error) {
            alert('Failed to delete question ❌');
            console.error("Error deleting question:", error);
        }
    };

    const cancelDelete = () => {
        setQuestionToDelete(null);
        setShowDeleteConfirm(false);
    };

    const renderPagenumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
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
    };

    return (
        <div style={styles.container}>
           
            <h2 style={styles.subheading}>Created Questions</h2>
              
            {/* Search and Create Question buttons */}
            <div style={styles.actionBar}>
                <div style={styles.searchContainer}>
                    <input 
                        type="text" 
                        placeholder="Search questions..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={styles.searchInput}
                    />
                    <button onClick={handleSearch} style={styles.searchButton}>Search</button>
                    {isSearching && (
                        <button onClick={clearSearch} style={styles.clearButton}>Clear</button>
                    )}
                </div>
                <button onClick={() => {
                    setIsEditing(false);
                    setCurrentEditId(null);
                    setQuestionData({
                        question: '',
                        options: ['', '', '', ''],
                        correctoptionIndex: 0
                    });
                    setShowModal(true);
                }} style={styles.createButton}>Create Question</button>
            </div>

            {isSearching && (
                <div style={styles.searchInfo}>
                    <p>Showing results for: <strong>{searchTerm}</strong> ({totalCount} questions found)</p>
                </div>
            )}

            {/* question list */}
            <div style={styles.questionList}>
                {questions && Array.isArray(questions) && questions.length > 0 ? (
                    questions.map((q, index) => (
                        <div key={q.id || index} style={styles.questionItem}>
                            <div style={styles.questionNumber}>
                                <p>{(currentPage - 1) * pageSize + index + 1}</p>
                            </div>
                            <div style={styles.questionContent}>
                                <h3>{q.question}</h3>
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
                            <div style={styles.actionButtons}>
                                <button 
                                    onClick={() => handleEdit(q)} 
                                    style={styles.editButton}
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => confirmDelete(q)} 
                                    style={styles.deleteButton}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No questions found. {isSearching ? 'Try a different search term.' : 'Create some questions!'}</p>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div style={styles.paginationControls}>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        style={currentPage === 1 ? {...styles.paginationButton, ...styles.disabledButton} : styles.paginationButton}
                    >
                        Previous
                    </button>
                    {renderPagenumbers()}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        style={currentPage === totalPages ? {...styles.paginationButton, ...styles.disabledButton} : styles.paginationButton}
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

            {/* Create/Edit Question Modal */}
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

                            <div style={styles.modalButtons}>
                                <button type="button" onClick={() => setShowModal(false)} style={styles.cancelButton}>
                                    Cancel
                                </button>
                                <button type="submit" style={styles.saveButton}>
                                    {isEditing ? 'Update Question' : 'Save Question'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div style={styles.modalOverlay}>
                    <div style={styles.confirmModal}>
                        <h3>Confirm Delete</h3>
                        <p>Are you sure you want to delete this question?</p>
                        <p style={styles.deleteQuestionPreview}>
                            "{questionToDelete?.question}"
                        </p>
                        <div style={styles.modalButtons}>
                            <button onClick={cancelDelete} style={styles.cancelButton}>Cancel</button>
                            <button onClick={handleDelete} style={styles.deleteConfirmButton}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Updated styles with more modern and improved UI
const styles = {
    container: {
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    subheading: {
        borderBottom: '2px solid #eaeaea',
        paddingBottom: '10px',
        marginBottom: '20px',
        color: '#333',
    },
    actionBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    searchContainer: {
        display: 'flex',
        gap: '10px',
    },
    searchInput: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        width: '300px',
    },
    searchButton: {
        padding: '10px 15px',
        backgroundColor: '#4b6bfb',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    clearButton: {
        padding: '10px 15px',
        backgroundColor: '#f0f0f0',
        color: '#333',
        border: '1px solid #ddd',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    searchInfo: {
        margin: '10px 0',
        padding: '10px',
        backgroundColor: '#f9f9f9',
        borderRadius: '4px',
    },
    createButton: {
        padding: '10px 15px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    questionList: {
        marginTop: '20px',
    },
    questionItem: {
        display: 'flex',
        padding: '15px',
        marginBottom: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        backgroundColor: 'white',
        position: 'relative',
    },
    questionNumber: {
        width: '30px',
        fontWeight: 'bold',
        marginRight: '15px',
        color: '#555',
    },
    questionContent: {
        flex: 1,
    },
    actionButtons: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        justifyContent: 'center',
    },
    editButton: {
        padding: '8px 12px',
        backgroundColor: '#2196F3',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    deleteButton: {
        padding: '8px 12px',
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    paginationControls: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
        gap: '8px',
        flexWrap: 'wrap',
    },
    paginationButton: {
        padding: '8px 12px',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ddd',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    disabledButton: {
        opacity: 0.5,
        cursor: 'not-allowed',
    },
    activePageButton: {
        padding: '8px 12px',
        backgroundColor: '#4b6bfb',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    pageButton: {
        padding: '8px 12px',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ddd',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    pageSizeSelect: {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        marginLeft: '10px',
    },
    paginationInfo: {
        marginLeft: '15px',
        color: '#666',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modal: {
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '8px',
        width: '500px',
        maxWidth: '90%',
        maxHeight: '90vh',
        overflowY: 'auto',
    },
    confirmModal: {
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '8px',
        width: '400px',
        maxWidth: '90%',
    },
    deleteQuestionPreview: {
        padding: '10px',
        margin: '15px 0',
        backgroundColor: '#f9f9f9',
        borderRadius: '4px',
        fontStyle: 'italic',
    },
    heading: {
        marginTop: 0,
        marginBottom: '20px',
        color: '#333',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    input: {
        padding: '12px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '16px',
    },
    select: {
        padding: '12px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '16px',
    },
    modalButtons: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    cancelButton: {
        padding: '10px 15px',
        backgroundColor: '#f0f0f0',
        color: '#333',
        border: '1px solid #ddd',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '45%',
    },
    saveButton: {
        padding: '10px 15px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '45%',
    },
    deleteConfirmButton: {
        padding: '10px 15px',
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '45%',
    },
};

export default QuestionCreationPage;

