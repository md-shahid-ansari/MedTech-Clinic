import './DoctorDashboard.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IsDoctorSessionLive } from '../utils/IsDoctorSessionLive';
import { useNavigate } from 'react-router-dom';

const URL = process.env.REACT_APP_BACKEND_URL;

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rescheduleId, setRescheduleId] = useState(null);
  const [cancelId, setCancelId] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentHistory, setAppointmentHistory] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const authenticateAndFetchAppointments = async () => {
      const { isAuthenticated, doctorData } = await IsDoctorSessionLive();

      if (!isAuthenticated) {
        setError('You are not authenticated. Please log in again.');
        navigate('/doctor-login');
        setLoading(false);
        return;
      }
      setDoctor(doctorData);
    };

    authenticateAndFetchAppointments();
  }, [navigate]);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!doctor) return;

      try {
        const response = await axios.post(`${URL}/api/auth/fetch-appointments`);

        if (response.data.success) {
          let temp = response.data.appointment;
          temp = temp.filter((t) => t.doctor === doctor._id);
          setAppointments(temp);
          setAppointmentHistory(temp);
        } else {
          setError(response.data.message || 'Failed to fetch appointments');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong while fetching appointments.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [doctor]);

  const handleCardClick = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleDateChange = (appointmentId, event) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);

    const appointment = appointments.find(app => app._id === appointmentId);
    if (!appointment) return;

    if (doctor.availability.dateUnavailable.includes(selectedDate)) {
      setAvailableTimeSlots([]);
      return;
    }

    const timeSlots = doctor.availability.timeSlots.filter(slot => {
      return !appointmentHistory.some(his => {
        const appointmentDateOnly = new Date(his.appointmentDate).toISOString().split('T')[0];
        return his.doctor === doctor._id &&
               appointmentDateOnly === selectedDate &&
               his.timeSlot === slot &&
               his.status !== "Cancelled";
      });
    });

    setAvailableTimeSlots(timeSlots.map(slot => ({ time: slot, selected: false })));
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    const updatedTimeSlots = availableTimeSlots.map(slot => ({
      ...slot,
      selected: slot.time === time
    }));
    setAvailableTimeSlots(updatedTimeSlots);
  };

  const handleCancel = (appointmentId) => {
    setCancelId(appointmentId);
  };

  const confirmCancel = async () => {
    try {
      const response = await axios.post(`${URL}/api/auth/cancel-appointment`, {
        appointmentId: cancelId
      });

      if (response.data.success) {
        setAppointments(prevAppointments =>
          prevAppointments.map(app => app._id === cancelId ? { ...app, status: 'Cancelled' } : app)
        );
      } else {
        setError(response.data.message || 'Unable to cancel appointment. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Something went wrong. Please try again.');
    }
    
    setCancelId(null);
    setTimeout(() => setError(null), 3000);
  };

  const handleReschedule = (appointmentId) => {
    setRescheduleId(appointmentId);
  };

  const confirmReschedule = async () => {
    try {
      const response = await axios.post(`${URL}/api/auth/reschedule-appointment`, {
        appointmentId: rescheduleId,
        newDate: selectedDate,
        newTime: selectedTime
      });

      if (response.data.success) {
        setAppointments(prevAppointments =>
          prevAppointments.map(app =>
            app._id === rescheduleId
              ? { ...app, status: "Rescheduled", appointmentDate: selectedDate, timeSlot: selectedTime }
              : app
          )
        );
      } else {
        setError(response.data.message || 'Unable to reschedule appointment. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Something went wrong. Please try again.');
    }
    
    setRescheduleId(null);
    setTimeout(() => setError(null), 3000);
  };

  // Medication state management
  const [medications, setMedications] = useState([]);
  const [medication, setMedication] = useState({
    medicineName: '',
    dosage: '',
    form: '',
    frequency: '',
    duration: '',
    route: '',
    specialInstructions: ''
  });
  const [diagnosis, setDiagnosis] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [isEmergency, setIsEmergency] = useState(false);
  const [loadingPresSub, setLoadingPresSub] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedication((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const addMedication = () => {
    setMedications([...medications, medication]);
    setMedication({
      medicineName: '',
      dosage: '',
      form: '',
      frequency: '',
      duration: '',
      route: '',
      specialInstructions: ''
    });
  };

  const handleSubmit = async () => {
    setLoadingPresSub(true);
    const prescriptionData = {
      appointmentId: selectedAppointment._id,
      patientId: selectedAppointment.patient._id,
      doctorId: doctor._id,
      medications: medications,
      diagnosis: diagnosis,
      isEmergency: isEmergency,
      followUpDate: new Date(followUpDate)
    };
    
    try {
      const response = await axios.post(`${URL}/api/auth/create-prescription`, prescriptionData);
      if (response.data.success) {
        setError(response.data.message || 'Prescription submitted successfully');
      } else {
        setError(response.data.message || 'Error submitting prescription');
      }
    } catch (error) {
      console.error('Error submitting prescription:', error);
      setError(error.message || 'Error submitting prescription');
    }
    setLoadingPresSub(false);
  };

  return (
    <div className="doctor-dashboard-container">
      <h1>Doctor Dashboard</h1>
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Loading appointments...</p>
      ) : (
        <div className="appointments-section">
          <h2>Appointments</h2>
          <div className="appointments-cards-horizontal">
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className={`appointment-card ${appointment.status.toLowerCase()}`}
                  onClick={() => handleCardClick(appointment)}
                >
                  <h3>{appointment.patient.name + ' ID:' + appointment.patient.patientId}</h3>
                  <p>{new Date(appointment.appointmentDate).toLocaleDateString()} at {appointment.timeSlot}</p>
                  <p>Status: {appointment.status}</p>
                </div>
              ))
            ) : (
              <p>No appointments available</p>
            )}
          </div>
        </div>
      )}

      {selectedAppointment && (
        <div className="appointment-details">
          <h2>Details for {selectedAppointment.patient.name + ' ID:' + selectedAppointment.patient.patientId}</h2>
          <p>Date: {new Date(selectedAppointment.appointmentDate).toLocaleDateString()} at {selectedAppointment.timeSlot}</p>
          <p>Status: {selectedAppointment.status}</p>

          {/* Action Sections */}

          <div className="details-section">

            <h3>Test Results</h3>
            <p>Test Result 1: Sample Data</p>
            <p>Test Result 2: Sample Data</p>
          </div>


          <div className="details-section prescription-section">
            <h3>Write Prescription</h3>
            <div className="medication-form">
              <div>
                <input
                  type="text"
                  name="medicineName"
                  placeholder="Medicine Name"
                  value={medication.medicineName}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="dosage"
                  placeholder="Dosage"
                  value={medication.dosage}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="form"
                  placeholder="Form (e.g., tablet, syrup)"
                  value={medication.form}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="frequency"
                  placeholder="Frequency (e.g., twice a day)"
                  value={medication.frequency}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="duration"
                  placeholder="Duration (e.g., 7 days)"
                  value={medication.duration}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="route"
                  placeholder="Route (e.g., oral)"
                  value={medication.route}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="specialInstructions"
                  placeholder="Special Instructions"
                  value={medication.specialInstructions}
                  onChange={handleInputChange}
                />
                <button onClick={addMedication}>Add Medication</button>
              </div>
            </div>

            {/* Display Medications in a Table */}
            {medications.length > 0 && (
              <table className="medications-table">
                <thead>
                  <tr>
                    <th>Medicine Name</th>
                    <th>Dosage</th>
                    <th>Form</th>
                    <th>Frequency</th>
                    <th>Duration</th>
                    <th>Route</th>
                    <th>Special Instructions</th>
                  </tr>
                </thead>
                <tbody>
                  {medications.map((med, index) => (
                    <tr key={index}>
                      <td>{med.medicineName}</td>
                      <td>{med.dosage}</td>
                      <td>{med.form}</td>
                      <td>{med.frequency}</td>
                      <td>{med.duration}</td>
                      <td>{med.route}</td>
                      <td>{med.specialInstructions || 'None'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <div className="prescription-details">
              <textarea
                placeholder="Enter diagnosis"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
              />
              <div>
                <label>Is Emergency: </label>
                <input
                  type="checkbox"
                  checked={isEmergency}
                  onChange={(e) => setIsEmergency(e.target.checked)}
                />
              </div>
              <input
                type="date"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                placeholder="Follow-up Date"
              />
            </div>

            <button onClick={handleSubmit} disabled={loadingPresSub}>
              {loadingPresSub ? 'Submitting...' : 'Submit Prescription'}
            </button>
          </div>

          <div className="details-section">
            <h3>Make Bill</h3>
            <input type="text" placeholder="Enter bill amount" />
            <button>Submit Bill</button>
          </div>

          <div className="details-section">
            <h3>Actions</h3>
            <button>Mark as Consulted</button>
            <button>View Medical Records</button>
            <button className="action-btn" onClick={() => handleReschedule(selectedAppointment._id)}>Reschedule Appointment</button>
            <button className="action-btn" onClick={() => handleCancel(selectedAppointment._id)}>Cancel Appointment</button>
          </div>

          
        </div>
      )}

      {/* Popup for Reschedule and Cancel */}
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
                onChange={(e) => handleDateChange(rescheduleId, e)}
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
                      onClick={() => handleTimeChange(slot.time)}
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

export default DoctorDashboard;
