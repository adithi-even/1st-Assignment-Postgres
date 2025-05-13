import React, { useState } from 'react';
import { loginUser } from "../../services/authService";
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [formData, setFormdata] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const data = await loginUser(formData);
        setMessage(data.message);
        console.log("Login Response:", data);

        if(data.account && data.account.role){          
          
            localStorage.setItem("token", data.accessToken); 
            localStorage.setItem("user", JSON.stringify(data.account)); 
            localStorage.setItem("role",data.account.role); //storing the role of the user so that we can use it in the redirection of the dashboard
            console.log("data:", data);
            console.log("Stored Role:", localStorage.getItem("role"));
            console.log("Stored User:", localStorage.getItem("user"));
            console.log("Stored token:", localStorage.getItem("token"));

            
            if (data.account.role === "content_creator") {
              
                console.log("Navigating to /cc-dashboard...");
                navigate("/cc-dashboard"); //redirect to CC dashboard
                
              } else {
                console.log("Navigating to /user-dashboard...");
                navigate("/user-dashboard");//redirect to end user
              }

        }
        } catch (error) {
          setMessage(error.message);
    }
}

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.subheading}>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
        <p style={styles.message}>{message}</p>
      </form>
    </div>
  );
}

const styles = {
  subheading: {
        // marginTop: '20px',
        marginBottom: '10px',
        alignSelf: 'center',
        color: '#000C',
        fontSize:'30px'
    },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f9',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    width: '300px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  input: {
    marginBottom: '15px',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  message: {
    textAlign: 'center',
    marginTop: '15px',
    color: '#ff4d4d',
  },
};

export default LoginForm;

