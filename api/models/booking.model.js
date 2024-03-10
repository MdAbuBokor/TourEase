import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  accommodationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Accommodation",
    required: true,
  },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  checkInDate: { type: Date, required: true },
  //checkOutDate: { type: Date, required: true },
  price: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  paymentStatus: { type: Boolean, default: false },
  // Other booking-related fields
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
