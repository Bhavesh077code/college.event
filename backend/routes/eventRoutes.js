import express from "express";
import { createEvent } from "../controller/eventController.js";
import upload from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { getAllEvents } from "../controller/getAllEventController.js";
import { editEvent } from "../controller/editEventController.js";
import { deleteEvent } from "../controller/deleteEventController.js";
import { toggleLike, getLikes } from "../controller/LikeController.js";
import { addComment, getComments, deleteComment } from "../controller/commentController.js";
import { getFeed, getExploreFeed } from "../controller/feedController.js";

const router = express.Router();

// Post/Event routes
router.post(
  "/create",
  authMiddleware,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  createEvent
);

router.get("/feed", authMiddleware, getFeed);
router.get("/explore", authMiddleware, getExploreFeed);
router.get("/all", authMiddleware, getAllEvents);

router.put(
  "/edit/:id",
  authMiddleware,
  editEvent
);

router.delete(
  "/delete/:id",
  authMiddleware,
  deleteEvent
);

// Like routes
router.post("/like/:eventId", authMiddleware, toggleLike);
router.get("/likes/:eventId", authMiddleware, getLikes);

// Comment routes
router.post("/comment/:eventId", authMiddleware, addComment);
router.get("/comments/:eventId", authMiddleware, getComments);
router.delete("/comment/:commentId", authMiddleware, deleteComment);

export default router;