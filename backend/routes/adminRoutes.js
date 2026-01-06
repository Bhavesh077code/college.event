
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminProfile } from "../controller/adminController.js";
import adminOnly from "../middleware/adminOnly.js";



const router = express.Router();

router.post("/profile",authMiddleware, adminOnly, adminProfile)

export default router;