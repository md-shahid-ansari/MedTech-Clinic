import React, { useState } from 'react';
import './AppointmentManage.css';

const AppointmentsManage = () => {
  // Dummy data for appointments
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: 'John Doe',
      date: '2024-09-05',
      time: '10:00 AM',
      status: 'Pending',
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      date: '2024-09-06',
      time: '11:00 AM',
      status: 'Confirmed',
    },
    // Add more appointments as needed
  ]);

  // Function to update appointment status
  const handleStatusChange = (id, status) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id ? { ...appointment, status } : appointment
      )
    );
  };

  return (
    <div className="appointments-manage-container">
      <h1>Appointments Management</h1>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.patientName}</td>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td>{appointment.status}</td>
              <td>
                <button
                  className="confirm-btn"
                  onClick={() => handleStatusChange(appointment.id, 'Confirmed')}
                >
                  Confirm
                </button>
                <button
                  className="reschedule-btn"
                  onClick={() => handleStatusChange(appointment.id, 'Rescheduled')}
                >
                  Reschedule
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => handleStatusChange(appointment.id, 'Cancelled')}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentsManage;