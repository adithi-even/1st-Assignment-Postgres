// this is for authentication (register, login, profile).
import {User} from '../models/userSchema.models.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register a new user

export const registerUser = async (req, res) => {

    console.log("Received Registration Data:", req.body); // ✅ Log incoming data


    const {username, role, password, email} = req.body; //extracting the data from the request body
    
    try {
        if (!username || !role || !password || !email) { //checking if the fields are empty
            return res.status(400).json({message:"Please fill all the fields correctly"});
        }

        if( !['content_creator' , 'end_user'].includes(role) ){
            return res.status(400).json({message:"Role must be either content_creator or end_user"}); //checking if the role is either content_creator or end_user
        }

        const hashedPassword = await bcrypt.hash(password, 10);  //hashing the password , here we aere hashing the password 10 rounds 2^10 times algo
        const newAccount = await User.create({
            username,
            role,
            password: hashedPassword,
            email
        });  //creating a new account with the extracted data

        console.log("User Created Successfully:", newAccount); // ✅ Log created user

            
        res.status(201).json({message:"Account created successfully", newAccount}); //sending the success response
        
    } catch (error) {
        res.status(500).json({message:"Error creating the Account" , Error: error.message}); //sending the error response

    }
    
};

// logging in a user
export const loginUser = async (req, res) => {
    const {password, email} = req.body; //extracting the data from the request body

    if(!password || !email) {
        return res.status(400).json({message:"Please fill all the fields correctly"});
    }


    try {
        const account = await User.findOne({email}); //* finding the account with the email

        if(!account) {
            return res.status(404).json({
                success:false,
                message:"Account/email not found"
            });
        }                                           //*finding the account with the email till here
                                                   
        const isMatch = await bcrypt.compare(password, account.password); //comparing the password with the hashed password

        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Invalid credentials",
            });
        }
           //*comparing the password:

           //bcrypt.compare(password, account.password) checks if the entered password matches the stored hash.If correct, we generate a JWT token for authentication.

           //generate JWT token
           const token = jwt.sign({_id: account._id, role: account.role }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
           //generating the token with the user id and role and the secret key and the expiration time of 1 hr


            console.log("Generated Token:", token); // Add this line


            return res.status(200).json({
                success:true,
                message:"Account found Successfully",
                account ,
                token
            });
            
        
    } catch (error) {
        res.status(500).json({message:"Error retriving the Account" , Error: error.message}); //sending the error response
    }

};

//geting the user profile
export const getUserProfile = async (req, res) => {
    try {
        console.log("User in request:", req.user); // Debugging log

        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Not Authorized, User Data Missing" });
        }

        const user = await User.findById(req.user._id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);

    } catch (error) {
        res.status(500).json({ message: "Error retrieving the User", Error: error.message });
    }
};


// export const getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find({},'_id username'); 
//         //the User.find is the mongoose query and the empty object acts as a filter which will only finds the collection(string) after the {} i.e.,'_id username' (_id and username) and sends in response 
//         return res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json({ message: "Error retrieving the Users", Error: error.message });
        
//     }
// };