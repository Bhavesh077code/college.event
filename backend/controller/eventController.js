import { Event } from "../models/eventModel.js";

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

    //  admin check (CORRECT)
    if (req.userRole !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can create event",
      });
    }

    const event = await Event.create({
      title,
      description,
      location,
      image: req.file.path,
      postedBy: req.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      event, 
    });

  } catch (error) {
    console.error("Create Event Error 👉", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Event creation failed",
    });
  }
};


