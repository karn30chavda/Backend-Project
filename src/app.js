import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

const app = express();

// Config for the CORS origin error.
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Config for the Json data API limits to avoid app Crash.
app.use(express.json({ limit: "16kb" }));

// Config for the URL data API limits to avoid app Crash.
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

// Config to store assets images and all in public folder.
app.use(express.static("public"));

// Config to store user Cookies in the server.
app.use(cookieParser());

export default app;
