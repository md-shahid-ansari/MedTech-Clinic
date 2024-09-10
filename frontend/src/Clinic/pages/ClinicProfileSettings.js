import React, { useState } from 'react';
import './ClinicProfileSettings.css';

const ClinicProfileSettings = () => {
  const [formData, setFormData] = useState({
    clinicName: 'ABC Clinic',
    email: 'clinic@example.com',
    password: '',
    confirmPassword: '',
    address: '123 Clinic Street, City'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile update logic here (e.g., sending data to backend)
    console.log('Updated Profile Data:', formData);
  };

  return (
    <div className="clinic-profile-settings-container">
      <h2>Profile Settings</h2>
      <form onSubmit={handleSubmit} className="profile-settings-form">
        <div className="form-group">
          <label htmlFor="clinicName">Clinic Name:</label>
          <input
            type="text"
            id="clinicName"
            name="clinicName"
            value={formData.clinicName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="save-btn">Save Changes</button>
      </form>
    </div>
  );
};

export default ClinicProfileSettings;
