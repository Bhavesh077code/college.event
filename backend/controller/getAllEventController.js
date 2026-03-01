

import { Event } from "../models/eventModel.js";


export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find()
            .populate("user", "email")
            .sort('-createdAt');

        return res.status(200).json({
            success: true,
            events
        });
    } catch (error) {
        console.error("GET ALL EVENTS ERROR 👉", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong in GETALL EVENTS"
        });
    }
};
