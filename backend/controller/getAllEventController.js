import { Event } from "../models/eventModel.js";


export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find()
            .populate("user", "email")
            .sort('-createdAt');

        return res.status(200).json({
            Success: true,
            events
        })
    } catch (error) {
        return res.status(500).json({
            success: true,
            message: "Something error in GETALLEVENTS"
        })
    }
}

