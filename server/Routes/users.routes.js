import express from "express";
import { getUseProfile } from "../Controllers/users.controller.js";
import authenticate from "../Middleware/authenticate.js"    ;

const router = express.Router();

router.get('/profile', authenticate, getUseProfile);

export default router;