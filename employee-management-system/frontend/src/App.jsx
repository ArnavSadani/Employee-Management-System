import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import EmployeeForm from "./components/EmployeeForm";

import ApplyLeave from "./components/ApplyLeave";
import ManageLeaves from "./components/ManageLeaves";
import AdminLogin from "./components/AdminLogin";
import Login from "./components/Userlogin";
import Attendance from "./components/Attendance";
import SalaryCount from "./components/SalaryCalculator";
import SalarySlip from "./components/SalarySlip";

const App = () => {
  return (
    <Router>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <Routes>
          {/* Home Page → EmployeeForm + EmployeeList */}
          <Route
            path="/"
            element={
              <Login/>
              
            }
          />
          <Route path="/employees" element={ <>
                
                <EmployeeForm />
             
              </>} />

          {/* Leave Apply Page */}
          <Route path="/apply-leave" element={<ApplyLeave />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/manage-leaves" element={<ManageLeaves />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/salarycount" element={<SalaryCount />} />
          <Route path="/salaryslip" element={<SalarySlip />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
