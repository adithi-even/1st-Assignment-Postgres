import React, { useState } from "react";
import { registerUser } from "../../services/authService";
import { useNavigate } from 'react-router-dom';


const RegisterForm = () => {
  const [formData, setFormdata] = useState({
    username: '',
    email: '',
    password: '',
    role: 'end_user',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(formData);

      console.log("Registration Success:", data); // ✅ Log success response

      setMessage(data.message);

       if (data.user && data.user.role) { // ✅ Ensure `user` exists in response
        localStorage.setItem("role", data.user.role);

            if (data.user.role === "content_creator") {
                navigate("/cc-dashboard"); // Redirect Content Creator
              } else {
                console.log("Response Data:", data);
                navigate("/user-dashboard"); // Redirect End User
                console.log("navigating to user-dashboard ");

            }
        } else {
            console.error("Unexpected Response Format:", data);
            setMessage("Unexpected response format. Try again.");
        }

    } catch (error) {
      setMessage(error.message);
      console.error("Registration Error:", error);

    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Register</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
        />
        <select name="role" value={formData.role} onChange={handleChange} style={styles.select}>
          <option value="end_user">End User</option>
          <option value="content_creator">Content Creator</option>
        </select>
        <button type="submit" style={styles.button}>Register</button>
        <p style={styles.message}>{message}</p>
      </form>
    </div>
  );
};

const styles = {
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
  select: {
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

export default RegisterForm;
