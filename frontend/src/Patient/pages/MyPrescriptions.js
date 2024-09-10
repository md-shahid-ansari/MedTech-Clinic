import React from 'react';
import './MyPrescriptions.css';

const MyPrescriptions = () => {
  // Sample prescriptions data
  const prescriptions = [
    { date: "2024-08-01", doctor: "Dr. Smith", medication: "Paracetamol", dosage: "500mg", file: "View Prescription" },
    { date: "2024-08-15", doctor: "Dr. Jones", medication: "Ibuprofen", dosage: "200mg", file: "View Prescription" },
    // Add more prescriptions as needed
  ];

  return (
    <div className="prescriptions-container">
      <h1>My Prescriptions</h1>
      <p>Here you can view and download your prescriptions.</p>
      
      <div className="prescriptions-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Doctor</th>
              <th>Medication</th>
              <th>Dosage</th>
              <th>Prescription</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((prescription, index) => (
              <tr key={index}>
                <td>{prescription.date}</td>
                <td>{prescription.doctor}</td>
                <td>{prescription.medication}</td>
                <td>{prescription.dosage}</td>
                <td>
                  <a href="/" className="download-link">
                    {prescription.file}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPrescriptions;