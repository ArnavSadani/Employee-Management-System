const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Mark Attendance (Employee)
router.post("/mark", authMiddleware(["employee", "admin"]), async (req, res) => {
  try {
    const attendance = new Attendance({
      employee: req.user.id,
      status: req.body.status || "Present",
    });
    await attendance.save();
    res.json({ message: "Attendance marked successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ View Own Attendance (Employee)
router.get("/my", authMiddleware(["employee", "admin"]), async (req, res) => {
  try {
    const records = await Attendance.find({ employee: req.user.id }).populate("employee", "name email");
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ View All Attendance (Admin)
router.get("/all", authMiddleware(["admin"]), async (req, res) => {
  try {
    const records = await Attendance.find().populate("employee", "name email");
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
