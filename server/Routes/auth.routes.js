import express from 'express';
import {login, register, logout, refreshaToken} from '../Controllers/auth.controller.js';

const router  = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.post('/refresh-token', refreshaToken);

export default router;