import mongoose from "mongoose";

const ReviewRoomSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },

  avatar: {
    type: String,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },

  // Other review-related fields
});

const ReviewRoom = mongoose.model("ReviewRoomS", ReviewRoomSchema);

export default ReviewRoom;
