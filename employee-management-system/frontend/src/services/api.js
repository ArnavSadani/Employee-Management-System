import axios from "axios";

// Create an Axios instance with base URL
const API = axios.create({
  baseURL: "http://localhost:5000", // Backend employee route
});

export const loginuser = (data) => {
  return API.post("/auth/login", data);
}

// Fetch all employees
export const getEmployees = () => API.get("/api/employees/");

// Add a new employee
export const addEmployee = (data) => API.post("/api/employees/add", data);

// Update an employee by ID
export const updateEmployee = (id, data) => API.put(`/api/employees/${id}`, data);

// Delete an employee by ID
export const deleteEmployee = (id) => API.delete(`/api/employees/${id}`);

export const markAttendance = (data) => API.post("/attendance/mark", data);

export const getAttendance = (email) => API.get(`/attendance/${email}`);

export const calculateSalary = (data) => API.post("/attendance/calculate", data);

export default API;
