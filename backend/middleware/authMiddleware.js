
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";


export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(400).json({
            success: false,
            message: "Token reqired"
        })
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Token"
            });
        }

        req.userId = user.id;
        req.userRole = user.role;

        // ✅ STANDARD
        req.user = {
            id: decoded.id
        };

        next()

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }



}