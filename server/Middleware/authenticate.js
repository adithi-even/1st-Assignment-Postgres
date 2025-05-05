import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

const authenticate = async (req, res, next) => {
    try {
        const token = req.header("Authorization");

        if(!token){
            return res.status(401).json({message :"Access denied"})

        }

        const decoded  = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);

        console.log(decoded, "decodddeeeddd");
        

        const user = await User.findByPk(decoded.id);

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        req.user = user;//attach user info to the request object
        next();
    } catch (error) {
        return res.status(500).json({message: "Server error", error: error.message});
    }
};

export default authenticate;