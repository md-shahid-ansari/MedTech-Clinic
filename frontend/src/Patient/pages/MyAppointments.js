import React, { useEffect, useState } from 'react';
import './MyAppointments.css';
import axios from 'axios';
import { IsPatientSessionLive } from '../utils/IsPatientSessionLive';
import { useNavigate } from 'react-router-dom';

const URL = process.env.REACT_APP_BACKEND_URL;

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [rescheduleId, setRescheduleId] = useState(null);
  const [cancelId, setCancelId] = useState(null); // To handle cancel confirmation
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patientData, setPatientData] = useState(null);
  const [appointmentHistory, setAppointmentHistory] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

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

    fetchAppoinments();
    fetchDoctors();
    authenticateAndFetchAppointments();
  }, []);


  const getDoctorName = (id) => {
    const d = doctors.find((doctor) => doctor._id === id);
    return d.name + ' ID:' + d.doctorId;
  }


  // Handle date change
const handleDateChange = (appointmentId) => {
  const selectedDate = appointmentId.target.value;
  console.log(appointmentId.target.value)
  setSelectedDate(selectedDate);

  const doctorId = appointments.find(app => {
    if (app._id === appointmentId){
      return app.doctor
    }
  })

  const doctor = doctors.find(doc => doc.doctorId == doctorId);
  if (doctor) {
    // Assuming selectedDate is in YYYY-MM-DD format and doctor.availability.dateUnavailable contains dates in the same format
    if (!doctor.availability.dateUnavailable.includes(selectedDate)) {
      let timeSlots = doctor.availability.timeSlots.map(slot => ({
        time: slot, 
        selected: false
      }));

      timeSlots = timeSlots.filter(slot => {
        // Check if any entry in appointmentHistory matches the selected criteria
        return !appointmentHistory.some(his => {
          // Extract only the yyyy-mm-dd part from his.appointmentDate
          const appointmentDateOnly = new Date(his.appointmentDate).toISOString().split('T')[0];
          const id = doctor._id;
          // Compare doctor, date, and timeSlot
          return his.doctor === id && 
                 appointmentDateOnly === selectedDate && 
                 his.timeSlot === slot.time;
        });
      });
       

      setAvailableTimeSlots(timeSlots);
    }
  }
};


  // Handle time slot selection
  const handleTimeChange = (time) => {
    setSelectedTime(time);

    const updatedTimeSlots = availableTimeSlots.map(slot => ({
      ...slot,
      selected: slot.time === time // Mark the selected time slot
    }));
    setAvailableTimeSlots(updatedTimeSlots);
  };

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
                <td>{getDoctorName(appointment.doctor)}</td>
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
            <div className="form-group">
              <label htmlFor="date">Select Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={selectedDate}
                onChange={handleDateChange(rescheduleId)}
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
            <button className="confirm-button" onClick={confirmReschedule}>Confirm</button>
            <button className="cancel-button" onClick={() => setRescheduleId(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
