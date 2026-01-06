import express from "express";
import { loginUser, logout, userProfile, userRegister } from "../controller/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/register", userRegister)
router.post("/login", loginUser);
router.post("/profile", authMiddleware, userProfile);
router.get("/logout/:id", logout);

export default router ;