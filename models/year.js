const mongoose = require("mongoose");

const YearSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
    unique: true,
  },
});

module.exports = Year = mongoose.model("Year", YearSchema);
