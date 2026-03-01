import { User } from "../models/userModel.js"

export const getAllUser = async (req, res) => {

    try {
        const loggedInUser = req.userId


        // Only admin or event owner can delete
        if (req.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Only admin or owner can delete this event"
            });
        }

        const filteredUser = await User.find({ _id: { $ne: loggedInUser } }).select("-password ");
        return res.status(200).json({
            success: true,
            message: "Successfully get all user",
            filteredUser,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Get All Profile Message"
        })
    }
}