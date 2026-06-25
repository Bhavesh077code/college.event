import mongoose from "mongoose";

const shareSchema = new mongoose.Schema(
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

    platform: {
      type: String,
      default: "copy",
      // facebook, whatsapp, instagram, copy etc.
    },
  },
  { timestamps: true }
);

export const Share = mongoose.model(
  "Share",
  shareSchema
);