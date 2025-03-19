import express from 'express';
import authenticate from '../Middlewares/authenticate.js';
import {submitResult, getResultById} from '../Controllers/results.controller.js';

router.post('/',authenticate, submitResult);
router('/:id', getResultById);

export default router;