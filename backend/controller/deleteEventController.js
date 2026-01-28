import { Event } from "../models/eventModel.js";

export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        if (event.postedBy.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Only   admin can delet this events"
            });
        }

        const deleteEvent = await Event.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Event Deleted Successfully"
        });

    } catch (error) {
        res.json({
            message: error.message
        })
    }
}
