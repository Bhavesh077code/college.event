

import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token, authorization denied"
            });
        }


        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = await User.findById(decoded.id);
        if (!req.userId) {
            return res.satsus(401).json({
                success: false,
                message: "Invalid token"
            });
        }

        // req.userId = decoded.id;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};


export default authMiddleware;
