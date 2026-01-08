
import rateLimit from "express-rate-limit"

export const loginScanner = rateLimit({
    windowMs: 10 * 60 *1000,
    max: 5,
    keyGenerator: (req) => req.body,
    message: {
        success:false,
        message: 'Too many login attempts for this account'
    }
})