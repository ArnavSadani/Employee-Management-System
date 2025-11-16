const express = require("express");
const router = express.Router();
const SalarySlip = require("../models/SalarySlip");

router.post("/generateslip", async (req, res) => {
  try {
    const { email, fromDate, toDate, wagesPerDay, result } = req.body;
    // console.log(req.body);
    const salary = req.body.result.salary;
    const presentDays = req.body.result.presentDays;

    // console.log(salary, presentDays);
    if (!email || !fromDate || !toDate || !wagesPerDay || salary == null || presentDays == null) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const slipData = { fromDate, toDate, wagesPerDay, salary, presentDays };
    console.log(slipData);
    // Check if entry already exists for email
    let userSlip = await SalarySlip.findOne({ email });

    

    if (!userSlip) {
      // Create a new document with array of slips
      userSlip = new SalarySlip({
        email,
        slips: [slipData]
      });
    } else {
      // Push new slip into slips[]
      userSlip.slips.push(slipData);
    }

    await userSlip.save();

    res.json({ msg: "Salary slip added", userSlip });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/getallslip/:email", async (req, res) => {
  try {
    const { email } = req.params;
    
    const userSlip = await SalarySlip.findOne({ email });

    if (!userSlip) {
      return res.status(404).json({ msg: "No slips found for this email" });
    }

    res.json({ slips: userSlip.slips });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});
module.exports = router;