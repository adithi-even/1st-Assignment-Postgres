import express from 'express';
import {login, register, logout, refreshToken} from '../Controllers/auth.controller.js';
import authenticate from '../Middleware/authenticate.js';

const router  = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout',authenticate, logout);
router.post('/refresh', refreshToken);

export default router;