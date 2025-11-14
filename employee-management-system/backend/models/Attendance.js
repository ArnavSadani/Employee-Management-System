const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  dates: [{ type: String }], 
});

module.exports = mongoose.model("Attendance", attendanceSchema);
