import { User } from "../models/userModel.js";
import { Event } from "../models/eventModel.js";
import { Like } from "../models/likeModel.js";

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId)
      .select("-password")
      .populate("followers", "username profilePicture")
      .populate("following", "username profilePicture");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Get user's posts count
    const postsCount = await Event.countDocuments({ user: userId });

    // Get user's likes count
    const likesCount = await Like.countDocuments({ user: userId });

    res.status(200).json({
      success: true,
      user: {
        ...user.toObject(),
        postsCount,
        likesCount,
        followersCount: user.followers.length,
        followingCount: user.following.length,
      },
    });
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get user's posts
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    const posts = await Event.find({ user: userId })
      .populate("user", "username profilePicture")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get user's liked posts
export const getUserLikedPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    const likedPosts = await Like.find({ user: userId })
      .populate({
        path: "event",
        populate: { path: "user", select: "username profilePicture" },
      })
      .sort({ createdAt: -1 });

    const posts = likedPosts.map((like) => like.event);

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { bio, profilePicture } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { bio, profilePicture },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
