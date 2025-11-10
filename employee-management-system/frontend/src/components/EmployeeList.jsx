import React, { useEffect, useState ,useContext } from "react";
import { getEmployees, deleteEmployee } from "../services/api";
import { AdminContext } from "../context/AdminContext";


const EmployeeList = ({ onEdit }) => {
  const [employees, setEmployees] = useState([]);
    const { isAdmin } = useContext(AdminContext);


  const fetchEmployees = async () => {
    const res = await getEmployees();
    console.log("Fetched employees:", res.data);
    setEmployees(res.data);
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    fetchEmployees();
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div>
      <h2>Employee List</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Salary</th>
             {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.position}</td>
              <td>{emp.salary}</td>
              {isAdmin && (
                <td>
                  <button onClick={() => onEdit(emp)}>Edit</button>
                  <button onClick={() => handleDelete(emp._id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
