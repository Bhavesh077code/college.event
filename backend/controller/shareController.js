import { Share } from "../models/shareModel.js";
import { Event } from "../models/eventModel.js";


// Add Share
export const addShare = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { platform } = req.body;


    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }


    await Share.create({
      user: req.user.id,
      event: eventId,
      platform: platform || "copy",
    });


    const shareCount = await Share.countDocuments({
      event: eventId,
    });


    res.status(201).json({
      success: true,
      message: "Post shared",
      shareCount,
    });


  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message,
    });

  }
};



// Get Share Count
export const getShareCount = async (req,res)=>{
  try{

    const {eventId}=req.params;


    const shareCount = await Share.countDocuments({
      event:eventId,
    });


    res.status(200).json({
      success:true,
      shareCount,
    });


  }catch(error){

    res.status(500).json({
      success:false,
      message:error.message,
    });

  }
};