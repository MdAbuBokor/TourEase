const mongoose = require("mongoose");

const map_locationSchema = new mongoose.Schema({
  accommodationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Accommodation",
    required: true,
  },
  lat: {
    type: Number,
    required: true,
    min: -90,
    max: 90,
  },
  lng: {
    type: Number,
    required: true,
    min: -180,
    max: 180,
  },
});

const Map_location = mongoose.model("Map_location", map_locationSchema);

module.exports = Map_location;
