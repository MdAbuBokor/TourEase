import express from "express";
import {
  createBooking,
  getAccBookings,
  getUserBookings,
  isRoomBooked,
  updateBookingInfo,
} from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/createBooking/", createBooking);
router.get("/allbookingofuser/:userId", getUserBookings);
router.get("/allbookingofacc/:accId", getAccBookings);
router.post("/updateBooking/:bookingId", updateBookingInfo);
router.get("/isRoomBooked/:roomId", isRoomBooked);

export default router;
