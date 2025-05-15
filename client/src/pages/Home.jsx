import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

function Home() {
  const navigate = useNavigate(); 

  

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to the Assessment App!</h1>

      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => navigate('/login')}>
          Login
        </button>
        <button style={styles.button} onClick={() => navigate('/register')}>
          Register
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  }
};

export default Home;
