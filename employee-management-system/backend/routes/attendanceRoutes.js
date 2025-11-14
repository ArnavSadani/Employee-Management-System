const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");

// MARK ATTENDANCE
router.post("/mark", async (req, res) => {
  try {
    const { email, date } = req.body;

    if (!email || !date) {
      return res.status(400).json({ msg: "Email and date are required" });
    }

    let record = await Attendance.findOne({ email });

    // If not exists → create new
    if (!record) {
      record = new Attendance({ email, dates: [date] });
      await record.save();
      return res.json({ msg: "Attendance marked", record });
    }

    // If already exists, avoid duplicate date
    if (record.dates.includes(date)) {
      return res.json({ msg: "Already marked for this date", record });
    }

    record.dates.push(date);
    await record.save();

    res.json({ msg: "Attendance marked", record });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// GET ATTENDANCE FOR CALENDAR
router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const record = await Attendance.findOne({ email });

    if (!record) {
      return res.json({ dates: [] });
    }

    res.json({ dates: record.dates });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});

function isBetween(date, start, end) {
  return date >= start && date <= end;
}

// CALCULATE SALARY
router.post("/calculate", async (req, res) => {
  try {
    const { email, fromDate, toDate, wagesPerDay } = req.body;

    if (!email || !fromDate || !toDate || !wagesPerDay) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const record = await Attendance.findOne({ email });
    
    if (!record) {
      return res.json({ salary: 0, presentDays: 0 });
    }

    const start = new Date(fromDate);
    const end = new Date(toDate);

    // Convert DB dates (YYYY-MM-DD) to Date objects and filter
    const presentDays = record.dates.filter((d) => {
      const dateObj = new Date(d);
      return isBetween(dateObj, start, end);
    }).length;

    const salary = presentDays * wagesPerDay;

    res.json({
      presentDays,
      salary,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});


module.exports = router;
