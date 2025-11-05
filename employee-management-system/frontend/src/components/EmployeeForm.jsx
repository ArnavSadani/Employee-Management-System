import React, { useState, useEffect } from "react";
import { addEmployee, updateEmployee } from "../services/api";

const EmployeeForm = ({ selected, onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    position: "",
    salary: "",
  });

  useEffect(() => {
    if (selected) setForm(selected);
  }, [selected]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form._id) {
      await updateEmployee(form._id, form);
    } else {
      await addEmployee(form);
    }
    setForm({ name: "", email: "", position: "", salary: "" });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{form._id ? "Edit Employee" : "Add Employee"}</h2>
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
      <button type="submit">{form._id ? "Update" : "Add"}</button>
    </form>
  );
};

export default EmployeeForm;
