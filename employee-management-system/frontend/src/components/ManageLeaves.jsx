import React, { useEffect, useState } from "react";
import { getAllLeaves, updateLeaveStatus } from "../services/leaveApi";

const ManageLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [status, setStatus] = useState(leaves.status);

  const fetchLeaves = async () => {
    const res = await getAllLeaves();
    setLeaves(res.data);
  };

  const handleStatus = async (id, status) => {
    await updateLeaveStatus(id, status);
    fetchLeaves();
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
 <div className="table-container">
      <h2 className="table-title">Manage Leave Requests</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Employee Email</th>
            <th>From</th>
            <th>To</th>
            <th>Reason</th>
            <th>Status</th>
            {status==="Pending" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave._id}>
              <td>{leave.email}</td>
              <td>{new Date(leave.fromDate).toLocaleDateString()}</td>
              <td>{new Date(leave.toDate).toLocaleDateString()}</td>
              <td>{leave.reason}</td>
              <td>{leave.status}</td>
              
                {leave.status === "Pending" && (
                  <td>
                    <button onClick={() => handleStatus(leave._id, "Approved")}>
                      Approve
                    </button>
                    <button onClick={() => handleStatus(leave._id, "Rejected")}>
                      Reject
                    </button>
                  </td>
                )}
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageLeaves;