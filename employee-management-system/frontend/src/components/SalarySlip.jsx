import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/UserContext";
import { getallslip } from "../services/api";

export default function SalarySlip() {
    const {email} = useAuth();
//   const [email, setEmail] = useState("");
  const [slips, setSlips] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSlips = async () => {
    if (!email) return alert("Please enter an email");

    try {
      setLoading(true);
      const res = await getallslip(email);
     
      setSlips(res.data.slips || []);
    } catch (error) {
      console.error(error);
      alert("Error fetching salary slips");
    }
    setLoading(false);
  };

  return (
    <div className="slip-container">
      <h2>Salary Slip Viewer</h2>

      <div className="slip-form">
        <label>Employee Email</label>
        <input
          type="email"
          value={email}
          placeholder="Enter employee email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={fetchSlips}>
          {loading ? "Loading..." : "Get Salary Slips"}
        </button>
      </div>

      <br />

      {slips.length > 0 && (
        <div className="slip-table-container">
          <h3>Salary Slips</h3>

          <table className="slip-table">
            <thead>
              <tr>
                <th>From Date</th>
                <th>To Date</th>
                <th>Salary per day</th>
                <th>Present Days</th>
                <th>Net Salary</th>
               
              </tr>
            </thead>

            <tbody>
              {slips.map((slip, index) => (
                <tr key={index}>
                  <td>{new Date(slip.fromDate).toLocaleDateString()}</td>
        <td>{new Date(slip.toDate).toLocaleDateString()}</td>
                  {/* <td>{slip.toDate}</td> */}
                  <td>₹{slip.wagesPerDay}</td>
                  <td>{slip.presentDays}</td>
                  <td>₹{slip.salary}</td>
                
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {slips.length === 0 && !loading && (
        <p style={{ textAlign: "center", marginTop: "20px", color: "#666" }}>
          No salary slips found.
        </p>
      )}
    </div>
  );
}
