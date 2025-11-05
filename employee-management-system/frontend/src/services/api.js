import axios from "axios";

// Create an Axios instance with base URL
const API = axios.create({
  baseURL: "http://localhost:5000/api/employees", // Backend employee route
});

// Fetch all employees
export const getEmployees = () => API.get("/");

// Add a new employee
export const addEmployee = (data) => API.post("/add", data);

// Update an employee by ID
export const updateEmployee = (id, data) => API.put(`/${id}`, data);

// Delete an employee by ID
export const deleteEmployee = (id) => API.delete(`/${id}`);

export default API;
