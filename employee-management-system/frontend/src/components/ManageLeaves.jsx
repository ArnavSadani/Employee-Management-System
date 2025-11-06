import React, { useEffect, useState } from "react";
import { getAllLeaves, updateLeaveStatus } from "../services/leaveApi";

const ManageLeaves = () => {
  const [leaves, setLeaves] = useState([]);

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
    <div>
      <h2>Manage Leave Requests</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Employee</th>
            <th>From</th>
            <th>To</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave._id}>
              <td>{leave.employee?.name}</td>
              <td>{new Date(leave.fromDate).toLocaleDateString()}</td>
              <td>{new Date(leave.toDate).toLocaleDateString()}</td>
              <td>{leave.reason}</td>
              <td>{leave.status}</td>
              <td>
                {leave.status === "Pending" && (
                  <>
                    <button onClick={() => handleStatus(leave._id, "Approved")}>
                      Approve
                    </button>
                    <button onClick={() => handleStatus(leave._id, "Rejected")}>
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageLeaves;
