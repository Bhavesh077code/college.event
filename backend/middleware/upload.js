
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "EVENT_PIC",
    allowed_formats: [""],
    public_id: (req, file) => Date.now() + "-" + file.originalname,
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 5MB limit
  },

});

export default upload;