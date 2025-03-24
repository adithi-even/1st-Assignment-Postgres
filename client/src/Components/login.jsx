import React from 'react';
import { login }from '../services/authService'; 

function login() {
    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const user = login(fromData);
        console.log("Login Successful",user);

      } catch (error) {
        
      }

    }
  return (
    <div>login</div>
  )
}

export default login;