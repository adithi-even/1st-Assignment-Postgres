
import jwt from 'jsonwebtoken';

const generateAccessToken = (user) =>{
    return jwt.sign(
        {id: user.id, role: user.role}, process.env.ACCESS_TOKEN, {expiresIn: "1h"}
    );
};

export default generateAccessToken; 
