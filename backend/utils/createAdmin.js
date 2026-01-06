import bcrypt from "bcrypt"
import { User } from "../models/userModel.js"

 const createAdmin = async () => {
    try {
        const existingAdmin = await User.findOne({ role: "admin" });
        if (existingAdmin)return;

        const hashPassword = await bcrypt.hash("bhavesh12", 10);

        await User.create({
            firstname: "Collage",
            lastname: "admin",
            email: "collageadmin1@gmail.com",
            password: hashPassword,
            age: 35,
            role: "admin",
        });

        console.log("Admin created successfully")
    } catch (err) {
        console.log(err.message)
    }
}

export default createAdmin;
