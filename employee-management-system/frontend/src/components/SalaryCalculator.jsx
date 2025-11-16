import { useEffect, useState } from "react";
import { calculateSalary , generateslip } from "../services/api";

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

  const generateSlip = async () => {
  try {
    await generateslip({
      ...form,
      result,
    });

    alert("Salary slip generated successfully!");
  } catch (err) {
    console.error(err);
    alert("Error generating slip");
  }
};




  return (
    <div className="form-container">
      <h2 className="form-title">Salary Calculator</h2>

      <label>Email:</label>
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        type="email"
         className="form-input"
        required
     
      />

      <br /><br />

      <label>From Date:</label>
      <input
        name="fromDate"
        value={form.fromDate}
        onChange={handleChange}
        type="date"
         className="form-input"
       
        required
      />

      <br /><br />

      <label>To Date:</label>
      <input
        name="toDate"
        value={form.toDate}
        onChange={handleChange}
        type="date"
         className="form-input"
   
        required
      />

      <br /><br />

      <label>Salary per Day:</label>
      <input
        name="wagesPerDay"
        value={form.wagesPerDay}
          onChange={handleChange}
        type="number"
      className="form-input"
        required
      />

      

      <button className="form-btn" onClick={handleSubmit}>Calculate Salary</button>

      {result && (
        <>
        <div style={{ marginTop: "20px" }}>
          <h3>Result</h3>
          <p>Present Days: {result.presentDays}</p>
          <p>Total Salary: ₹{result.salary}</p>
        </div>

        <button className="form-btn" onClick={generateSlip}>Generate Slip</button>
        </>
      )}
    </div>
  );
};

export default SalaryCalculator;
