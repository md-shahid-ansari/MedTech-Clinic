import React, { useState } from 'react';
import './DoctorList.css';

const doctors = [
  {
    id: 1,
    name: 'Dr. John Doe',
    specialty: 'Cardiology',
    experience: '15 years',
    rating: '4.8',
    image: 'doctor1.jpg', // Replace with actual image paths
  },
  {
    id: 2,
    name: 'Dr. Jane Smith',
    specialty: 'Dermatology',
    experience: '10 years',
    rating: '4.6',
    image: 'doctor2.jpg',
  },
  {
    id: 1,
    name: 'Dr. John Doe',
    specialty: 'Cardiology',
    experience: '15 years',
    rating: '4.8',
    image: 'doctor1.jpg', // Replace with actual image paths
  },
  {
    id: 2,
    name: 'Dr. Jane Smith',
    specialty: 'Dermatology',
    experience: '10 years',
    rating: '4.6',
    image: 'doctor2.jpg',
  },
  {
    id: 1,
    name: 'Dr. John Doe',
    specialty: 'Cardiology',
    experience: '15 years',
    rating: '4.8',
    image: 'doctor1.jpg', // Replace with actual image paths
  },
  {
    id: 2,
    name: 'Dr. Jane Smith',
    specialty: 'Dermatology',
    experience: '10 years',
    rating: '4.6',
    image: 'doctor2.jpg',
  },
  {
    id: 1,
    name: 'Dr. John Doe',
    specialty: 'Cardiology',
    experience: '15 years',
    rating: '4.8',
    image: 'doctor1.jpg', // Replace with actual image paths
  },
  {
    id: 2,
    name: 'Dr. Jane Smith',
    specialty: 'Dermatology',
    experience: '10 years',
    rating: '4.6',
    image: 'doctor2.jpg',
  },
  {
    id: 1,
    name: 'Dr. John Doe',
    specialty: 'Cardiology',
    experience: '15 years',
    rating: '4.8',
    image: 'doctor1.jpg', // Replace with actual image paths
  },
  {
    id: 2,
    name: 'Dr. Jane Smith',
    specialty: 'Dermatology',
    experience: '10 years',
    rating: '4.6',
    image: 'doctor2.jpg',
  },
  // Add more doctor objects as needed
];

const DoctorList = () => {
  return (
    <div className="doctor-list-container">
      <h1 className="page-title">Our Doctors</h1>
      <div className="doctor-list">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="doctor-card">
            <img src={doctor.image} alt={doctor.name} className="doctor-image" />
            <div className="doctor-info">
              <h2 className="doctor-name">{doctor.name}</h2>
              <p className="doctor-specialty">{doctor.specialty}</p>
              <p className="doctor-experience">Experience: {doctor.experience}</p>
              <p className="doctor-rating">Rating: {doctor.rating}★</p>
              <button className="book-appointment-btn">Book Appointment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
