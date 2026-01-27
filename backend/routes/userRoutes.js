import express from "express";
import { loginUser, logout, userRegister } from "../controller/userController.js";
import { loginScanner } from "../middleware/loginScanner.js";
import authMiddleware from "../middleware/authMiddleware.js";
//import { validateUser } from "../validator/userValidator.js";



const router = express.Router();


router.post("/register", userRegister);
router.post("/login",loginScanner, loginUser);
router.get("/logout/:id",authMiddleware, logout);

export default router ;