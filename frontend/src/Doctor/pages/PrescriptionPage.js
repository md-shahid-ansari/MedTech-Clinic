import React, { useState } from 'react';
import './PrescriptionPage.css';

const PrescriptionPage = () => {
  const [prescriptions, setPrescriptions] = useState([
    // Sample data
    { id: 1, patient: 'John Doe', date: '2024-09-01', medication: 'Medication A', notes: 'Follow up in 2 weeks' },
    { id: 2, patient: 'Jane Smith', date: '2024-09-02', medication: 'Medication B', notes: 'Take with food' },
  ]);

  const [newPrescription, setNewPrescription] = useState({
    patient: '',
    date: '',
    medication: '',
    notes: '',
  });

  const handleChange = (e) => {
    setNewPrescription({
      ...newPrescription,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPrescriptions([...prescriptions, { ...newPrescription, id: prescriptions.length + 1 }]);
    setNewPrescription({ patient: '', date: '', medication: '', notes: '' });
  };

  return (
    <div className="prescription-page-container">
      <h2>Prescription Management</h2>
      <div className="prescription-form-container">
        <h3>Create New Prescription</h3>
        <form onSubmit={handleSubmit} className="prescription-form">
          <div className="form-group">
            <label htmlFor="patient">Patient Name:</label>
            <input
              type="text"
              id="patient"
              name="patient"
              value={newPrescription.patient}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={newPrescription.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="medication">Medication:</label>
            <input
              type="text"
              id="medication"
              name="medication"
              value={newPrescription.medication}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes:</label>
            <textarea
              id="notes"
              name="notes"
              value={newPrescription.notes}
              onChange={handleChange}
              placeholder="Additional instructions or comments"
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">Add Prescription</button>
        </form>
      </div>

      <div className="prescriptions-list">
        <h3>Existing Prescriptions</h3>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Medication</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((prescription) => (
              <tr key={prescription.id}>
                <td>{prescription.patient}</td>
                <td>{prescription.date}</td>
                <td>{prescription.medication}</td>
                <td>{prescription.notes}</td>
                <td>
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

export default PrescriptionPage;