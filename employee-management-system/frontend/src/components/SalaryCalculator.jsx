import { useState } from "react";
import { calculateSalary } from "../services/api";

const SalaryCalculator = () => {
  const [form, setForm] = useState({
    email: "",
    fromDate: "",
    toDate: "",
    wagesPerDay: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await calculateSalary(form);
      setResult(res.data);
    } catch (err) {
      alert("Error calculating salary");
    }
  };

  return (
    <div style={{ width: "400px", margin: "40px auto" }}>
      <h2>Salary Calculator</h2>

      <label>Email:</label>
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        type="email"
        required
        style={{ width: "100%" }}
      />

      <br /><br />

      <label>From Date:</label>
      <input
        name="fromDate"
        value={form.fromDate}
        onChange={handleChange}
        type="date"
        style={{ width: "100%" }}
        required
      />

      <br /><br />

      <label>To Date:</label>
      <input
        name="toDate"
        value={form.toDate}
        onChange={handleChange}
        type="date"
        style={{ width: "100%" }}
        required
      />

      <br /><br />

      <label>Wages per Day:</label>
      <input
        name="wagesPerDay"
        value={form.wagesPerDay}
        onChange={handleChange}
        type="number"
        style={{ width: "100%" }}
        required
      />

      <br /><br />

      <button onClick={handleSubmit}>Calculate Salary</button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Result</h3>
          <p>Present Days: {result.presentDays}</p>
          <p>Total Salary: ₹{result.salary}</p>
        </div>
      )}
    </div>
  );
};

export default SalaryCalculator;
