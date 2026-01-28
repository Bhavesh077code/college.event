
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config"
import { User } from "../models/userModel.js"



//LOGIN PAGE
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(401).json({
                success: false,
                message: "Incorrect Password"
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "30d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        if (user.role === "admin") {
            return res.status(201).json({
                success: true,
                message: "Admin register successfully",
                token,
                admin: {
                    id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    role: "admin"
                }
            })
        } else {
            return res.status(201).json({
                success: true,
                message: "User login Successfully",
                token,
                user: {
                    id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    role: "user"
                }
            });
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
