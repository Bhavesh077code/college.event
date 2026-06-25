import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: { type: Date, default: Date.now },
}, { _id: true });

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    comment: {
      type: String,
      required: true,
      trim: true,
    },

    replies: [replySchema],
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);

export const Comment = mongoose.model("Comment", commentSchema);