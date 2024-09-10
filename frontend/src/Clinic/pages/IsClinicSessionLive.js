import axios from 'axios';

const URL = 'http://localhost:5000'; // Replace with your actual backend URL

export const isClinicSessionLive = async () => {
  try {
    const response = await axios.post(`${URL}/api/auth/clinic-auth`, {}, {
      withCredentials: true, // Include credentials (cookies)
    });

    if (response.data.success) {
      // The session is live
      return true;
    } else {
      // The session is not live
      return false;
    }
  } catch (err) {
    // If there's an error, we assume the session is not live
    console.error('Error checking session:', err);
    return false;
  }
};
