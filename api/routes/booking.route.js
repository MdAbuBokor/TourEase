import express from "express";
import { createBooking } from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/createBooking/", createBooking);

export default router;
