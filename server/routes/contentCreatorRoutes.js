import express from 'express';
import {createQuestion, updateQuestion, deleteQuestion} from '../controllers/contentCreatorController.js';
import { authMiddleWare } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/question',authMiddleWare, createQuestion);
router.put('/question/:id',authMiddleWare, updateQuestion);
router.delete('/question/:id',authMiddleWare, deleteQuestion);

export default router;