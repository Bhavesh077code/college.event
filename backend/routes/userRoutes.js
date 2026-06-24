import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { userRegister } from "../controller/userRegisterController.js";
import { loginUser } from "../controller/userLoginController.js";
import { logoutUser } from "../controller/userLogoutController.js";
import { 
  getUserProfile, 
  getUserPosts, 
  getUserLikedPosts, 
  updateUserProfile 
} from "../controller/userProfileController.js";
import { 
  followUser, 
  unfollowUser, 
  getFollowers, 
  getFollowing 
} from "../controller/followController.js";

const router = express.Router();

// Auth routes
router.post("/register", userRegister);
router.post("/login", loginUser);
router.get("/logout/:id", authMiddleware, logoutUser);

// Profile routes
router.get("/profile/:userId", authMiddleware, getUserProfile);
router.get("/posts/:userId", authMiddleware, getUserPosts);
router.get("/liked/:userId", authMiddleware, getUserLikedPosts);
router.put("/profile/:userId", authMiddleware, updateUserProfile);

// Follow routes
router.post("/follow/:userId", authMiddleware, followUser);
router.post("/unfollow/:userId", authMiddleware, unfollowUser);
router.get("/followers/:userId", authMiddleware, getFollowers);
router.get("/following/:userId", authMiddleware, getFollowing);

export default router;