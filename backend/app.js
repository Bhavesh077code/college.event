
import express from "express";
import connectDB from "./config/db.js";
import "dotenv/config";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js"
import cookieParser from "cookie-parser";
import createAdmin from "./utils/createAdmin.js";
import cors from "cors";



const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

const PORT = process.env.PORT || 4000

app.use("/event", eventRoutes);
app.use("/user", userRoutes);




connectDB();
createAdmin();

app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT} 8000`)
})