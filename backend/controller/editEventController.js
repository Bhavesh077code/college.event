import { Event } from "../models/eventModel.js";


export const editEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const{title , description, location} =  req.body

        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event Not Found"
            });
        }

        if (event.user.toString() !== req.user._id.toString() && req.user.role !== "admin")
            return res.status(403).json({
                success: false,
                message: "Only admin can edit this event"
            })

        await Event.findByIdAndUpdate(
           id, {
               $set: {title, description, location}
           },
           {new: true}
        ); 

         res.status(200).json({
                success: true,
                message: "Event Edited Successfully",
            });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
