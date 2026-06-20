import Like from "../models/Like.js";


// Like / Unlike Toggle
export const toggleLike = async (req, res) => {
  try {
    const { eventId } = req.params;

    const existingLike = await Like.findOne({
      user: req.user.id,
      event: eventId,
    });

    if (existingLike) {
      await Like.findByIdAndDelete(existingLike._id);

      return res.status(200).json({
        success: true,
        message: "Unlike successful",
      });
    }

    await Like.create({
      user: req.user.id,
      event: eventId,
    });

    res.status(201).json({
      success: true,
      message: "Like successful",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// Total likes count
export const getLikes = async (req, res) => {
  try {
    const { eventId } = req.params;

    const totalLikes = await Like.countDocuments({
      event: eventId,
    });

    res.status(200).json({
      success: true,
      totalLikes,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};