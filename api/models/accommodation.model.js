import mongoose, { Schema } from "mongoose";

const accommodationSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    avatar: {
      type: String,
      default:
        "https://media.radissonhotels.net/image/radisson-blu-hotel-dhaka-water-garden/exterior/16256-113891-f63612886_3xl.jpg?impolicy=HomeHero",
    },
    title: { type: String, default: "A good place to stay" },
    description: { type: String },
    images: [{ type: String }],
    rating: { type: Number, default: 5, min: 0, max: 5 },
    facilities: [String],
    map_location: {
      type: Schema.Types.ObjectId,
      ref: "Map_location",
    },
    contactInfo: {
      phone: { type: String },
      email: { type: String },
      website: { type: String },
    },
    reviews: {
      type: [Schema.Types.ObjectId],
      ref: "Review",
    },
    rooms: {
      type: [Schema.Types.ObjectId],
      ref: "Room",
    },

    discount: { type: Number, default: 0 },

    // Other accommodation-specific fields

    // Reference to the user who owns or manages the accommodation
  },
  { timestamps: true }
);

const Accommodation = mongoose.model("Accommodation", accommodationSchema);

export default Accommodation;
