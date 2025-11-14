// routes/auth.routes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user.js");

const router = express.Router();
const JWT_SECRET = "SECRET_KEY_CHANGE_THIS"; // <-- change this

// LOGIN ROUTE
router.post("/login", async (req, res) => {
  console.log("Login request received");
  try {
    const { email, password } = req.body;
    console.log(email, password);


    // Create token
    const token = jwt.sign({ userId: "123", email: email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      msg: "Login Successful",
      token,
      email: email,
      userId: password,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
