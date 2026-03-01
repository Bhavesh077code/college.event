
import { Event } from "../models/eventModel.js";
import { getIO } from "../socket/server.js";

export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params; // ✅ only id

        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        // Only admin or event owner can delete
        if (event.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Only admin or owner can delete this event"
            });
        } 

        await Event.findByIdAndDelete(id);

         // 🔥 Socket emit
            const io = getIO();
            io.emit("deleteEvent", (id ), {
              message: " Event Created Deleted",
            });

        return res.status(200).json({
            success: true,
            message: "Event deleted successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


