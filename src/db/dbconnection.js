import mongoose from "mongoose";
import { DATABASE_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    const connectionData = await mongoose.connect(`${process.env.MONGODB_URI}/${DATABASE_NAME}`);
    console.log(`\n MongoDB Connected Successfully !! DB HOST: ${connectionData.connection.host}`);
  } catch (error) {
    console.log(`Error connecting to database: ${error.message}`);
    throw error;
  }
};

export default connectDB;
