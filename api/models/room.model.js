import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
  },
  accommodation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Accommodation",
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
  },

  description: {
    type: String,
  },
  alreadyBooked: {
    type: [Date],
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
  photo: {
    type: String,
    default:
      "https://media.designcafe.com/wp-content/uploads/2023/07/05141750/aesthetic-room-decor.jpg",
  },
  images: {
    type: [String],
    default:
      "https://media.designcafe.com/wp-content/uploads/2023/07/05141750/aesthetic-room-decor.jpg",
  },

  image1: {
    type: String,
    default:
      "https://assets-global.website-files.com/5c6d6c45eaa55f57c6367749/65045f093c166fdddb4a94a5_x-65045f0266217-p-800.webp",
    // Array of image URLs or paths
  },
  image2: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJlZHJvb218ZW58MHx8MHx8fDA%3D", // Array of image URLs or paths
  },
  image3: {
    type: String,
    default:
      "https://assets-global.website-files.com/5c6d6c45eaa55f57c6367749/65045f093c166fdddb4a94a5_x-65045f0266217-p-800.webp", // Array of image URLs or paths
  },
  image4: {
    type: String,
    default:
      "https://assets-global.website-files.com/5c6d6c45eaa55f57c6367749/65045f093c166fdddb4a94a5_x-65045f0266217-p-800.webp", // Array of image URLs or paths
  },
  image5: {
    type: String,
    default:
      "https://assets-global.website-files.com/5c6d6c45eaa55f57c6367749/65045f093c166fdddb4a94a5_x-65045f0266217-p-800.webp", // Array of image URLs or paths
  },
  image6: {
    type: String,
    default:
      "https://assets-global.website-files.com/5c6d6c45eaa55f57c6367749/65045f093c166fdddb4a94a5_x-65045f0266217-p-800.webp", // Array of image URLs or paths
  },
});

const Room = mongoose.model("Room", roomSchema);

export default Room;
