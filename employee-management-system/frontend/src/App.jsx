import React, { useState } from "react";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import ApplyLeave from "./components/ApplyLeave";
import ManageLeaves from "./components/ManageLeaves";

const App = () => {
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (emp) => setSelectedEmp(emp);
  const handleSuccess = () => {
    setSelectedEmp(null);
    setRefresh(!refresh);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Employee Management System</h1>

      {/* Employee Management Section */}
      <EmployeeForm selected={selectedEmp} onSuccess={handleSuccess} />
      <EmployeeList onEdit={handleEdit} key={refresh} />

      {/* Leave Management Section */}
      <hr />
      <ApplyLeave />
      <hr />
      <ManageLeaves />
    </div>
  );
};

export default App;
