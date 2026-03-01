
import { Event } from "../models/eventModel.js";
import { getIO } from "../socket/server.js";

export const createEvent = async (req, res) => {
  try {
    const { title, description, location } = req.body;

    if (!title || !description || !location) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Event image is required",
      });
    }

  
    const event = await Event.create({
      title,
      description,
      location,
      image: req.file.path,
      user: req.user.id,
    });


    // 🔥 Socket emit
    const io = getIO();
    io.emit("newEvent", (event), {
      message: "New Event Created",
      title: event.title
    });

    return res.status(201).json({
      success: true,
      message: "Event created successfully",
       event
    });

  } catch (error) {
    console.error("Create Event Error 👉", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Event creation failed",
    });
  }
};



