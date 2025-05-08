import jwt from 'jsonwebtoken';

const generateRefreshToken = (user) =>{
    return jwt.sign(
        {id:user.id, role:user.role},process.env.REFRESH_TOKEN, {expiresIn:"7d"}
    );
};

export default generateRefreshToken; //Refresh tokens allow users to obtain new access tokens without needing to re-authenticate, providing a seamless user experience.




