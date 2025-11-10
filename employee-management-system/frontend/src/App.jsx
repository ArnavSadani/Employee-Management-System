import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import EmployeeForm from "./components/EmployeeForm";

import ApplyLeave from "./components/ApplyLeave";
import ManageLeaves from "./components/ManageLeaves";
import AdminLogin from "./components/AdminLogin";

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
              <>
                <h1>Employee Management System</h1>
                <EmployeeForm />
             
              </>
            }
          />

          {/* Leave Apply Page */}
          <Route path="/apply-leave" element={<ApplyLeave />} />

          {/* Admin Leave Management Page */}
          <Route path="/manage-leaves" element={<ManageLeaves />} />
                <Route path="/admin-login" element={<AdminLogin />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
