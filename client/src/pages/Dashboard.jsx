//enduser page
import React, { useState, useEffect } from "react";
import  { getAvailableAssessments }  from '../services/assessmentService.js';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [assessments, setAssessments] = useState([]);
        const [username, setUsername] = useState('');
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAvailableAssessments = async () => {
            try {
                const data = await getAvailableAssessments(); 
                setAssessments(data);
            } catch (error) {
                console.error('Error fetching assessments from Dashboard.jsx => fetchAssessments', error);
            }
        };

         const user = localStorage.getItem('user');
        if (user) {
            try {
                const parsedUser = JSON.parse(user);
                setUsername(parsedUser.username);
            } catch (error) {
                console.error("Error parsing user from localStorage:", error);
                setUsername('User');
            }
        } else {
            navigate('/login');
        }


        fetchAvailableAssessments();
    }, [navigate]);

    const startTest = (assessmentId) => {
        navigate(`/test/${assessmentId}`);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.subheading}>Welcome ! to your dashboard {username} </h2>
            <h2 style={styles.heading}>Available Assessments</h2>
            <div  style={styles.assessmentList}>
                {assessments && Array.isArray(assessments) ? (
                    assessments.map((assessment, index) => (
                        <div key={assessment.id || index} style={styles.assessmentCard}>
                            <h3 style={styles.assessmentTitle}>{assessment.title}</h3>
                            <button 
                                onClick={() => startTest(assessment.id)}
                                style={styles.button}
                            >
                                Start Test
                            </button>
                        </div>
                    ))
                ) : (
                    <p style={styles.noAssessments}>No assessments available at the moment.</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px',
        backgroundColor: '#f4f4f9',
        minHeight: '100vh',
    },
    subheading: {
        marginTop: '20px',
        marginBottom: '10px',
        alignSelf: 'center',
        color: '#000C',
        fontSize:'20px'
    },
    heading: {
        fontSize: '28px',
        color: '#333',
        marginBottom: '30px',
    },
    assessmentList: {
        width:'100%',
        display: 'flex',
        flexDirection:'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
    },
    assessmentCard: {
        width: '70%',
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
    },
    assessmentTitle: {
        fontSize: '20px',
        color: '#555',
        marginBottom: '15px',
        textAlign: 'center',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    noAssessments: {
        color: '#777',
        fontSize: '18px',
        marginTop: '20px',
    },
};

export default Dashboard;
