import { User } from "../models/userModel.js"

export const adminProfile = async (req, res) => {

     const admin = await User.findById(req.userId).select("-password");

    return res.status(201).json({
        success: true,
        message: "Welcome to admin daskbord",
        data : {
            admin: {
            id: admin._id,
            firstname: admin.firstname,
            lastname: admin.lastname,
            email: admin.email,
            role: "admin",
            }
        }
    });
}