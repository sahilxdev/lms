import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/dbConnect.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config({});

// calling database connection here
connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

// default middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.BACKEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// apis
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);

app.get("/home", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Hello i am coming from backend",
  });
});

app.listen(PORT, () => {
  console.log(`Server listen at port ${PORT}`);
});
