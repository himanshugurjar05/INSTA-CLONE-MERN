import { Router } from "express";
import { Signup, Login, Profile } from "../Controller/UserController.js";
import upload from "../Middleware/Multer.js";
import Authmiddleware from "../Middleware/UserMiddleware.js";

const router = Router();

router.post('/signup',upload.single('photo'),  Signup)
router.post('/login', Login)
router.get('/profile', Authmiddleware, Profile)

export default router;
