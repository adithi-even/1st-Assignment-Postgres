const authorize = (roles = []) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){

            return res.status(401).json({message:"Unauthorized"});
        }

        console.log("roleeeeeeeeeeeeee", req.user.role);
        
        next();
    };
};

export default authorize;