import express from 'express';
import {createQuestion, getAllQuestions, getQuestionById } from '../controllers/questionController.js';

const router = express.Router();

router.get('/',getAllQuestions);
router.get('/:id',getQuestionById);
router.post('/',createQuestion);

export default router;