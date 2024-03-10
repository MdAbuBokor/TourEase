import Booking from "../models/booking.model.js";
import Room from "../models/room.model.js";
import { errorHandler } from "../utils/error.js";

export const createBooking = async (req, res, next) => {
  const { userId, roomId, checkInDate, price, name, phone, email } = req.body;

  if (!checkInDate || !name || !phone || !email) {
    return next(errorHandler(400, "All fields are required"));
  }
  if (name.length < 3) {
    return next(errorHandler(400, "Name must be at least 3 characters"));
  }
  if (phone.length != 11) {
    return next(errorHandler(400, "Phone number must be 11 digit"));
  }

  const theRoom = await Room.findById(roomId);
  //console.log(theRoom);
  if (theRoom.alreadyBooked.includes(checkInDate)) {
    return next(errorHandler(400, "Room is already booked on that day"));
  }

  theRoom.alreadyBooked.push(checkInDate);
  theRoom.save();
  const accommodationId = theRoom.accommodation;

  const newBooking = new Booking({
    userId,
    roomId,
    checkInDate,
    price,
    name,
    phone,
    email,
    accommodationId,
  });

  try {
    const savedBooking = await newBooking.save();
    res.status(200).json(savedBooking);
  } catch (error) {
    res.status(500).json(error);
  }
};
