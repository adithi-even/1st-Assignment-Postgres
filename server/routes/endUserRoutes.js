import express from 'express';
import { submitAssessment } from '../controllers/resultController.js';
import { getQuestions } from '../controllers/endUserControllers.js';
import { authMiddleWare } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/questions', authMiddleWare, getQuestions);
router.post('/submit', authMiddleWare, submitAssessment);


export default router;