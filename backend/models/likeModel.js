import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

// Same user ek hi event ko multiple baar like na kare
likeSchema.index({ user: 1, event: 1 }, { unique: true });

export const Like = mongoose.model("Like", likeSchema);