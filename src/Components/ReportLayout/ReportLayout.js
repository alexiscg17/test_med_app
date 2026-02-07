import React, { useEffect, useState } from "react";
import ReportRow from "./ReportRow/ReportRow";
import "./ReportLayout.css";

const ReportLayout = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const appointments = Object.keys(localStorage)
      .map((key) => {
        try {
          return JSON.parse(localStorage.getItem(key));
        } catch {
          return null;
        }
      })
      .filter((item) => item?.doctor);

    const uniqueAppointments = {};
    appointments.forEach((appt) => {
      uniqueAppointments[appt.doctor.name] = appt.doctor;
    });

    setAppointments(Object.values(uniqueAppointments));
  }, []);

  return (
    <div className="reports-container">
      <h1 className="reports-title">Medical Reports</h1>

      {appointments.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          No reports available. Please book an appointment first.
        </p>
      ) : (
        <table className="reports-table">
          <thead>
            <tr>
              <th>Serial No</th>
              <th>Doctor Name</th>
              <th>Doctor Speciality</th>
              <th>View Report</th>
              <th>Download Report</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appointment, index) => (
              <ReportRow
                key={appointment.name}
                index={index}
                appointment={appointment}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReportLayout;
