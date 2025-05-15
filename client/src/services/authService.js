import API from './api.js'


  export const registerUser = async (userData) => {
    try {

        console.log("Sending Registration Data:", userData); 

        const response = await API.post("/auth/register", userData); //through the API instance what we have created(i.e.,const API) we are getting the /auth/register  and it is specifically for authentication (registering and logging in users).

        console.log("Server Response:", response.data); 
        
        return response.data;
    } catch (error) {
        console.error("Error registering user in authService.js/registeruser", error);
        throw error;
    }
  };

  export const loginUser = async (loginData) => {
    try {

      const response = await API.post("/auth/login", loginData); //through the API instance what we have created(i.e.,const API) we are getting the /auth/login  and it is specifically for authentication (registering and logging in users).
      console.log("API Response:", response.data);

     
      localStorage.setItem("token", response.data.token);

      if (response.data.account) { 
          localStorage.setItem("role", response.data.account.role); 
          localStorage.setItem("user", JSON.stringify(response.data.account)); 
      }

      console.log("Stored User:in localStorage.getItem('user')", localStorage.getItem("user"));


      return response.data;
  } catch (error) {
      console.error("Error logging in user in authService.js/loginUser", error);
      throw error;
  }
};

  export const logout = () => {
    localStorage.removeItem('token');
};
