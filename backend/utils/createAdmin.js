import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import "dotenv/config";

 const createAdmin = async () => {
    try {
        const existingAdmin = await User.findOne({ role: "admin" });
        if (existingAdmin)return;

        const hashPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

        await User.create({
            username: process.env.ADMIN_USERNAME,
            email: process.env.ADMIN_EMAIL,
            password: hashPassword,
            role: "admin"
            
        });

        console.log("Admin created successfully")
    } catch (err) {
        console.log(err.message)
    }
}

export default createAdmin;
