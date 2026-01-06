
import express from "express";
import connectDB from "./config/db.js";
import "dotenv/config";
import userRoutes from "./routes/userRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import cookieParser from "cookie-parser";
import createAdmin from "./utils/createAdmin.js";


const app = express();
app.use(cookieParser());
app.use(express.json());
const PORT = process.env.PORT || 4000


app.use("/user", userRoutes);
app.use("/admin", adminRoutes);


connectDB();
createAdmin();

app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT} 8000`)
})