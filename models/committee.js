const mongoose = require("mongoose");

const CommitteeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  year: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Year",
    required: true,
  },
});

module.exports = Committee = mongoose.model("Committee", CommitteeSchema);
