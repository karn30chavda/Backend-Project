import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { cloudinaryFileUploader } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  //   Getting all user details from the user from the frontend or via postman
  const { username, fullName, email, password } = req.body;

  //  Validating the user details whether there are not empty
  if ([username, email, fullName, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All field are required or cannot be empty");
  }

  // Checking if user is already existing or not via user model with the help of moongose
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existingUser) {
    throw new ApiError(409, "user with email or username already exists.");
  }

  // Checking for images, and also avatar files is mandatory
  const avatarLocalpath = req.files?.avatar?.[0]?.path;
  const coverImageLocalpath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalpath) {
    throw new ApiError(400, "Avatar file is required");
  }

  // Uploading avatar and coverImage to cloudinary
  const avatar = await cloudinaryFileUploader(avatarLocalpath);
  const coverImage = await cloudinaryFileUploader(coverImageLocalpath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  // Creating user and uploading to mongodb database
  const user = await User.create({
    fullName,
    email,
    username,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  // Checking if user is created or not
  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Something gone wrong while creating user");
  }

  // returning the user
  return res.status(201).json(new ApiResponse(200, createdUser, "User created succesdfully"));
});
export { registerUser };
