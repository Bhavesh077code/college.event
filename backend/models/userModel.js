import mongoose from "mongoose";

const userSchema =  new mongoose.Schema({
    firstname: {
        type:String,
        required:true
    },
    lastname: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true
    },
    age: {
        type:Number,
    },
    role: {
        type:String,
        emue: ["user", "admin"],
        default: "user"
    }
}, {timestamps:true});

export const User = mongoose.model("user" , userSchema);