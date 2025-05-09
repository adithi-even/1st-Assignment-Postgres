

export const getUserById = async (req, res) => {
    try {
        const user = req.user;
        if(!user) return res.status(404).json({message: 'User not found'});
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};