import React, { useState } from 'react';
import './PrescriptionLogs.css';

const PrescriptionLogs = () => {
  // Sample prescription log data
  const [prescriptions, setPrescriptions] = useState([
    { id: 1, patient: 'John Doe', doctor: 'Dr. Smith', date: '2024-09-01', prescription: 'Medication A', status: 'Completed' },
    { id: 2, patient: 'Jane Doe', doctor: 'Dr. Jones', date: '2024-09-02', prescription: 'Medication B', status: 'Pending' },
    // Add more sample data as needed
  ]);

  const [filter, setFilter] = useState('all');

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    // Logic to filter the data based on the selected filter
  };

  return (
    <div className="prescription-logs-container">
      <h1>Prescription Logs</h1>

      <div className="filter-container">
        <label htmlFor="filter">Filter by Status:</label>
        <select id="filter" value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className="prescription-list">
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Prescription</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions
              .filter((prescription) => filter === 'all' || prescription.status.toLowerCase() === filter)
              .map((prescription) => (
                <tr key={prescription.id}>
                  <td>{prescription.patient}</td>
                  <td>{prescription.doctor}</td>
                  <td>{prescription.date}</td>
                  <td>{prescription.prescription}</td>
                  <td>{prescription.status}</td>
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

export default PrescriptionLogs;