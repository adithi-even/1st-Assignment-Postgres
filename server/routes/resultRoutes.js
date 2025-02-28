import express from 'express';
import  {submitAssessment, getResult} from '../controllers/resultController.js';

const router  = express.Router();

router.post('/:id/submit', submitAssessment);
router.get('/:id',getResult);

export default router;