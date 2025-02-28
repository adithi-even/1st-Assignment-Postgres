import express from 'express';  
import { registerUser, loginUser, getUserProfile } from '../controllers/userController.js';
import { authMiddleWare } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register' , registerUser);
router.post('/login' , loginUser);
router.get('/profile',authMiddleWare, getUserProfile);
// router.get('/users',authMiddleWare, getAllUsers);

export default router;