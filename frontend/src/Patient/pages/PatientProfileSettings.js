import React, { useState } from 'react';
import './PatientProfileSettings.css';

const PatientProfileSettings = () => {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'patient@example.com',
    password: '',
    confirmPassword: '',
    contactNumber: '1234567890', // Make sure to match the expected format
    dateOfBirth: '',
    gender: 'Male', // Default gender
    address: {
      street: '456 Patient Street',
      city: 'City',
      state: 'State',
      postalCode: '12345',
      country: 'Country'
    },
    emergencyContact: {
      name: '',
      relationship: '',
      contactNumber: ''
    },
    medicalHistory: [],
    insuranceProvider: '',
    insurancePolicyNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // If the input is nested (like address), handle it accordingly
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setFormData(prevState => ({
        ...prevState,
        address: {
          ...prevState.address,
          [field]: value,
        }
      }));
    } else if (name.startsWith('emergencyContact.')) {
      const field = name.split('.')[1];
      setFormData(prevState => ({
        ...prevState,
        emergencyContact: {
          ...prevState.emergencyContact,
          [field]: value,
        }
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile update logic here (e.g., sending data to backend)
    console.log('Updated Profile Data:', formData);
  };

  return (
    <div className="patient-profile-settings-container">
      <h2>Patient Profile Settings</h2>
      <form onSubmit={handleSubmit} className="profile-settings-form">
        <div className="form-group">
          <label htmlFor="name">Patient Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
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
          <label htmlFor="contactNumber">Contact Number:</label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="address.street">Street:</label>
          <input
            type="text"
            id="address.street"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address.city">City:</label>
          <input
            type="text"
            id="address.city"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address.state">State:</label>
          <input
            type="text"
            id="address.state"
            name="address.state"
            value={formData.address.state}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address.postalCode">Postal Code:</label>
          <input
            type="text"
            id="address.postalCode"
            name="address.postalCode"
            value={formData.address.postalCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address.country">Country:</label>
          <input
            type="text"
            id="address.country"
            name="address.country"
            value={formData.address.country}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="emergencyContact.name">Emergency Contact Name:</label>
          <input
            type="text"
            id="emergencyContact.name"
            name="emergencyContact.name"
            value={formData.emergencyContact.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="emergencyContact.relationship">Relationship:</label>
          <input
            type="text"
            id="emergencyContact.relationship"
            name="emergencyContact.relationship"
            value={formData.emergencyContact.relationship}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="emergencyContact.contactNumber">Emergency Contact Number:</label>
          <input
            type="text"
            id="emergencyContact.contactNumber"
            name="emergencyContact.contactNumber"
            value={formData.emergencyContact.contactNumber}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="save-btn">Save Changes</button>
      </form>
    </div>
  );
};

export default PatientProfileSettings;
