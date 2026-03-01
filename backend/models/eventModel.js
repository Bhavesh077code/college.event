
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    location: String,
    date: String,
    image: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ add this
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // 🔹 array of userIds

}, { timestamps: true });

export const Event = mongoose.model("Event", eventSchema);

