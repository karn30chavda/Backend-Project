# 📜 Backend Learning Series – Daily Progress Summary

Learnig from Chai aur Backend from Hitesh Choudhary Sir (Chai or Code)

## **Day 1 – Getting Started**

- Initialized project with `npm init`.
- Installed **express** & **dotenv**.
- Created `app.js` and `.env` for **PORT** configuration.
- Added first `GET` route for testing.

---

## **Day 2 – Git & Project Structure**

- Initialized **Git** repository.
- Created folder structure:

  ```
  /controllers
  /routes
  /middlewares
  /models
  /utils
  app.js
  ```

- Linked basic route with controller returning JSON.

---

## **Day 3 – MongoDB Connection**

- Installed & configured **mongoose** for DB connection (`db/index.js`).
- Added `.gitignore` for `node_modules` & `.env`.
- Tested with a sample model/document.

---

## **Day 4 – Middleware Setup**

- Added **cookie-parser** and configured **CORS**.
- Used:
  - `express.json()` for JSON body parsing.
  - `express.urlencoded()` for form data parsing.

- Created utility files:
  - `ApiError`
  - `ApiResponse`
  - `asyncHandler`

---

## **Day 5 – Models, Auth & File Upload**

### **User Model**

- **Fields:**
  - `username` (unique, lowercase, trimmed, indexed)
  - `email` (unique, lowercase, trimmed)
  - `fullName` (trimmed, indexed)
  - `avatar` (Cloudinary URL)
  - `coverImage` (Cloudinary URL)
  - `password` (hashed before save)
  - `watchHistory` (array of `Video` ObjectIds)
  - `refreshToken` (string)
  - **Timestamps**: `createdAt`, `updatedAt`

- **Password Hashing Middleware:**
  - Uses **bcrypt** to hash password before saving if modified.

- **JWT Methods:**
  - `isPasswordCorrect(password)` → verifies password with bcrypt.
  - `generateAccessToken()` → signs JWT with `_id`, `email`, `username`, `fullName`.
  - `generateRefreshToken()` → signs JWT with `_id` only.

- **Security Notes:**
  - Access & refresh token secrets/expiry are taken from `.env`.
  - Password is never returned in plain text.

### **Video Model**

- **Fields:**
  - `videoFile` (Cloudinary URL, required)
  - `thumbnail` (Cloudinary URL, required)
  - `owner` (ObjectId reference to **User**, required)
  - `title` (string, required)
  - `description` (string, required)
  - `duration` (number, Cloudinary metadata, required)
  - `views` (number, default: 0)
  - `isPublished` (boolean, default: true)
  - **Timestamps**: `createdAt`, `updatedAt`

- **Plugins:**
  - Uses **mongoose-aggregate-paginate-v2** for aggregation pagination.

- **Notes:**
  - Owner field enables population of video creator data.
  - Designed for scalability with pagination support.

### **Cloudinary Integration**

- Configured **cloudinary** using `.env` variables.
- Created `cloudinaryFileUploader()` function:
  - Handles file upload.
  - Cleans up local files on error.

### **Multer Middleware**

- Configured `diskStorage` for file uploads.
- Added `upload` middleware to store files in `/public/temp`.

---

> ⚡ **Note:** All sensitive configurations like `Port`, `MongoDB_URI`, `Cloudinary Config` and `JWT secrets` are stored in `.env` for security.

---
