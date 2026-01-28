import express from "express";
import { loginScanner } from "../middleware/loginScanner.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { userRegister } from "../controller/userRegisterController.js";
import { loginUser } from "../controller/userLoginController.js";
import { logoutUser } from "../controller/userLogoutController.js"
//import { validateUser } from "../validator/userValidator.js";



const router = express.Router();


router.post("/register", userRegister);
router.post("/login",loginScanner, loginUser);
router.get("/logout/:id",authMiddleware, logoutUser);

export default router ;