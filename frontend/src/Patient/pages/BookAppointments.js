import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IsPatientSessionLive } from '../utils/IsPatientSessionLive.js'; // Session validation
import './BookAppointments.css';

const URL = process.env.REACT_APP_BACKEND_URL;

const BookAppointments = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    doctorId: '',
    date: '',
    time: '',
    notes: ''
  });
  const [doctors, setDoctors] = useState([]);
  const [appointmentHistory, setAppointmentHistory] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch doctor list from the backend on component mount
    const fetchDoctors = async () => {
      try {
        const response = await axios.post(`${URL}/api/auth/fetch-doctors`);
        setDoctors(response.data.doctors);
      } catch (err) {
        console.error('Error fetching doctors:', err);
        setError('Unable to fetch doctors. Please try again.');
      }
    };
    //get appointments list to check available slots
    const fetchAppoinments = async () => {
      try {
        const response = await axios.post(`${URL}/api/auth/fetch-appointments`);
        setAppointmentHistory(response.data.appointment);
      } catch (err) {
        console.error('Error fetching appointment:', err);
        setError('Unable to fetch appointment. Please try again.');
      }
    };
    
    fetchDoctors();
    fetchAppoinments();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'doctorId') {
      // Reset time slots when doctor changes
      setAvailableTimeSlots([]);
      setSelectedTime('');
    }
  };

  // Handle date change
const handleDateChange = (e) => {
  const selectedDate = e.target.value;
  setSelectedDate(selectedDate);
  setFormData({
    ...formData,
    date: selectedDate,
  });

  const doctor = doctors.find(doc => doc.doctorId == formData.doctorId);
  if (doctor) {
    // Assuming selectedDate is in YYYY-MM-DD format and doctor.availability.dateUnavailable contains dates in the same format
    if (!doctor.availability.dateUnavailable.includes(selectedDate)) {
      let timeSlots = doctor.availability.timeSlots.map(slot => ({
        time: slot, 
        selected: false
      }));

      // Filter out slots that match any previous appointment for the same doctor on the same date
      timeSlots = timeSlots.filter(slot => {
        return !appointmentHistory.some(his => 
          his.doctorId === formData.doctorId && 
          his.date === selectedDate && 
          his.time === slot.time
        );
      });

      setAvailableTimeSlots(timeSlots);
    }
  }
};


  // Handle time slot selection
  const handleTimeChange = (time) => {
    setSelectedTime(time);
    setFormData((prevFormData) => ({
      ...prevFormData,
      time: time
    }));

    const updatedTimeSlots = availableTimeSlots.map(slot => ({
      ...slot,
      selected: slot.time === time // Mark the selected time slot
    }));
    setAvailableTimeSlots(updatedTimeSlots);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if the patient is authenticated before submitting
    const { isAuthenticated, patientData } = await IsPatientSessionLive();
    if (!isAuthenticated) {
      setError('You are not authenticated. Please log in again.');
      navigate('/patient-login');
      setLoading(false);
      return;
    }

    // Submit appointment data
    try {
      const response = await axios.post(`${URL}/book-appointment`, {
        ...formData,
        // patientId: patientData.patientId
      });

      if (response.data.success) {
        // Redirect appointments
        navigate('/');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error('Error booking appointment:', err);
      setError('Error booking appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-appointment-container">
      <h1>Book an Appointment</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="doctorId">Select Doctor:</label>
          <select
            id="doctorId"
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
          >
            <option value="">--Select--</option>
            {doctors.map((doc) => (
              <option key={doc.doctorId} value={doc.doctorId}>
                {doc.name} (ID: {doc.doctorId}) ({doc.specialty})
              </option>
            ))}
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
            {availableTimeSlots.length > 0 ? (
              availableTimeSlots.map((slot, index) => (
                <button
                  key={index}
                  type="button"
                  className={`time-slot ${slot.selected ? 'selected' : 'unselected'}`}
                  onClick={() => handleTimeChange(slot.time)}  // Use function reference
                >
                  {slot.time}
                </button>
              ))
            ) : (
              <p>No time slots available for the selected date.</p>
            )}
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

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Booking...' : 'Book Appointment'}
        </button>
      </form>
    </div>
  );
};

export default BookAppointments;
