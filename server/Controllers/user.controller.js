import User from "../models/user.model.js";

export const createUser = async (req, res) => {
    try {
        const {username, email, password, role} = req.body;
        const newUser = await username.create({username, email, password, role});
        res.status(201).json(newUser, "user successfully created");
    } catch (error) {
        res.status(409).json({message: error.message});     
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if(!user) return res.status(404).json({message: 'User not found'});
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};