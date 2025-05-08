import express from 'express';
import { getQuestions, getQuestionById, createQuestion, updateQuestion, deleteQuestion } from '../Controllers/question.controller.js';

import authenticate from '../Middleware/authenticate.js';
import authorize from '../Middleware/authorize.js';

const router = express.Router();

router.post('/', authenticate, authorize("content_creator"), createQuestion);
router.get('/',authenticate, authorize("content_creator"), getQuestions);
router.get('/:id', authenticate, authorize("content_creator"),getQuestionById);
router.post('/:id', authenticate, authorize("content_creator"), updateQuestion);
router.post('/:id', authenticate, authorize("content_creator"), deleteQuestion);

export default router;
