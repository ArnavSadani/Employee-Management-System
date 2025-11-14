import React, { useState, useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const { login } = useContext(AdminContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(form.username, form.password);
    if (!success) {
      setError("Invalid admin credentials");
    } else {
      navigate("/manage-leaves"); // admin dashboard
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Admin Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Admin ID"
          value={form.username}
          className="form-input"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Admin Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          className="form-input"
        />
        <br />
        <button  className="form-btn" type="submit">Login</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AdminLogin;