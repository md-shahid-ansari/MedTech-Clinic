import React, { useEffect, useState } from 'react';
import './MyAppointments.css';
import axios from 'axios';
import { IsPatientSessionLive } from '../utils/IsPatientSessionLive';
import { useNavigate } from 'react-router-dom';

const URL = process.env.REACT_APP_BACKEND_URL;

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [rescheduleId, setRescheduleId] = useState(null);
  const [cancelId, setCancelId] = useState(null); // To handle cancel confirmation
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patientData, setPatientData] = useState(null);

  const navigate = useNavigate();

  // Fetch appointments after patient authentication
  useEffect(() => {
    const authenticateAndFetchAppointments = async () => {
      const { isAuthenticated, patientData } = await IsPatientSessionLive();
      
      if (!isAuthenticated) {
        setError('You are not authenticated. Please log in again.');
        navigate('/patient-login');
        setLoading(false);
        return;
      }

      setPatientData(patientData);

      // Fetch appointments after patient data is set
      if (patientData && patientData._id) {
        try {
          const response = await axios.post(`${URL}/api/auth/fetch-my-appointments`, {
            patientId: patientData._id,
          });
          
          if (response.data.success) {
            setAppointments(response.data.appointments);
          } else {
            setError('Failed to fetch appointments');
          }
        } catch (error) {
          setError('Error fetching appointments');
          console.error(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    authenticateAndFetchAppointments();
  }, [patientData, navigate]);

  // Handle cancel confirmation
  const handleCancel = (appointmentId) => {
    // Show cancel confirmation popup
    setCancelId(appointmentId);
  };

  const confirmCancel = () => {
    // Remove appointment from list after cancel confirmation
    setAppointments(prevAppointments => prevAppointments.filter(app => app._id !== cancelId));
    setCancelId(null); // Close the popup
  };

  const handleReschedule = (appointmentId) => {
    // Open the reschedule popup for this appointment
    setRescheduleId(appointmentId);
  };

  const confirmReschedule = () => {
    if (newDate && newTime) {
      setAppointments(prevAppointments =>
        prevAppointments.map(app =>
          app._id === rescheduleId
            ? { ...app, appointmentDate: newDate, timeSlot: newTime }
            : app
        )
      );
      setRescheduleId(null); // Close the popup
    } else {
      alert('Please select both a date and time to reschedule.');
    }
  };

  return (
    <div className="appointments-container">
      <h1>My Appointments</h1>

      {loading && <p>Loading appointments...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.doctor}</td>
                <td>{appointment.appointmentDate}</td>
                <td>{appointment.timeSlot}</td>
                <td>{appointment.status}</td>
                <td>
                  <button className="cancel-button" onClick={() => handleCancel(appointment._id)}>Cancel</button>
                  <button className="reschedule-button" onClick={() => handleReschedule(appointment._id)}>Reschedule</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Cancel Confirmation Popup */}
      {cancelId && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Confirm Cancellation</h2>
            <p>Are you sure you want to cancel this appointment?</p>
            <button className="confirm-button" onClick={confirmCancel}>Yes, Cancel</button>
            <button className="cancel-button" onClick={() => setCancelId(null)}>No, Go Back</button>
          </div>
        </div>
      )}

      {/* Reschedule Popup */}
      {rescheduleId && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Reschedule Appointment</h2>
            <div>
              <label>Select New Date:</label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />
            </div>
            <div>
              <label>Select New Time:</label>
              <select value={newTime} onChange={(e) => setNewTime(e.target.value)}>
                <option value="">Select a time slot</option>
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="13:00">01:00 PM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:00">03:00 PM</option>
              </select>
            </div>
            <button className="confirm-button" onClick={confirmReschedule}>Confirm</button>
            <button className="cancel-button" onClick={() => setRescheduleId(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
