import express from "express";
import { createEvent, deleteEvent, editEvent, getAllEvents} from "../controller/eventController.js";
import upload from "../middleware/upload.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import  adminOnly  from "../middleware/adminOnly.js"

const router = express.Router();

router.post("/event",authMiddleware, adminOnly, upload.single("image"), createEvent);
router.get("/events", getAllEvents);
router.put("/event/edit/:id", authMiddleware, adminOnly, editEvent);
router.delete("/event/delete/:id", authMiddleware, adminOnly, deleteEvent);

export default router;