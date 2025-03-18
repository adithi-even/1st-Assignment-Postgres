import express from 'express';
import  { createAssessment, getAssessment} from '../Controllers/assessments.controller.js';

import authenicate from '../middleware/authenticate.js';
import authorize from '../middleware/authorize.js';

const router = express.Router();

//Routes for assessments

router.post