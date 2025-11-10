import React, { useState, useEffect, useContext } from "react";
import { getEmployees, deleteEmployee, addEmployee, updateEmployee } from "../services/api";
import { AdminContext } from "../context/AdminContext";
const EmployeeForm = ({ selected, onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    position: "",
    salary: "",
  });
   const [editMode, setEditMode] = useState(false);
  const [employees, setEmployees] = useState([]);
  const { isAdmin } = useContext(AdminContext);

  const fetchEmployees = async () => {
    const res = await getEmployees();
    console.log("Fetched employees:", res.data);
    setEmployees(res.data);
  };

   const onEdit = (emp) => {
    setForm(emp);
    setEditMode(true);
  };


  const handleDelete = async (id) => {
    await deleteEmployee(id);
    fetchEmployees();
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (selected) setForm(selected);
  }, [selected]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

   const handleSubmit = async (e) => {
    e.preventDefault();

    if (editMode) {
      // ✅ UPDATE API call
      await updateEmployee(form._id, form);

    } else {
      // ✅ ADD API call
      await addEmployee(form);

    }

    // ✅ Reset form
    setForm({ name: "", email: "", position: "", salary: "" });
    setEditMode(false);

    // ✅ Refresh list
    fetchEmployees();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
          <h2>{editMode ? "Edit Employee" : "Add Employee"}</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={form.position}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
          required
        />
          <button type="submit">
          {editMode ? "Save Changes" : "Add Employee"}
        </button>

        {editMode && (
          <button
            type="button"
            onClick={() => {
              setEditMode(false);
              setForm({ name: "", email: "", position: "", salary: "" });
            }}
          >
            Cancel
          </button>
        )}
      </form>
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
    </>


  );
};

export default EmployeeForm;