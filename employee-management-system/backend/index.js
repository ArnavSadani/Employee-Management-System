require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.log('❌ MongoDB Error:', err));

// Test Route
app.get('/', (req, res) => {
  res.send('Employee Management Backend Running...');
});

const employeeRoutes = require("./routes/employeeRoutes");
app.use("/api/employees", employeeRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const attendanceRoutes = require("./routes/attendanceRoutes");
app.use("/attendance", attendanceRoutes);

const leaveRoutes = require("./routes/leaveRoutes");
app.use("/api/leaves", leaveRoutes);

const salaryRoutes = require("./routes/salaryRoutes");
app.use("/salary", salaryRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
