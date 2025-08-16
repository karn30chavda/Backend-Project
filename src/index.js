// require('dotenv').config({path: './env'})
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/dbconnection.js";
dotenv.config({
  path: "./.env",
});

// Server Port using environment variable, and if not available, default to 8000
const Port = process.env.PORT || 8000;

// Connect to MongoDB and start the server
connectDB()
  .then(() => {
    app.listen(Port, () => {
      console.log(`Server is Listening on PORT: ${Port}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Failed !!", error);
  });
