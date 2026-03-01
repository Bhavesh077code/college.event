
import rateLimit from "express-rate-limit";

export const loginScanner = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5,
  keyGenerator: (req) => req.body.email || req.ip , 
  message: {
    success: false,
    message: "Too many login attempts for this account"
  }
});