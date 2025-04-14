import express from 'express';
import { getAssessmentResults, getUserResults } from '../Controllers/result.controller.js';
import authorize from '../Middleware/authorize.js';
import authenticate from '../Middleware/authenticate.js';

const router = express.Router();

router.get("/assessment/:assessmnetId", authenticate, authorize(["content_creator", "end_user"]), getAssessmentResults);
router.get("/user/:userId", authenticate, getUserResults);

export default router;