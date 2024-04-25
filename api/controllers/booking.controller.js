import Booking from "../models/booking.model.js";
import Room from "../models/room.model.js";
import { errorHandler } from "../utils/error.js";

export const createBooking = async (req, res, next) => {
  const { userId, roomId, checkInDate, price, name, phone, email } = req.body;
  // console.log(req.body);

  if (checkInDate.length < 1 || !name || !phone || !email) {
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
  for (let i = 0; i < theRoom.alreadyBooked.length; i++) {
    // console.log(theRoom.alreadyBooked[i].toISOString().slice(0, 10));
    // console.log(checkInDate.toString().slice(0, 10));
    if (
      theRoom.alreadyBooked[i].toISOString().slice(0, 10) ===
      checkInDate[0].toString().slice(0, 10)
    ) {
      return next(errorHandler(400, "Room is already booked on that day"));
    }
  }

  theRoom.alreadyBooked.push(checkInDate[0]);
  await theRoom.save();
  const accommodationId = theRoom.accommodation;

  const newBooking = new Booking({
    userId,
    roomId,
    checkInDate: checkInDate[0],
    price,
    name,
    phone,
    email,
    accommodationId,
    roomPhoto: theRoom.photo,
    roomNo: theRoom.roomNumber,
  });
  //console.log(newBooking);

  try {
    const savedBooking = await newBooking.save();
    res.status(200).json(savedBooking);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUserBookings = async (req, res, next) => {
  try {
    // console.log(req.params.userId);
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate("accommodationId")
      .populate("roomId");
    //console.log(bookings);

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAccBookings = async (req, res, next) => {
  try {
    // console.log(req.params.userId);
    const bookings = await Booking.find({ accommodationId: req.params.accId });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const isRoomBooked = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({
      roomId: req.params.roomId,
      checkInDate: req.query.checkInDate,
    });
    if (booking) {
      return res.status(200).json(true);
    }
    res.status(200).json(false);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateBookingInfo = async (req, res, next) => {
  try {
    // Ensure the user is updating their own account
    //console.log(req.body);

    const bookingid = req.params.bookingId;
    //console.log(bookingid);
    const bookingToUpdate = await Booking.findById(bookingid);
    // console.log(bookingToUpdate);

    if (!bookingToUpdate) {
      return next(errorHandler(404, "Booking not found"));
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingid,
      req.body,
      {
        new: true,
      }
    );
    // console.log(updatedBooking);

    res.status(200).json("Booking has been updated");
  } catch (error) {
    next(error);
  }
};
