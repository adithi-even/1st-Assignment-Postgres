import express from 'express';
import  { createAssessment, getAssessments, getAssessmentById, updateAssessment, deleteAssessment} from '../Controllers/assessments.controller.js';

import authenticate from '../middleware/authenticate.js';
import authorize from '../middleware/authorize.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

//Routes for assessments

router.post('/', authenticate, authorize("content_creator"), createAssessment);
router.get('/', authenticate, authorize("content_creator"), getAssessments);
router.get('/:id', authenticate, getAssessmentById);
router.put('/:id', authenticate, authorize("content_creator"), updateAssessment);
router.delete('/:id', authenticate, authorize("content_creator"), deleteAssessment);

export default router;