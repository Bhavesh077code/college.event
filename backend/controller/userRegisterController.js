import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config"



export const userRegister = async (req, res) => {
    try {
        const { firstname, lastname, email, password, age } = req.body;
        if (!firstname || !lastname || !email || !password || !age) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
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
