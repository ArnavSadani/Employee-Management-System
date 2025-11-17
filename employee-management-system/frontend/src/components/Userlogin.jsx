// src/pages/Login.jsx
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/UserContext";
import { loginuser } from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginuser(formData);
      
      // save to context
      login(res.data.email, res.data.userId, res.data.token);

      alert("Login Successful!");
      navigate("/attendance");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="form-container">
  <h2 className="form-title">Login</h2>

  <form onSubmit={handleSubmit}>
    <input
      type="email"
      name="email"
      placeholder="Enter Email"
      className="form-input"
      onChange={handleChange}
      required
    />

    <input
      type="password"
      name="password"
      placeholder="Enter Password"
      className="form-input"
      onChange={handleChange}
      required
    />

    <button type="submit" className="form-btn">
      Login
    </button>
  </form>
  </div>
  );
};

export default Login;
