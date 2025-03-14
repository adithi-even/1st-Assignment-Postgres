import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    );
};

// User Registration
export const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// User Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate tokens
        const accessToken = generateToken(user);
        const refreshToken = generateRefreshToken(user);

        // Store refresh token in the database
        user.refreshToken = refreshToken;
        await user.save();

        res.status(200).json({ accessToken, refreshToken, user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Logout
export const logout = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Remove refresh token from DB
        user.refreshToken = null;
        await user.save();

        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Refresh Token
export const refreshToken = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        // Verify token
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid refresh token" });
            }

            const user = await User.findByPk(decoded.id);
            if (!user || user.refreshToken !== token) {
                return res.status(403).json({ message: "Invalid refresh token" });
            }

            // Generate new access token
            const newAccessToken = generateToken(user);
            res.status(200).json({ accessToken: newAccessToken });
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// const generateToken = () ={

// }

// const generateRefreshToken = () ={

// }

// export const register = async (req, res) =>{

// }

// export const login = async (req, res) =>{

// }

// export const logout = async (req, res) =>{

// }

// export const refreshToken = async (req, res) =>{
    
// }

