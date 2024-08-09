const mongoose = require('mongoose');

// Define the schema for weather data
const weatherSchema = new mongoose.Schema({
  temperature: {
    type: Number,
    required: true,
  },
  weatherDes: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  cityName: {
    type: String,
    required: true,
  },
});

// Create a model from the schema
const Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;
