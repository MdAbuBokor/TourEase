import mongoose, { Schema } from "mongoose";

const accommodationSchema = new mongoose.Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    email: { type: String },
    password: { type: String },
    accomodation_avatar: { type: String },
    type: { type: String, required: true },
    title: { type: String },
    description: { type: String },
    images: [{ type: String }],
    rating: { type: Number, default: 0, min: 0, max: 5 },
    facilities: [String],
    location: { type: String, required: true },
    map_location: {
      lat: { type: Number },
      lng: { type: Number },
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
