import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ContentCreatorDashboard() {

    const navigate = useNavigate();
    
    useEffect(()=>{

    },[])


  return (
    <div style={style.container}>
        <h2>Content Creator Dashboard</h2>
        <div style={style.buttonContainer}>
            <button style={style.button} onClick={  ()=>{navigate('/questions' )}  }>Question Creation Page</button>
            <button style={style.button} onClick={  ()=>{navigate('/assessments')}  }>Assessment Creation Page</button>
        </div>
    </div>
  );
};

const style = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f9',
    },
    heading: {
        fontSize: '28px',
        marginBottom: '20px',
        color: '#333',
    },
    buttonContainer: {
        display: 'flex',
        gap: '20px',
    },
    button: {
        padding: '15px 25px',
        fontSize: '18px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default ContentCreatorDashboard;