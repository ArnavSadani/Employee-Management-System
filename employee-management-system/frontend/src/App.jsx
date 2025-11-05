import React, { useState } from "react";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";

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
      <EmployeeForm selected={selectedEmp} onSuccess={handleSuccess} />
      <EmployeeList onEdit={handleEdit} key={refresh} />
    </div>
  );
};

export default App;
