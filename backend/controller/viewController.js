/*
import { View } from "../models/viewsModel.js";


export const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("user", "username profilePicture")
      .sort({ createdAt: -1 });

    const eventsWithViews = await Promise.all(
      events.map(async (event) => {
        const viewsCount = await View.countDocuments({
          event: event._id,
        });

        return {
          ...event.toObject(),
          viewsCount,
        };
      })
    );

    res.status(200).json({
      success: true,
      events: eventsWithViews,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

*/

import { View } from "../models/viewsModel.js";

// Add View
export const addView = async (req, res) => {
  try {
    const { eventId } = req.params;

    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    const alreadyViewed = await View.findOne({
      event: eventId,
      ipAddress: ip,
    });

    if (!alreadyViewed) {
      await View.create({
        event: eventId,

        user: req.user?._id || null,

        ipAddress: ip,
      });
    }

    const viewsCount = await View.countDocuments({
      event: eventId,
    });

    res.status(200).json({
      success: true,

      viewsCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// Get Single Event Views
export const getViewsCount = async (req, res) => {
  try {
    const { eventId } = req.params;

    const viewsCount = await View.countDocuments({
      event: eventId,
    });

    res.status(200).json({
      success: true,

      viewsCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
