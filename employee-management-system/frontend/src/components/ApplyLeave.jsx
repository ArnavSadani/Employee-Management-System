import React, { useState } from "react";
import { applyLeave } from "../services/leaveApi";
import { useAuth } from "../context/UserContext";

const ApplyLeave = () => {
  const { email } = useAuth();  
  const [form, setForm] = useState({
    email: email,
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await applyLeave(form);
    alert("Leave Request Submitted!");
    setForm({ email: "", fromDate: "", toDate: "", reason: "" });
  };

  return (
    <div>
      <h2>Apply Leave</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Employee Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="fromDate"
          value={form.fromDate}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="toDate"
          value={form.toDate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="reason"
          placeholder="Reason"
          value={form.reason}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ApplyLeave;
