
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import "dotenv/config"
import { User } from "../models/userModel.js"

export const userRegister = async (req, res) => {
    try {
        const { firstname, lastname, email, password, age } = req.body;
        if (!firstname || !lastname || !email || !password || !age) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!gmailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please give valid gmail"
            });
        }

        if (age < 18) {
            return res.status(300).json({
                success: false,
                message: "Your are adult, You can't register this site"
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
            firstname,
            lastname,
            email,
            password: hashPassword,
            age,
        });


        const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, { expiresIn: "30d" });
        res.cookie("token", token, { httpOnly: true });

        return res.status(201).json({
            success: true,
            message: "User register successfully",
            data: {
                id: newUser._id,
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                email: newUser.email,
                age: newUser.age,
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

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "7d" });
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

//USER PROFILE
export const userProfile = async (req, res) => {
    return res.status(201).json({
        success: false,
        message: "welcome to user profile"
    })
}

export const logout = async(_ , res) => {
    try {
        return res.status(200).cookie("token", "").json({
         success:true,
         message:"Logout SuccessFully"
        })
    } catch (error) {
        console.log(error)
    }
}