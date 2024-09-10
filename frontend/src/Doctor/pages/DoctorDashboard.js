import React, { useState } from 'react';
import './DoctorDashboard.css';

const DoctorDashboard = () => {
  // Dummy data for appointments
  const appointments = [
    { id: 1, patientName: 'John Doe', date: '2024-09-05', time: '10:30 AM', status: 'Upcoming' },
    { id: 2, patientName: 'Jane Smith', date: '2024-09-03', time: '02:00 PM', status: 'Consulted' },
    { id: 3, patientName: 'Bob Johnson', date: '2024-08-30', time: '09:00 AM', status: 'Missed' },
    { id: 1, patientName: 'John Doe', date: '2024-09-05', time: '10:30 AM', status: 'Upcoming' },
    { id: 2, patientName: 'Jane Smith', date: '2024-09-03', time: '02:00 PM', status: 'Consulted' },
    { id: 3, patientName: 'Bob Johnson', date: '2024-08-30', time: '09:00 AM', status: 'Missed' },
    { id: 1, patientName: 'John Doe', date: '2024-09-05', time: '10:30 AM', status: 'Upcoming' },
    { id: 2, patientName: 'Jane Smith', date: '2024-09-03', time: '02:00 PM', status: 'Consulted' },
    { id: 3, patientName: 'Bob Johnson', date: '2024-08-30', time: '09:00 AM', status: 'Missed' },
    // Add more appointments as needed
  ];

  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleCardClick = (appointment) => {
    setSelectedAppointment(appointment);
  };

  return (
    <div className="doctor-dashboard-container">
      <h1>Doctor Dashboard</h1>

      <div className="appointments-section">
        <h2>Appointments</h2>
        <div className="appointments-cards-horizontal">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className={`appointment-card ${appointment.status.toLowerCase()}`}
              onClick={() => handleCardClick(appointment)}
            >
              <h3>{appointment.patientName}</h3>
              <p>{appointment.date} at {appointment.time}</p>
              <p>Status: {appointment.status}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedAppointment && (
        <div className="appointment-details">
          <h2>Details for {selectedAppointment.patientName}</h2>
          <p>Date: {selectedAppointment.date} at {selectedAppointment.time}</p>
          <p>Status: {selectedAppointment.status}</p>
          {/* Actions for the selected appointment */}
          <button className="action-btn">Make Bill</button>
          <button className="action-btn">Write Prescription</button>
          <button className="action-btn">Upload Test Result</button>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
