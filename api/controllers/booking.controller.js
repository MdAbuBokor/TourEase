import Booking from "../models/booking.model.js";

export const createBooking = async (req, res) => {
  const { userId, roomId, checkInDate, checkOutDate, price } = req.body;

  const newBooking = new Booking({
    userId,
    roomId,
    checkInDate,
    checkOutDate,
    price,
  });

  try {
    const savedBooking = await newBooking.save();
    res.status(200).json(savedBooking);
  } catch (error) {
    res.status(500).json(error);
  }
};
