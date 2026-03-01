import express from "express";
import { createEvent} from "../controller/eventController.js";
import upload from "../middleware/upload.js";
import  adminOnly  from "../middleware/adminOnly.js"
import authMiddleware from "../middleware/authMiddleware.js";
import { getAllEvents } from "../controller/getAllEventController.js";
import { editEvent } from "../controller/editEventController.js";
import { deleteEvent } from "../controller/deleteEventController.js";
import { getAllUser } from "../controller/viewAllUserController.js";


const router = express.Router();

router.post("/event",authMiddleware,adminOnly, upload.single("image"), createEvent);
router.get("/events",authMiddleware, getAllEvents);
router.put("/event/edit/:id", authMiddleware, adminOnly, editEvent);
router.delete("/event/delete/:id", authMiddleware, adminOnly, deleteEvent);
router.get("/users", authMiddleware, adminOnly, getAllUser)


export default router;