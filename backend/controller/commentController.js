


import { Comment } from "../models/commentModel.js";
import { Notification } from "../models/notificationModel.js";

// Add Comment
export const addComment = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { comment } = req.body;

    const newComment = await Comment.create({
      user: req.user.id,
      event: eventId,
      comment,
    });

    res.status(201).json({
      success: true,
      message: "Comment added",
      data: newComment,
    });

    await Notification.create({
      recipient: postOwner,
      sender: req.user.id,
      type: "comment",
      message: "username liked your post",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all comments
export const getComments = async (req, res) => {
  try {
    const { eventId } = req.params;

    const comments = await Comment.find({
      event: eventId,
    })
      .populate("user", "name email username")
      .populate("replies.user", "name email username")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add Reply to Comment
export const addReply = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { comment } = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        $push: {
          replies: {
            user: req.user.id,
            comment,
            createdAt: new Date(),
          },
        },
      },
      { new: true },
    )
      .populate("user", "name email username")
      .populate("replies.user", "name email username");

    res.status(201).json({
      success: true,
      message: "Reply added",
      data: updatedComment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Comment
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({
      success: true,
      message: "Comment deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

