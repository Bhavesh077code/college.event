
/*
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

*/

/*
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

 const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split("")[1]; // Bearer token

        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }

        req.user = { id: user._id }; // ✅ Attach user ID to request
        next();

    } catch (error) {
        console.error("Auth Middleware Error 👉", error);
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
};

export default authMiddleware;

*/



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

        const user = await User.findById(decoded.id);
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
