import mongoose, { Schema } from "mongoose";

const accommodationSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    location: { type: String, default: "Kuakata" },
    type: { type: String, default: "hotel" },
    avatar: {
      type: String,
      default:
        "https://media.radissonhotels.net/image/radisson-blu-hotel-dhaka-water-garden/exterior/16256-113891-f63612886_3xl.jpg?impolicy=HomeHero",
    },
    title: { type: String, default: "A good place to stay" },
    location_details: { type: String },
    description: { type: String },
    rating: { type: Number, default: 5, min: 0, max: 5 },
    facilities: [String],

    phone: { type: String },

    website: { type: String },
    isBanned: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    isApproved: { type: Boolean, default: false },

    reviews: {
      type: [Schema.Types.ObjectId],
      ref: "Review",
    },
    rooms: {
      type: [Schema.Types.ObjectId],
      ref: "Room",
    },

    discount: { type: Number, default: 0 },
    gym: { type: Boolean, default: false },
    spa: { type: Boolean, default: false },
    bar: { type: Boolean, default: false },
    laundry: { type: Boolean, default: false },
    restaurent: { type: Boolean, default: false },
    shopping: { type: Boolean, default: false },
    freeParking: { type: Boolean, default: false },
    bikeRental: { type: Boolean, default: false },
    freeWifi: { type: Boolean, default: false },
    movieNights: { type: Boolean, default: false },
    swimmingPool: { type: Boolean, default: false },
    cofeeShop: { type: Boolean, default: false },

    // Other accommodation-specific fields

    // Reference to the user who owns or manages the accommodation
  },
  { timestamps: true }
);

const Accommodation = mongoose.model("Accommodation", accommodationSchema);

export default Accommodation;
