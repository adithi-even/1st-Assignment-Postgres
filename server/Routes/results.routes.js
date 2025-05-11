import express from 'express';
import { getAssessmentResults, getResultById, getUserResults, submitResult } from '../Controllers/result.controller.js';
import authorize from '../Middleware/authorize.js';
import authenticate from '../Middleware/authenticate.js';

const router = express.Router();

router.post("/submit", submitResult);
router.get("/:resultId", getResultById);  //To view a detailed result of a single test attempt by a user.
router.get("/assessment/:assessmentId", authenticate, authorize(["content_creator", "end_user"]), getAssessmentResults); //to see the results of how many users has taken the particular assessement in the test
router.get("/user/:userId", authenticate, getUserResults);//to see the results of what all the tests/assessment that an individual user has taken the test

export default router;
