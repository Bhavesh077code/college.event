import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {
        type:String,
        require:true
    },
    description: {
        type:String,
        require:true,
    },
    image : {
        type:String,
        require:true
    },
    location: {
        type:String,

    },
     postedBy: {
         type: mongoose.Schema.Types.ObjectId,
          ref: "User", 
          required: true
         }

}, {timestamps:true});

export const Event = mongoose.model("event", eventSchema);