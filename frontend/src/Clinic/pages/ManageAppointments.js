import React, { useState } from 'react';
import './ManageAppointments.css';

const ManageAppointments = () => {
  // Sample appointment data
  const [appointments, setAppointments] = useState([
    { id: 1, patient: 'John Doe', doctor: 'Dr. Smith', date: '2024-09-01', time: '10:00 AM', status: 'Confirmed' },
    { id: 2, patient: 'Jane Doe', doctor: 'Dr. Jones', date: '2024-09-02', time: '11:00 AM', status: 'Pending' },
    // Add more sample data as needed
  ]);

  const [filter, setFilter] = useState('all');

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    // Logic to filter the data based on the selected filter
  };

  return (
    <div className="appointments-management-container">
      <h2>Appointments Management</h2>

      <div className="filter-container">
        <label htmlFor="filter">Filter by Status:</label>
        <select id="filter" value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className="appointments-list">
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments
              .filter((appointment) => filter === 'all' || appointment.status.toLowerCase() === filter)
              .map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.patient}</td>
                  <td>{appointment.doctor}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.status}</td>
                  <td>
                    <button className="view-btn">View</button>
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAppointments;