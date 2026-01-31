import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9_.-]*$/.test(v); // Allow alphanumeric, underscore, dot, and hyphen
            },
            message: "Invalid Image Address Formate"
        }
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, { timestamps: true });

export const User = mongoose.model("user", userSchema);