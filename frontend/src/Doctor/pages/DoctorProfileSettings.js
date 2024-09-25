import React, { useState, useEffect } from 'react';
import './DoctorProfileSettings.css';

const DoctorProfileSettings = ({ doctorData }) => {
  const [doctorProfile, setDoctorProfile] = useState({
    doctorId: 'D12345',
    email: 'dr.johndoe@example.com',
    name: 'Dr. John Doe',
    dateOfBirth: '1980-01-01', // YYYY-MM-DD format
    gender: 'Male',
    contactNumber: '+1-234-567-8901',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      postalCode: '90210',
      country: 'USA'
    },
    specialty: 'Cardiology',
    qualifications: ['MD', 'FACC'],
    yearsOfExperience: '15',
    clinicDetails: {
      name: 'Anytown Heart Clinic',
      address: {
        street: '456 Health Ave',
        city: 'Anytown',
        state: 'CA',
        postalCode: '90210',
        country: 'USA'
      },
      contactNumber: '+1-234-567-8902'
    },
    availability: {
      dateUnavailable: ['2024-09-30', '2024-10-01'],
      timeSlots: ['09:00-10:00', '14:00-15:00']
    },
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Wife',
      contactNumber: '+1-234-567-8903'
    },
    insuranceProvider: 'Health Insurance Co.',
    insurancePolicyNumber: 'HIC-123456',
  });
  

  // Load the doctor data when the component mounts
  useEffect(() => {
    if (doctorData) {
      setDoctorProfile(doctorData);
    }
  }, [doctorData]);

  // Function to handle input changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorProfile({
      ...doctorProfile,
      [name]: value
    });
  };

  // Handle adding a new time slot
  const handleAddTimeSlot = () => {
    setDoctorProfile({
      ...doctorProfile,
      availability: {
        ...doctorProfile.availability,
        timeSlots: [...doctorProfile.availability.timeSlots, ''] // Add an empty time slot
      }
    });
  };

  // Handle deleting a time slot
  const handleDeleteTimeSlot = (index) => {
    const updatedTimeSlots = doctorProfile.availability.timeSlots.filter((_, i) => i !== index);
    setDoctorProfile({
      ...doctorProfile,
      availability: {
        ...doctorProfile.availability,
        timeSlots: updatedTimeSlots
      }
    });
  };

  // Handle time slot change
  const handleTimeSlotChange = (index, value) => {
    const updatedTimeSlots = doctorProfile.availability.timeSlots.map((slot, i) =>
      i === index ? value : slot
    );
    setDoctorProfile({
      ...doctorProfile,
      availability: {
        ...doctorProfile.availability,
        timeSlots: updatedTimeSlots
      }
    });
  };

  // Handle adding a new unavailable date
  const handleAddDateUnavailable = () => {
    setDoctorProfile({
      ...doctorProfile,
      availability: {
        ...doctorProfile.availability,
        dateUnavailable: [...doctorProfile.availability.dateUnavailable, ''] // Add an empty date
      }
    });
  };

  // Handle deleting an unavailable date
  const handleDeleteDateUnavailable = (index) => {
    const updatedDates = doctorProfile.availability.dateUnavailable.filter((_, i) => i !== index);
    setDoctorProfile({
      ...doctorProfile,
      availability: {
        ...doctorProfile.availability,
        dateUnavailable: updatedDates
      }
    });
  };

  // Handle unavailable date change
  const handleDateUnavailableChange = (index, value) => {
    const updatedDates = doctorProfile.availability.dateUnavailable.map((date, i) =>
      i === index ? value : date
    );
    setDoctorProfile({
      ...doctorProfile,
      availability: {
        ...doctorProfile.availability,
        dateUnavailable: updatedDates
      }
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile update logic here (e.g., sending data to backend)
    console.log('Updated Profile Data:', doctorProfile);
  };

  return (
    <div className="doctor-profile-settings-container">
      <h2>Doctor Profile Settings</h2>
      <form onSubmit={handleSubmit} className="profile-settings-form">
        
    
        {/* Basic Information Section */}
        <section className="section">
          <h3>Basic Information</h3>
          
          <div className="form-group">
            <label htmlFor="doctorId">Doctor ID</label>
            <input
              type="text"
              id="doctorId"
              name="doctorId"
              value={doctorProfile.doctorId}
              disabled
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={doctorProfile.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={doctorProfile.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={doctorProfile.contactNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <input
              type="text"
              id="gender"
              name="gender"
              value={doctorProfile.gender}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={doctorProfile.dateOfBirth}
              onChange={handleChange}
            />
          </div>
        </section>

        {/* Address Section */}
        <section className="section">
          <h3>Address Information</h3>

          <div className="form-group">
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              name="address.street"
              value={doctorProfile.address.street}
              onChange={(e) => setDoctorProfile({
                ...doctorProfile,
                address: { ...doctorProfile.address, street: e.target.value }
              })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="address.city"
              value={doctorProfile.address.city}
              onChange={(e) => setDoctorProfile({
                ...doctorProfile,
                address: { ...doctorProfile.address, city: e.target.value }
              })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="address.state"
              value={doctorProfile.address.state}
              onChange={(e) => setDoctorProfile({
                ...doctorProfile,
                address: { ...doctorProfile.address, state: e.target.value }
              })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              name="address.postalCode"
              value={doctorProfile.address.postalCode}
              onChange={(e) => setDoctorProfile({
                ...doctorProfile,
                address: { ...doctorProfile.address, postalCode: e.target.value }
              })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="address.country"
              value={doctorProfile.address.country}
              onChange={(e) => setDoctorProfile({
                ...doctorProfile,
                address: { ...doctorProfile.address, country: e.target.value }
              })}
            />
          </div>
        </section>

        {/* Professional Information Section */}
        <section className="section">
          <h3>Professional Information</h3>

          <div className="form-group">
            <label htmlFor="specialty">Specialty</label>
            <input
              type="text"
              id="specialty"
              name="specialty"
              value={doctorProfile.specialty}
              onChange={(e) => setDoctorProfile({ ...doctorProfile, specialty: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="qualifications">Qualifications</label>
            <textarea
              id="qualifications"
              name="qualifications"
              value={doctorProfile.qualifications.join(', ')} // Joining qualifications for display
              onChange={(e) => setDoctorProfile({ ...doctorProfile, qualifications: e.target.value.split(', ') })}
            />
            <small>Separate qualifications with commas.</small>
          </div>

          <div className="form-group">
            <label htmlFor="yearsOfExperience">Years of Experience</label>
            <input
              type="number"
              id="yearsOfExperience"
              name="yearsOfExperience"
              value={doctorProfile.yearsOfExperience}
              onChange={(e) => setDoctorProfile({ ...doctorProfile, yearsOfExperience: e.target.value })}
            />
          </div>
        </section>



        {/* Clinic Details Section */}
        <section className="section">
          <h3>Clinic Details</h3>

          <div className="form-group">
            <label htmlFor="clinicName">Clinic Name</label>
            <input
              type="text"
              id="clinicName"
              name="clinicName"
              value={doctorProfile.clinicDetails.name}
              onChange={(e) => setDoctorProfile({ 
                ...doctorProfile, 
                clinicDetails: { 
                  ...doctorProfile.clinicDetails, 
                  name: e.target.value 
                } 
              })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="clinicStreet">Street</label>
            <input
              type="text"
              id="clinicStreet"
              name="clinicStreet"
              value={doctorProfile.clinicDetails.address.street}
              onChange={(e) => setDoctorProfile({ 
                ...doctorProfile, 
                clinicDetails: { 
                  ...doctorProfile.clinicDetails, 
                  address: { 
                    ...doctorProfile.clinicDetails.address, 
                    street: e.target.value 
                  } 
                } 
              })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="clinicCity">City</label>
            <input
              type="text"
              id="clinicCity"
              name="clinicCity"
              value={doctorProfile.clinicDetails.address.city}
              onChange={(e) => setDoctorProfile({ 
                ...doctorProfile, 
                clinicDetails: { 
                  ...doctorProfile.clinicDetails, 
                  address: { 
                    ...doctorProfile.clinicDetails.address, 
                    city: e.target.value 
                  } 
                } 
              })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="clinicState">State</label>
            <input
              type="text"
              id="clinicState"
              name="clinicState"
              value={doctorProfile.clinicDetails.address.state}
              onChange={(e) => setDoctorProfile({ 
                ...doctorProfile, 
                clinicDetails: { 
                  ...doctorProfile.clinicDetails, 
                  address: { 
                    ...doctorProfile.clinicDetails.address, 
                    state: e.target.value 
                  } 
                } 
              })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="clinicPostalCode">Postal Code</label>
            <input
              type="text"
              id="clinicPostalCode"
              name="clinicPostalCode"
              value={doctorProfile.clinicDetails.address.postalCode}
              onChange={(e) => setDoctorProfile({ 
                ...doctorProfile, 
                clinicDetails: { 
                  ...doctorProfile.clinicDetails, 
                  address: { 
                    ...doctorProfile.clinicDetails.address, 
                    postalCode: e.target.value 
                  } 
                } 
              })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="clinicCountry">Country</label>
            <input
              type="text"
              id="clinicCountry"
              name="clinicCountry"
              value={doctorProfile.clinicDetails.address.country}
              onChange={(e) => setDoctorProfile({ 
                ...doctorProfile, 
                clinicDetails: { 
                  ...doctorProfile.clinicDetails, 
                  address: { 
                    ...doctorProfile.clinicDetails.address, 
                    country: e.target.value 
                  } 
                } 
              })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="clinicContactNumber">Clinic Contact Number</label>
            <input
              type="text"
              id="clinicContactNumber"
              name="clinicContactNumber"
              value={doctorProfile.clinicDetails.contactNumber}
              onChange={(e) => setDoctorProfile({ 
                ...doctorProfile, 
                clinicDetails: { 
                  ...doctorProfile.clinicDetails, 
                  contactNumber: e.target.value 
                } 
              })}
            />
          </div>
        </section>



        {/* Availability Section */}
        <section className="section">
          <h3>Availability</h3>

          <div className="form-group">
            <label htmlFor="timeSlots">Time Slots</label>
            {doctorProfile.availability.timeSlots.map((slot, index) => (
              <div key={index} className="time-slot">
                <input
                  type="text"
                  value={slot}
                  onChange={(e) => handleTimeSlotChange(index, e.target.value)}
                  placeholder="Enter time slot"
                />
                <button type="button" onClick={() => handleDeleteTimeSlot(index)}>Delete</button>
              </div>
            ))}
            <button type="button" onClick={handleAddTimeSlot}>Add Time Slot</button>
          </div>

          <div className="form-group">
            <label htmlFor="unavailableDates">Unavailable Dates</label>
            {doctorProfile.availability.dateUnavailable.map((date, index) => (
              <div key={index} className="unavailable-date">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => handleDateUnavailableChange(index, e.target.value)}
                />
                <button type="button" onClick={() => handleDeleteDateUnavailable(index)}>Delete</button>
              </div>
            ))}
            <button type="button" onClick={handleAddDateUnavailable}>Add Unavailable Date</button>
          </div>
        </section>



        {/* Emergency Contact Section */}
        <section className="section">
          <h3>Emergency Contact</h3>

          <div className="form-group">
            <label htmlFor="emergencyContactName">Name</label>
            <input
              type="text"
              id="emergencyContactName"
              name="emergencyContactName"
              value={doctorProfile.emergencyContact.name}
              onChange={(e) => setDoctorProfile({ 
                ...doctorProfile, 
                emergencyContact: { 
                  ...doctorProfile.emergencyContact, 
                  name: e.target.value 
                } 
              })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="emergencyContactRelationship">Relationship</label>
            <input
              type="text"
              id="emergencyContactRelationship"
              name="emergencyContactRelationship"
              value={doctorProfile.emergencyContact.relationship}
              onChange={(e) => setDoctorProfile({ 
                ...doctorProfile, 
                emergencyContact: { 
                  ...doctorProfile.emergencyContact, 
                  relationship: e.target.value 
                } 
              })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="emergencyContactNumber">Contact Number</label>
            <input
              type="tel"
              id="emergencyContactNumber"
              name="emergencyContactNumber"
              value={doctorProfile.emergencyContact.contactNumber}
              onChange={(e) => setDoctorProfile({ 
                ...doctorProfile, 
                emergencyContact: { 
                  ...doctorProfile.emergencyContact, 
                  contactNumber: e.target.value 
                } 
              })}
              required
            />
          </div>
        </section>


        {/* Submit Button */}
        <button type="submit" className="submit-btn">Update Profile</button>
      </form>
    </div>
  );
};

export default DoctorProfileSettings;
