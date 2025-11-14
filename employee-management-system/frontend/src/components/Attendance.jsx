import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useAuth } from "../context/UserContext";

import { markAttendance, getAttendance } from "../services/api";

const Attendance = () => {
  const { email } = useAuth(); 
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [presentDates, setPresentDates] = useState([]);

  // Fetch attendance for calendar
  const fetchAttendance = async () => {
    if (!email) return;

    const res = await getAttendance(email);
    setPresentDates(res.data.dates || []);
  };

  useEffect(() => {
    fetchAttendance();
  }, [email]);

  const handleSubmit = async () => {
    const formattedDate = selectedDate.toISOString().split("T")[0];

    await markAttendance({
      email,
      date: formattedDate,
    });

    alert("Attendance Marked!");
    fetchAttendance();
  };

  // Highlight present days in green
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const d = date.toISOString().split("T")[0];
      if (presentDates.includes(d)) {
        return "present-day";
      }
    }
    return null;
  };

  return (
<div className="form-container">
      <h2 className="form-title">Attendance Marking</h2>

      <div>
        <label>Email:</label>
        <input value={email || ""} readOnly className="form-input" />
      </div>

  

      <div>
        <label>Select Date:</label>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileClassName={tileClassName}
        />
      </div>

      <br />

      <button  className="form-btn" onClick={handleSubmit}>Mark Attendance</button>

      <style>
        {`
          .present-day {
            background: #4caf50 !important;
            color: white !important;
            border-radius: 50%;
          }
        `}
      </style>
    </div>
  );
};

export default Attendance;
