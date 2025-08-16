import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { cloudinaryFileUploader } from "../utils/cloudinary.js";

/**
<---- STEP BY STEP ALGORITHM FOR USER REGISTRATION ---->
 * - Registers a new user.
 * - Extracts user data from request body.
 * - Validates required fields.
 * - Checks if a user with the same username or email already exists.
 * - Handles avatar and cover image uploads to Cloudinary.
 * - Creates a new user in the database.
 * - Returns the created user data.
 */

const registerUser = asyncHandler(async (req, res) => {
  // Step 1: Get user details from request body
  const { username, fullName, email, password } = req.body;

  // Step 2: Validate that required fields are not empty
  if ([username, email, fullName, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All field are required or cannot be empty");
  }

  // Step 3: Check if user with the same username or email already exists
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existingUser) {
    throw new ApiError(409, "user with email or username already exists.");
  }

  // Step 4: Get local file paths for avatar and cover image from multer
  const avatarLocalpath = req.files?.avatar?.[0]?.path;
  const coverImageLocalpath = req.files?.coverImage?.[0]?.path;

  // Avatar is a required field
  if (!avatarLocalpath) {
    throw new ApiError(400, "Avatar file is required");
  }

  // Step 5: Upload files to Cloudinary
  const avatar = await cloudinaryFileUploader(avatarLocalpath);
  const coverImage = await cloudinaryFileUploader(coverImageLocalpath);

  // Ensure avatar was uploaded successfully before proceeding
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  // Step 6: Create user object and save to the database
  const user = await User.create({
    fullName,
    email,
    username,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "", // Use cover image URL if available, otherwise empty string
  });

  // Step 7: Retrieve the created user from DB, excluding sensitive fields like password
  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Something gone wrong while creating user");
  }

  // Step 8: Send a success response with the created user data
  return res.status(201).json(new ApiResponse(200, createdUser, "User created succesdfully"));
});
export { registerUser };
