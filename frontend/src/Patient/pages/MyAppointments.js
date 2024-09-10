import React from 'react';
import './MyAppointments.css';

const MyAppointments = () => {
  // Sample data for appointments
  const appointments = [
    { doctor: "Dr. John Doe", date: "2024-09-10", time: "10:00 AM", status: "Confirmed" },
    { doctor: "Dr. Jane Smith", date: "2024-09-12", time: "2:30 PM", status: "Pending" },
    // Add more appointments as needed
  ];

  return (
    <div className="appointments-container">
      <h1>My Appointments</h1>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index}>
              <td>{appointment.doctor}</td>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td>{appointment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyAppointments;