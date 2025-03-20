import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();



const generateToken = (user) => {
    return jwt.sign(
        {id: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn: "1h"}
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        {id:user.id, role:user.role},process.env.JWT_REFRESH_TOKEN, {expires:"7d"}
    );

}; //Refresh tokens allow users to obtain new access tokens without needing to re-authenticate, providing a seamless user experience.


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

        res.statur(201).json({message:"User created succssfully ", user : newUser});

        
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }

};

export const login = async (req, res) =>{

    try {
        const {email, password} = req.body;

        //check  if the user exists 
        const User = await User.findOne({where : {email}})
        if(!User){
            res.status(400).json({message: "User does not found", error: error.message});
        }
        
        //validate password
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(400).json({message: "password doesn't match ", error: error.message});
        }

        const accessToken = generateToken(User);
        const refreshToken = generateRefreshToken(User);

        //store the refresh token in the db 

        User.refreshToken = refreshToken;
        await User.save();

        res.status(200).json({message :"Successfully logged in ",accessToken, refreshToken, user: User});
    } catch (error) {
        res.statur(400).json({message:"Error logging in "})
    }
};

export const logout = async (req, res) =>{
    try {
        const user = await User.findByPk(req.user.id);
        if(!user){
            res.status(400).json({message: "User not found"});
        }

        //remove the refresh token from the db because we are logging out
        user.refreshToken = null;
        await user.save();

        res.status(200).json({message:"Successfully logged out"});
    } catch (error) {
        res.statur(400).json({message:"Error logging out "})
    }

};

export const refreshToken = async (req, res) =>{
    try {
        const {token} = req.body;
        if(!token){
            res.status(401).json({message:"No token provided"});
        }

        //verify the token
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET,async (err, decoded) =>{
            if(err){
                return res.status(403).json({message:"Invalid refresh token"});
            }

            const user = await User.findByPk(decoded.id);
            if(!user || user.refreshToken !== token){
                res.status(403).json({message:"Invalid refresh token"});
            }

            //generate new access token
            const newAccessToken = generateToken(user);
            res.json(200).json({accessToken: newAccessToken});
        });
    } catch (error) {
        res.status(500).json({message:"Server error", error: error.message});
    }

};