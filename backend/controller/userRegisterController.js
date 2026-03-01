import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config"



export const userRegister = async (req, res) => {
    try {
        const { username, email, password} = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }


        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User is already existing"
            });
        }

        if (password.length < 8) {
            return res.status(402).json({
                success: false,
                message: "Password must be 8 character"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashPassword,
        });


        const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, { expiresIn: "30d" });
        res.cookie("token", token, { httpOnly: true });

        return res.status(201).json({
            success: true,
            message: "User register successfully",
            data: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: "user"
            }
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
}
