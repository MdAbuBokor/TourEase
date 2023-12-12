const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
  },
  roomType: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  pricePerNight: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  facilities: {
    type: [String],
  },
  bedType: {
    type: String,
  },
  primaryImages: {
    type: String,  // Array of image URLs or paths
  },

  images: {
    type: [String],  // Array of image URLs or paths
  },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
