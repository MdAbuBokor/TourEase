import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import accommodationRouter from "./routes/accommodation.route.js";
import authRouter from "./routes/auth.route.js";
import bookingRouter from "./routes/booking.route.js";
import locationRouter from "./routes/location.route.js";
import roomRouter from "./routes/room.route.js";
import roomReviewRouter from "./routes/roomReview.route.js";
import userRouter from "./routes/user.route.js";
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log("Listening on port 3000!");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use("/api/accommodation", accommodationRouter);
app.use("/api/room", roomRouter);

app.use("/api/booking", bookingRouter);
app.use("/api/review", roomReviewRouter);
app.use("/api/location", locationRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong!";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
