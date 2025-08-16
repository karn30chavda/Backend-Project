import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();
// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload a file to Cloudinary with error handling and local file cleanup
const cloudinaryFileUploader = async function (localFilePath) {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" });
    console.log(`File uploaded Successfully in cloudinary`, response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    // Handle the error appropriately if upload fails in Cloudinary, fs will delete the local file from the server to avoid memory leaks, corrupt files, etc.
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { cloudinaryFileUploader };
