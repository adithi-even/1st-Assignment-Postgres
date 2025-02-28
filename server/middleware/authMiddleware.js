import jwt from 'jsonwebtoken';

export const authMiddleWare = (req, res, next) => {
    console.log("Authorization Header:", req.headers.authorization);

    try {
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
            console.log("No token provided or incorrect format");
            return res.status(401).json({ message: 'No token provided, authorization denied' });
        }
        
        const token = req.headers.authorization.split(" ")[1];

        console.log("Raw Token:", token);



        
        if (!token) {
            console.log("Token missing from Authorization header");
            return res.status(401).json({ message: "Token missing from Authorization header" });
        }

        console.log("Token received:", token); 

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded JWT:", decoded); // This will print the decoded token

        if (!decoded._id) {
            console.log("Decoded token does not contain _id");
            return res.status(401).json({ message: "Invalid token format" });
        }

        console.log("Decoded Token:", jwt.decode(token));


        req.user = decoded;
        console.log("decoded Use:", req.user);
        
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        return res.status(401).json({ error: 'Invalid token' });
    }
};


// import jwt from 'jsonwebtoken';

// export const authMiddleWare = (req, res, next) => {
//     const token = req.headers.authorization?.split(" ")[1]; // Ensure this extracts the token

//     console.log("Raw Token Received:", token); // Debugging line

//     if (!token) {
//         return res.status(401).json({ message: "Not Authorized, No Token Provided" });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         console.log("Decoded Token:", decoded); // Debugging line

//         req.user = decoded; // This should contain _id
//         next();
//     } catch (error) {
//         console.error("JWT Verification Failed:", error);
//         res.status(401).json({ message: "Invalid Token" });
//     }
// };
