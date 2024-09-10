import React, { useState } from 'react';
import './BookAppointments.css';

const BookAppointments = () => {
  const [formData, setFormData] = useState({
    doctor: '',
    date: '',
    time: '',
    notes: ''
  });

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Sample data for time slots
  const timeSlots = [
    { time: '09:00 AM', available: true },
    { time: '10:00 AM', available: false },
    { time: '11:00 AM', available: true },
    { time: '12:00 PM', available: true },
    { time: '01:00 PM', available: false },
    { time: '02:00 PM', available: true },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setFormData({
      ...formData,
      date: e.target.value
    });
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    setFormData({
      ...formData,
      time: time
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., sending data to backend)
    console.log(formData);
  };

  return (
    <div className="book-appointment-container">
      <h1>Book an Appointment</h1>
      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="doctor">Select Doctor:</label>
          <select
            id="doctor"
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
          >
            <option value="">--Select--</option>
            <option value="Dr. John Doe">Dr. John Doe</option>
            <option value="Dr. Jane Smith">Dr. Jane Smith</option>
            {/* Add more doctors as needed */}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Select Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>

        <div className="form-group">
          <label>Select Time Slot:</label>
          <div className="time-slot-list">
            {timeSlots.map((slot, index) => (
              <button
                key={index}
                className={`time-slot ${slot.available ? 'available' : 'unavailable'}`}
                onClick={() => slot.available && handleTimeChange(slot.time)}
                disabled={!slot.available}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Additional Notes:</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any specific concerns?"
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">Book Appointment</button>
      </form>
    </div>
  );
};

export default BookAppointments;