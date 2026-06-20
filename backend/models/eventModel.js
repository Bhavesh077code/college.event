
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    location: String,
    date: String,
    image: { type: String, default: null },
    video: { type: String, default: null },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ add this

}, { timestamps: true });

export const Event = mongoose.model("Event", eventSchema);

