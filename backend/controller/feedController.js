import { Event } from "../models/eventModel.js";
import { Like } from "../models/likeModel.js";
import { User } from "../models/userModel.js";

// Get feed (posts from users you follow + your own posts)
export const getFeed = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const user = await User.findById(userId);

    // Get posts from following users + own posts
    const followingIds = [...user.following, userId];

    const posts = await Event.find({ user: { $in: followingIds } })
      .populate("user", "username profilePicture bio")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get like status for current user
    const postsWithLikes = await Promise.all(
      posts.map(async (post) => {
        const isLiked = await Like.findOne({
          user: userId,
          event: post._id,
        });

        const likesCount = await Like.countDocuments({
          event: post._id,
        });

        return {
          ...post.toObject(),
          isLiked: !!isLiked,
          likesCount,
        };
      })
    );

    const totalPosts = await Event.countDocuments({
      user: { $in: followingIds },
    });

    res.status(200).json({
      success: true,
      posts: postsWithLikes,
      pagination: {
        page,
        limit,
        total: totalPosts,
        pages: Math.ceil(totalPosts / limit),
      },
    });
  } catch (error) {
    console.error("Feed Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get explore feed (all posts)
export const getExploreFeed = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Event.find()
      .populate("user", "username profilePicture bio")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get like status for current user
    const postsWithLikes = await Promise.all(
      posts.map(async (post) => {
        const isLiked = await Like.findOne({
          user: userId,
          event: post._id,
        });

        const likesCount = await Like.countDocuments({
          event: post._id,
        });

        return {
          ...post.toObject(),
          isLiked: !!isLiked,
          likesCount,
        };
      })
    );

    const totalPosts = await Event.countDocuments();

    res.status(200).json({
      success: true,
      posts: postsWithLikes,
      pagination: {
        page,
        limit,
        total: totalPosts,
        pages: Math.ceil(totalPosts / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
