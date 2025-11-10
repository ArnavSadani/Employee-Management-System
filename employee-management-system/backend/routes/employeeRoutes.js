// backend/routes/employeeRoutes.js
const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

router.post("/add", async (req, res) => {
  try {  // ✅ ADD THIS

    const newEmp = new Employee(req.body);
    await newEmp.save();

    res.status(201).json(newEmp);
  } catch (error) {
  // ✅ ADD THIS
    res.status(500).json({ message: error.message });
  }
});


// 📋 Get All Employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();


    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✏️ Update Employee
router.put("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Overwrite existing values
    employee.name = req.body.name || employee.name;
    employee.email = req.body.email || employee.email;
    employee.position = req.body.position || employee.position;
    employee.salary = req.body.salary || employee.salary;

    const updatedEmp = await employee.save();
    res.json(updatedEmp);
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: error.message });
  }
});



// ❌ Delete Employee
router.delete("/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
