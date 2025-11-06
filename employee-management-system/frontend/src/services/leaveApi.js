import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/leaves",
});

// Employee side
export const applyLeave = (data) => API.post("/apply", data);

// Admin side
export const getAllLeaves = () => API.get("/");
export const updateLeaveStatus = (id, status) =>
  API.put(`/${id}/status`, { status });
