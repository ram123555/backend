const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// 🔹 Cloudinary config (uses ENV variables)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🔹 Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "dbizlecar/cars",          // folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [
      { width: 1000, height: 750, crop: "limit" }, // auto resize
    ],
  },
});

// 🔹 Multer upload
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

module.exports = upload;
