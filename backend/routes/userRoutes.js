import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { userRegister } from "../controller/userRegisterController.js";
import { loginUser } from "../controller/userLoginController.js";
import { logoutUser } from "../controller/userLogoutController.js";
import {
  getUserProfile,
  getUserPosts,
  getUserLikedPosts,
  updateUserProfile,
} from "../controller/userProfileController.js";
import {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
} from "../controller/followController.js";

// ⚠️ FIX 1: Apne Cloudinary config wale file ko import karein
// (Path check kar lein agar aapka upload.js kisi aur folder me hai)
import upload from "../middleware/upload.js";
import { addView, getViewsCount } from "../controller/viewController.js";
import { deleteNotification, getNotifications, markAsRead } from "../controller/notificationController.js";

const router = express.Router();

// Auth routes
router.post("/register", userRegister);
router.post("/login", loginUser);
router.get("/logout/:id", authMiddleware, logoutUser);

// Profile routes
router.get("/profile/:userId", authMiddleware, getUserProfile);
router.get("/posts/:userId", authMiddleware, getUserPosts);
router.get("/liked/:userId", authMiddleware, getUserLikedPosts);

// ⚠️ FIX 2: Local storage hata diya aur upload.single("profilePicture") kar diya hai
router.put(
  "/profile/:userId",
  authMiddleware,
  upload.single("image"),
  updateUserProfile,
);

// Follow routes
router.post("/follow/:userId", authMiddleware, followUser);
router.post("/unfollow/:userId", authMiddleware, unfollowUser);
router.get("/followers/:userId", authMiddleware, getFollowers);
router.get("/following/:userId", authMiddleware, getFollowing);

router.post("/views/:eventId", authMiddleware, addView);
router.get("/views/:eventId", authMiddleware, getViewsCount);

router.get("/notifications", authMiddleware, getNotifications);
router.put("/read/:id", authMiddleware, markAsRead);
router.delete("/:id", authMiddleware, deleteNotification);

export default router;
