import jwt from 'jsonwebtoken';
import dotenvconfig from "../config/dotenv";

const generateToken = (user) =>{
    return jwt.sign(
        {id: user.id, role: user.role },
        dotenvconfig.JWT_SECRET,
        {expiresIn: '7d'}
    );
};

export default generateToken; //here we are using the default export i.e., the dotenvconfig to export the configuration object, which works as (when we are exporting something which is an object we can export it without giving any name and when we are importing we can give it any name and then we can use the imported object)
