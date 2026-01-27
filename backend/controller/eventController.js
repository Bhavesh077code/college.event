import { Event } from "../models/eventModel.js";

/*
export const createEvent = async (req, res) => {
    try {
        const { title, description, location } = req.body; */
        /*const image = req.file; */
/*
        if (!title || !description || !location) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Event image is required"
            });
        }

        if (!req.user || !req.user.role) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        if (req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Only admin can create event"
            });
        }

        const event = await Event.create({
            title,
            description,
            location,
            image: req.file.path,
            postedBy: req.user.id
        });

        return res.status(200).json({
            success: true,
            message: "Event created successfully",
            events
        });
    } catch (error) {
        console.error("Create Event Error 👉", error);
        res.status(500).json({
            success: false,
            message: error.message || "Event creation failed"
        });
    }
}  */
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

    // ✅ admin check (CORRECT)
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
      event, // ✅ correct variable
    });

  } catch (error) {
    console.error("Create Event Error 👉", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Event creation failed",
    });
  }
};




//SHOW ALL EVENT ON USER/ADMIN DASKBORD
export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find()
            .populate("user", "email")
            .sort('-createdAt');

        return res.status(200).json({
            Success: true,
            events
        })
    } catch (error) {
        return res.status(500).json({
            success: true,
            message: "Something error in GETALLEVENTS"
        })
    }
}


//EDIT EVENT
export const editEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event Not Found"
            });
        }

        if (event.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "You are not all to edit this event"
            });
        }

        const updateEvent = await Event.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Event Edited Successfully",
            event
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//DELET EVENT 
export const deleteEvent = async (req, res) => {
    try {
        console.log("Editing page is this");
        const { id } = req.params;

        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        if (event.postedBy.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Only   admin can delet this events"
            });
        }

        const deleteEvent = await Event.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Event Deleted Successfully"
        });

    } catch (error) {
        res.json({
            message: error.message
        })
    }
}
