
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary"



const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'EventImage',
        format: async (req, file) => [jpg, png], // supports promises as well
        public_id: (req, file) => 'computed-filename-using-request',
    },
});

const upload = multer({ storage });

export default upload;