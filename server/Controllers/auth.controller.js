import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from "dotenv";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";

dotenv.config();

export const register = async (req, res) =>{
    try {
        const {username, email, password, role} = req.body;

        //checking if the user already exist
        const existingUser = await User.findOne({where : {email}});
        if(existingUser){
            return res.status(400).json({messsage:"user already exists"})    ;
        }

        //hashing
        const hashedPassword = await bcrypt.hash(password, 10 );

        //create new user

        const newUser = await User.create(
            {
                username,
                email,
                role,
                password:hashedPassword,
            }
        );

        res.status(201).json({message:"User created succssfully ", user : newUser});
 
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }

};

export const login = async (req, res) =>{

    try {
        const {email, password} = req.body;

        //check  if the user exists 
        const user = await User.findOne({where : {email}})
        if(!user){
             res.status(400).json({message: "User does not found", error: error.message});
        }

        console.log("userrrr", user);
         
        //validate password
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(400).json({message: "password doesn't match ", error: error.message});
        }

        console.log("isMatchhhhhhh", isMatch);
        
        const accessToken = generateAccessToken(user.get());
        const refreshToken = generateRefreshToken(user.get());

        //store the refresh token in the db 

        user.refreshToken = refreshToken;
        await user.save();

        res.status(200).json({message :"Successfully logged in ",accessToken, refreshToken, user: User});

    } catch (error) {
        res.status(400).json({message:"Error logging in "})
    }
};

export const logout = async (req, res) =>{
    try {
        const user = await User.findByPk(req.user.id);
        
        console.log("loggout", user);

        if(!user){
           return res.status(400).json({message: "User not found"});
        }

        

        //remove the refresh token from the db because we are logging out
        user.refreshToken = null;
        await user.save();

        res.status(200).json({message:"Successfully logged out"});
    } catch (error) {

        console.error("Error during logout:", error);
        res.status(400).json({message:"Error logging out "})
    }

};

export const refreshToken = async (req, res) =>{
    try {
        const {token} = req.body;
        if(!token){
           return res.status(401).json({message:"No token provided"});
        }

        //verify the token
        jwt.verify(token, process.env.REFRESH_TOKEN,async (err, decoded) =>{
            if(err){
                return res.status(403).json({message:"Invalid refresh token"});
            }

            const user = await User.findByPk(decoded.id);
            if(!user || user.refreshToken !== token){
               return res.status(403).json({message:"Invalid refresh token"});
            }

            //generate new access token
            const newAccessToken = generateAccessToken(user);
            res.status(200).json({accessToken: newAccessToken});
        });
    } catch (error) {
        res.status(500).json({message:"Server error", error: error.message});
    }

};