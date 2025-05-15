import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const [role, setRole] = useState(null);

    useEffect(() => {
      const storedRole = localStorage.getItem('role');
      setRole(storedRole);
    
    }, [])
    

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        navigate('/login'); 
    };

    return (

      
            <nav style={styles.navbar}>
            <div style={styles.logo}>
                <Link to="/" style={styles.logoLink}>Assessment App</Link>
            </div>
            <ul style={styles.navList}>
                {role === 'content-creator' && (
                <>
                    <li>
                        <Link to="/cc-dashboard" style={styles.navLink}>Content Creator Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/questions" style={styles.navLink}>Create Question</Link>
                    </li>
                    <li>
                        <Link to="/assessment" style={styles.navLink}>Create Assessment</Link>
                    </li>
                </>
                )}
                {role === 'end_user' && (
                <>
                    <li>
                        <Link to="/user-dashboard" style={styles.navLink}>Take Test</Link>
                    </li>
                    <li>
                        <Link to="/results" style={styles.navLink}>My Results</Link>
                    </li> 
                </>
                )}

                {role &&
                <>
                     <li>
                        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
                    </li>
                </>
                
                }
                
                {!role &&
                <>
                    <li>
                        <Link to="/login" style={styles.navLink}>Login</Link>
                    </li>
                    <li>
                        <Link to="/register" style={styles.navLink}>Register</Link>
                    </li>
                </>
                
                }
    
            </ul>
        </nav>

        
        
    );
}

const styles = {
    hide:{
        display:'none',
    },
    navbar: {
        backgroundColor: '#333',
        color: 'white',
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        fontSize: '20px',
        fontWeight: 'bold',
        backgroundColor: '#2e46b9',
        padding: '10px',
        borderRadius:'50px'
    },
    logoLink: {
        color: 'white',
        textDecoration: 'none',
    },
    navList: {
        listStyle: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        margin: 0,
        padding: 0,
    },
    navLink: {
        color: 'white',
        textDecoration: 'none',
        backgroundColor: '#2e46b9',
        padding: '10px',
        borderRadius:'50px'
    },
    logoutButton: {
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        padding: '8px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

export default Navbar;