import React, { useState } from 'react';
import './DoctorProfileSettings.css';

const DoctorProfileSettings = () => {
  const [formData, setFormData] = useState({
    doctorName: 'Dr. John Doe',
    email: 'doctor@example.com',
    password: '',
    confirmPassword: '',
    specialty: 'Cardiology',
    clinicAddress: '123 Clinic Street, City',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile update logic here (e.g., sending data to backend)
    console.log('Updated Profile Data:', formData);
  };

  return (
    <div className="doctor-profile-settings-container">
      <h2>Doctor Profile Settings</h2>
      <form onSubmit={handleSubmit} className="profile-settings-form">
        <div className="form-group">
          <label htmlFor="doctorName">Doctor Name:</label>
          <input
            type="text"
            id="doctorName"
            name="doctorName"
            value={formData.doctorName}
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
          <label htmlFor="specialty">Specialty:</label>
          <input
            type="text"
            id="specialty"
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="clinicAddress">Clinic Address:</label>
          <input
            type="text"
            id="clinicAddress"
            name="clinicAddress"
            value={formData.clinicAddress}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="save-btn">Save Changes</button>
      </form>
    </div>
  );
};

export default DoctorProfileSettings;
