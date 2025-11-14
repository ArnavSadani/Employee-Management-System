import React, { useState, useEffect, useContext } from "react";
import { getEmployees, deleteEmployee, addEmployee, updateEmployee } from "../services/api";
import { AdminContext } from "../context/AdminContext";
import { useAuth } from "../context/UserContext";
const EmployeeForm = ({ selected, onSuccess }) => {

  const {email} = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: email,
    position: "",
    salary: "",
  });
   const [editMode, setEditMode] = useState(false);
  const [employees, setEmployees] = useState([]);
  const { isAdmin } = useContext(AdminContext);
  const [showtable,setshowtable] = useState(false);

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
    setForm({ name: "", email: email, position: "", salary: "" });
    setEditMode(false);

    // ✅ Refresh list
    fetchEmployees();
  };

  return (
 <>
  <form onSubmit={handleSubmit} className="form-container">
    <h2 className="form-title">{editMode ? "Edit Employee" : "Add Employee"}</h2>

    <input
      type="text"
      name="name"
      placeholder="Name"
      value={form.name}
      onChange={handleChange}
      required
      className="form-input"
    />

    <input
      type="email"
      name="email"
      placeholder="Email"
      value={form.email}
      required
      className="form-input"
    />

    <input
      type="text"
      name="position"
      placeholder="Position"
      value={form.position}
      onChange={handleChange}
      required
      className="form-input"
    />

    <input
      type="number"
      name="salary"
      placeholder="Salary"
      value={form.salary}
      onChange={handleChange}
      required
      className="form-input"
    />

    <button type="submit" className="form-btn">
      {editMode ? "Save Changes" : "Add Employee"}
    </button>

    {editMode && (
      <button
        type="button"
        className="cancel-btn"
        onClick={() => {
          setEditMode(false);
          setForm({ name: "", email: "", position: "", salary: "" });
        }}
      >
        Cancel
      </button>
    )}
  </form>

  <br /><br />

  <button onClick={() => setshowtable(!showtable)} className="toggle-btn">
    {showtable ? "Hide Employee List" : "Show Employee List"}
  </button>

  {showtable && (
    <div className="table-container">
      <h2 className="table-title">Employee List</h2>

      <table className="styled-table">
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
                  <button className="action-btn" onClick={() => onEdit(emp)}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(emp._id)}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</>

  );
};

export default EmployeeForm;