import React, { useState } from 'react';
import './BillingManagement.css';

const BillingManagement = () => {
  // Sample billing data
  const [billingData, setBillingData] = useState([
    { id: 1, patient: 'John Doe', amount: '$100', date: '2024-09-01', status: 'Paid' },
    { id: 2, patient: 'Jane Smith', amount: '$150', date: '2024-09-02', status: 'Pending' },
    // Add more sample data as needed
  ]);

  const [filter, setFilter] = useState('all');

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    // Logic to filter the data based on the selected filter
  };

  return (
    <div className="billing-management-container">
      <h2>Billing Management</h2>

      <div className="filter-container">
        <label htmlFor="filter">Filter by Status:</label>
        <select id="filter" value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className="billing-list">
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {billingData
              .filter((bill) => filter === 'all' || bill.status.toLowerCase() === filter)
              .map((bill) => (
                <tr key={bill.id}>
                  <td>{bill.patient}</td>
                  <td>{bill.amount}</td>
                  <td>{bill.date}</td>
                  <td>{bill.status}</td>
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

export default BillingManagement;