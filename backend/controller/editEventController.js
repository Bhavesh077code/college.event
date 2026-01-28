import { Event } from "../models/eventModel.js";


export const editEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event Not Found"
            });
        }

        if (event.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "You are not all to edit this event"
            });
        }

        const updateEvent = await Event.findByIdAndUpdate(
           //id,
            //req.body,
           // { new: true }
           req.eventId, 
           {
              $set: {
                title,
                description,
                location
              }
           }
        );

        return res.status(200).json({
            success: true,
            message: "Event Edited Successfully",
            event
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
