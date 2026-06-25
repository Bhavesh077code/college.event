import mongoose from "mongoose";

const viewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },

  },
  { timestamps: true }
);


// Same user same event ko dobara view create na kar sake
viewSchema.index({ user: 1, event: 1 }, { unique: true });

export const View = mongoose.model("View", viewSchema);