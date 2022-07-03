const mongoose = require("mongoose");

const Marksheet = new mongoose.Schema({
  studentID: {
    type: String,
    required: true,
  },

  OOPs: {
    type: Number,
    required: true,
  },

  Mechanics: {
    type: Number,
    required: true,
  },

  Civil: {
    type: Number,
    required: true,
  },

  totalMarks: {
    type: Number,
  },
});

module.exports = mongoose.model("Marksheet", Marksheet, "Marksheet");
