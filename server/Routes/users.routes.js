import express from "express";
import { getUserById } from "../Controllers/user.controller.js";
import authenticate from "../Middleware/authenticate.js"    ;

const router = express.Router();

router.get('/profile', authenticate, getUserById); //

export default router;