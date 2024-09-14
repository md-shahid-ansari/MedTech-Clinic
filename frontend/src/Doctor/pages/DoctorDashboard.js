import './DoctorDashboard.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IsDoctorSessionLive } from '../utils/IsDoctorSessionLive';
import { useNavigate } from 'react-router-dom';

const URL = process.env.REACT_APP_BACKEND_URL;

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctor, setDoctor] = useState(null); // Initially set doctor to null
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popupAction, setPopupAction] = useState(null);

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
      setDoctor(doctorData); // Update the doctor state
    };

    authenticateAndFetchAppointments();
  }, [navigate]);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!doctor) return; // Wait until doctor data is available

      try {
        const response = await axios.post(`${URL}/api/auth/fetch-appointments`);

        if (response.data.success) {
          // Store the appointments from the response
          let temp = response.data.appointment;

          // Filter appointments to include only those for the specified doctor
          temp = temp.filter((t) => t.doctor === doctor._id);

          // Update state with filtered appointments
          setAppointments(temp);
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
  }, [doctor]); // Fetch appointments once the doctor data is set

  const handleCardClick = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleActionClick = (action) => {
    setPopupAction(action); // Set the action type for the popup (e.g., 'Reschedule', 'Cancel')
  };

  const closePopup = () => {
    setPopupAction(null); // Close the popup by resetting the action state
  };

  const renderPopupContent = () => {
    if (!selectedAppointment) return null;

    switch (popupAction) {
      case 'Reschedule':
        return (
          <div className="popup-content">
            <h3>Reschedule Appointment for {selectedAppointment.patient.name}</h3>
            <p>Select a new date and time for the appointment.</p>
            <input type="date" />
            <input type="time" />
            <button>Submit</button>
          </div>
        );
      case 'Cancel':
        return (
          <div className="popup-content">
            <h3>Cancel Appointment</h3>
            <p>Are you sure you want to cancel this appointment?</p>
            <button>Yes, Cancel Appointment</button>
          </div>
        );
      default:
        return null;
    }
  };

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

  // Handle input changes for each medication field
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedication((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle adding a medication
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

  // Handle prescription submission
  const handleSubmit = async () => {
    setLoadingPresSub(true);
    const prescriptionData = {
      appointmentId: selectedAppointment._id,
      patientId: selectedAppointment.patient._id,
      doctorId: doctor._id,
      medications: medications,
      diagnosis: diagnosis,
      isEmergency: isEmergency,
      followUpDate : new Date(followUpDate)
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
            {loadingPresSub ? 'Submiting...' : 'Submit Prescription'}
            </button>
          </div>

          <div className="details-section">
            <h3>View Medical Records</h3>
            <p>Record 1: Sample Data</p>
            <p>Record 2: Sample Data</p>
          </div>

          <div className="details-section">
            <h3>View Test Results</h3>
            <p>Test Result 1: Sample Data</p>
            <p>Test Result 2: Sample Data</p>
          </div>

          <div className="details-section">
            <h3>Make Bill</h3>
            <input type="text" placeholder="Enter bill amount" />
            <button>Submit Bill</button>
          </div>

          <div className="details-section">
            <h3>Mark as Consulted</h3>
            <button>Mark as Consulted</button>
          </div>

          {/* Buttons for Reschedule and Cancel */}
          <div className="actions-container">
            <button className="action-btn" onClick={() => handleActionClick('Reschedule')}>Reschedule</button>
            <button className="action-btn" onClick={() => handleActionClick('Cancel')}>Cancel</button>
          </div>
        </div>
      )}

      {/* Popup for Reschedule and Cancel */}
      {popupAction && (
        <div className="popup-overlay">
          <div className="popup">
            {renderPopupContent()}
            <button className="close-popup-btn" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;