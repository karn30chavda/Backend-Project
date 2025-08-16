import multer from "multer";

// Middleware for handling file uploads using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    // Use the original file name for the uploaded file
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage: storage,
});
