import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ContentCreatorDashboard() {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    
    useEffect(() => {
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
    }, [navigate]);


  return (
    <div style={style.container}>
        {/* <h2 style={style.subheading}>Content Creator Dashboard</h2> */}
        <div>
        <h2 style={style.subheading}>Welcome ! to your dashboard {username} </h2>
        {/* <h2 style={style.heading}>Content Creator dashboard</h2> */}

        </div>
        <div style={style.buttonContainer}>
            <button style={style.button} onClick={  ()=>{navigate('/questions' )}  }>Question Creation Page</button>
            <button style={style.button} onClick={  ()=>{navigate('/assessment')}  }>Assessment Creation Page</button>
        </div>
    </div>
  );
};

const style = {
    subheading: {
        marginTop: '20px',
        marginBottom: '10px',
        alignSelf: 'center',
        color: '#000C',
        fontSize:'30px'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'top',
        height: '100vh',
        gap:'30px',
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