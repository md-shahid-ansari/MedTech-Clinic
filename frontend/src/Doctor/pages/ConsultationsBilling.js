import React, { useState } from 'react';
import './ConsultationsBilling.css';

const ConsultationsBilling = () => {
  // State for consultations and billing entries
  const [consultations, setConsultations] = useState([
    {
      id: 1,
      patientName: 'John Doe',
      consultationDate: '2024-09-05',
      consultationType: 'General Checkup',
      amount: '₹500',
      paymentStatus: 'Paid',
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      consultationDate: '2024-09-06',
      consultationType: 'Dental Checkup',
      amount: '₹700',
      paymentStatus: 'Pending',
    },
    // Add more consultations as needed
  ]);

  const [newBill, setNewBill] = useState({
    patientName: '',
    consultationDate: '',
    consultationType: '',
    amount: '',
    paymentStatus: 'Pending',
  });

  const handleChange = (e) => {
    setNewBill({
      ...newBill,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setConsultations([...consultations, { ...newBill, id: consultations.length + 1 }]);
    setNewBill({
      patientName: '',
      consultationDate: '',
      consultationType: '',
      amount: '',
      paymentStatus: 'Pending',
    });
  };

  return (
    <div className="consultations-billing-container">
      <h2>Create and Manage Bills</h2>

      <form onSubmit={handleSubmit} className="billing-form">
        <h3>Create New Bill</h3>
        <div className="form-group">
          <label htmlFor="patientName">Patient Name:</label>
          <input
            type="text"
            id="patientName"
            name="patientName"
            value={newBill.patientName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="consultationDate">Consultation Date:</label>
          <input
            type="date"
            id="consultationDate"
            name="consultationDate"
            value={newBill.consultationDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="consultationType">Consultation Type:</label>
          <input
            type="text"
            id="consultationType"
            name="consultationType"
            value={newBill.consultationType}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={newBill.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="paymentStatus">Payment Status:</label>
          <select
            id="paymentStatus"
            name="paymentStatus"
            value={newBill.paymentStatus}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">Add Bill</button>
      </form>

      <table className="consultations-table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Consultation Date</th>
            <th>Consultation Type</th>
            <th>Amount</th>
            <th>Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {consultations.map((consultation) => (
            <tr key={consultation.id}>
              <td>{consultation.patientName}</td>
              <td>{consultation.consultationDate}</td>
              <td>{consultation.consultationType}</td>
              <td>{consultation.amount}</td>
              <td>{consultation.paymentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultationsBilling;