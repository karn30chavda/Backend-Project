import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

const app = express();

// this is for the CORS origin error.
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// this is for the JSON data API limits to avoid app Crash.
app.use(express.json({ limit: "16kb" }));

// this is for the URL data API limits to avoid app Crash.
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

// this is for the static files in the public folder.
app.use(express.static("public"));

// this is for the user Cookies in the server.
app.use(cookieParser());

export default app;
