

import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
    try {
        // ✅ Read token from Authorization header
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer "))

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "No token, authorization denied",
            });
        }

        const token = authHeader.split(" ")[1]; // Bearer <token>

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }

        
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message || "Token verification failed",
        });
    }
};

export default authMiddleware;
