import express from 'express';
import  { createAssessment, getAssessments, getAssessmentById, updateAssessment, deleteAssessment, getAssessmentsForEndUser, startAssessment} from '../Controllers/assessment.controller.js';

import authenticate from '../Middleware/authenticate.js';
import authorize from '../Middleware/authorize.js';

const router = express.Router();

//Routes for assessments

router.post('/', authenticate, authorize("content_creator"), createAssessment); //
router.get('/', authenticate, authorize("content_creator"), getAssessments); //

router.get('/available', authenticate, authorize("end_user"), getAssessmentsForEndUser);

router.get('/:id', authenticate, getAssessmentById); //
router.put('/:id', authenticate, authorize("content_creator"), updateAssessment); //
router.delete('/:id', authenticate, authorize("content_creator"), deleteAssessment); //

//end_user
router.post('/:id/start', authenticate, authorize("end_user"), startAssessment); 

export default router;