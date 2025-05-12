import express from 'express';
import authenticate from '../Middleware/authenticate.js';
import getDashboardData from '../Controllers/dashboard.controller.js';

const router = express.Router();

router.get('/user-dashboard', authenticate, getDashboardData);



export default router;
