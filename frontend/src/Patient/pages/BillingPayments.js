import React, { useState } from 'react';
import './BillingPayments.css';

const BillingPayments = () => {
  // Sample billing data
  const billingHistory = [
    { date: "2024-08-15", description: "Consultation with Dr. John Doe", amount: "$50.00", status: "Paid" },
    { date: "2024-08-20", description: "Blood Test", amount: "$30.00", status: "Pending" },
    // Add more billing records as needed
  ];

  const [paymentAmount, setPaymentAmount] = useState('');

  const handlePaymentChange = (e) => {
    setPaymentAmount(e.target.value);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission logic here (e.g., processing the payment)
    console.log(`Processing payment of ${paymentAmount}`);
  };

  return (
    <div className="billing-payments-container">
      <h1>Billing and Payments</h1>
      
      <div className="billing-history">
        <h2>Billing History</h2>
        <table className="billing-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {billingHistory.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.description}</td>
                <td>{item.amount}</td>
                <td className={item.status.toLowerCase()}>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="payment-form">
        <h2>Make a Payment</h2>
        <form onSubmit={handlePaymentSubmit}>
          <div className="form-group">
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={paymentAmount}
              onChange={handlePaymentChange}
              placeholder="Enter amount"
              required
            />
          </div>
          <button type="submit" className="submit-btn">Pay Now</button>
        </form>
      </div>
    </div>
  );
};

export default BillingPayments;