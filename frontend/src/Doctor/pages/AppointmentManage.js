import './AppointmentManage.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IsDoctorSessionLive } from '../utils/IsDoctorSessionLive';
import { useNavigate } from 'react-router-dom';

const URL = process.env.REACT_APP_BACKEND_URL;

const AppointmentsManage = () => {
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

  // Function to update appointment status
  const handleStatusChange = (id, status) => {
    // Update the appointment status in the database
    try {
      const response = axios.post(`${URL}/api/auth/change-status-appointment`, {
        appointmentId:id,
        status:status
      });

      setAppointments(
        appointments.map((appointment) =>
          appointment._id === id ? { ...appointment, status } : appointment
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

   // Function to update appointment status
   const handleReschedule = (id) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment._id === id ? { ...appointment, status:"Rescheduled"} : appointment
      )
    );
  };

  return (
    <div className="appointments-manage-container">
      <h1>Appointments Management</h1>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.appointmentId}>
              <td>{appointment.patient.name + ' ID' + appointment.patient.patientId}</td>
              <td>{new Date(appointment.appointmentDate).toISOString().split('T')[0]}</td>
              <td>{appointment.timeSlot}</td>
              <td>{appointment.status}</td>
              <td>
                <button
                  className="pending-btn"
                  onClick={() => handleStatusChange(appointment._id, 'Pending')}
                >
                  Pending
                </button>
                <button
                  className="reschedule-btn"
                  onClick={() => handleReschedule(appointment._id)}
                >
                  Reschedule
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => handleStatusChange(appointment._id, 'Cancelled')}
                >
                  Cancel
                </button>
                <button
                  className="confirm-btn"
                  onClick={() => handleStatusChange(appointment._id, 'Confirm')}
                >
                  Confirm
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentsManage;