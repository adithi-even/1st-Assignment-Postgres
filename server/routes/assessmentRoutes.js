import express from 'express';
import {createAssessment, getAssessments, startAssessment} from '../controllers/assessmentController.js';

const router = express.Router();

router.post('/',createAssessment);
router.get('/',getAssessments);
router.post('/:id/start',startAssessment);

export default router;
