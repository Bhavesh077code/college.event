import mongoose from "mongoose";
import mongoose from "mongoose";
const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    location: String,
    location: String,
    image: { type: String, default: null },
    video: { type: String, default: null },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
}, { timestamps: true });

export const Event = mongoose.model("Event", eventSchema);

