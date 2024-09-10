import React, { useState } from 'react';
import './DoctorLogin.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const URL = 'http://localhost:5000';

const DoctorLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);  // State to manage error messages
  const [loadingLogin, setLoadingLogin] = useState(false);  // State to manage loading state
  const [loadingForgot, setLoadingForgot] = useState(false);  // State to manage loading state

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingLogin(true);
    setError(null);

    try {
      const response = await axios.post(`${URL}/api/auth/doctor-login`, {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        // Logined successfully, navigate to home page
        navigate('/doctor-home');
      } else {
          // Handle error case
          setError(response.data.message || 'Login failed.');
      }
    } catch (err) {
      // Handle different error cases
      if (err.response) {
        setError(err.response.data.message || 'Something went wrong.');
      } else {
        setError('Server is not responding.');
      }
    } finally {
      setLoadingLogin(false);
    }
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    setLoadingForgot(true);
    setError(null);

    try {
      const response = await axios.post(`${URL}/api/auth/doctor-forgot`, {
        email: formData.email
      });

      if (!response.data.success) {
        // Handle error case
        setError(response.data.message || 'Reset link sent failed.');
      } else {
        setError(response.data.message || 'Reset link sent Successfully.');
      }
    } catch (err) {
      // Handle different error cases
      if (err.response) {
        setError(err.response.data.message || 'Something went wrong.');
      } else {
        setError('Server is not responding.');
      }
    } finally {
      setLoadingForgot(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Doctor Login</h2>
      <button><Link to="/">Home</Link></button>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="button" className="forgot-btn" disabled={loadingForgot} onClick={handleForgot}>
          {loadingForgot ? 'Sending reset link...' : 'Forgot?'}
        </button>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="login-btn" disabled={loadingLogin}>
          {loadingLogin ? 'Logging in...' : 'Login'}
        </button>
        <p><Link to="/doctor-register">Not registered? Click here to register!</Link></p>
      </form>
    </div>
  );
};

export default DoctorLogin;
