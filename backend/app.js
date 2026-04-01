

import express from "express";
import connectDB from "./config/db.js";
import "dotenv/config";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import cookieParser from "cookie-parser";
import createAdmin from "./utils/createAdmin.js";
import http from "http";
import cors from "cors";
import { initSocket } from "./socket/server.js";

import dns from "dns"

dns.setServers(["1.1.1.1", "8.8.8.8"])

const app = express();
app.set("trust proxy", 1);

const server = http.createServer(app);

// Middlewares
app.use(cors({
  origin: ["http://192.168.1.67:5173", "http://192.168.1.71:5175"],
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/event", eventRoutes);
app.use("/user", userRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 Global Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Connect DB & Create Admin
connectDB();
createAdmin();

// 🔥 Socket Initialize
initSocket(server);

const PORT = process.env.PORT || 8000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is Running on http://0.0.0.0:${PORT}`);
});
