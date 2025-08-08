import dotenv from "dotenv";
import connectDB from "./db/dbconnection.js";

dotenv.config({ path: "./.env" });

const Port = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(Port, () => {
      console.log(`Server is Listening on PORT: ${Port}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Failed !!", error);
  });
