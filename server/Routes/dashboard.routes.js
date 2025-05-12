import express from 'express';
import authenticate from '../Middleware/authenticate';

const router = express.Router();

router.get('/', authenticate, getDashboardData);



export default router;
