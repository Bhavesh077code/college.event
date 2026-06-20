
import { Comment } from "../models/commentModel.js";

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
      .populate("user", "name email")
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