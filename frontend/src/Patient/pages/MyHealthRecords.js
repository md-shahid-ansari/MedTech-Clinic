import React from 'react';
import './MyHealthRecords.css';

const MyHealthRecords = () => {
  // Sample medical records data
  const healthRecords = [
    { date: "2024-08-10", type: "Blood Test", description: "Routine checkup", file: "Download PDF" },
    { date: "2024-08-15", type: "X-Ray", description: "Chest X-Ray", file: "Download JPEG" },
    // Add more records as needed
  ];

  return (
    <div className="health-records-container">
      <h2>My Medical Records</h2>
      <p>Here you can view and download your medical records.</p>
      
      <div className="records-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Description</th>
              <th>File</th>
            </tr>
          </thead>
          <tbody>
            {healthRecords.map((record, index) => (
              <tr key={index}>
                <td>{record.date}</td>
                <td>{record.type}</td>
                <td>{record.description}</td>
                <td>
                  <a href="/" className="download-link">
                    {record.file}
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

export default MyHealthRecords;