const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price_details: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  availability: {
    type: String, // Can be a string or an array of strings representing availability slots
    required: true,
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceProvider", // Reference to the service provider who offers this service
  },
  // You can add more fields as needed, like images, reviews, etc.
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
