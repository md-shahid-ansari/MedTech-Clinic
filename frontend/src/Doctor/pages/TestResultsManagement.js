import React, { useState } from 'react';
import './TestResultsManagement.css';

const TestResultsManagement = () => {
  const [testResults, setTestResults] = useState([
    // Sample data
    { id: 1, patient: 'John Doe', date: '2024-09-01', result: 'Blood Test', remarks: 'Normal' },
    { id: 2, patient: 'Jane Smith', date: '2024-09-02', result: 'X-Ray', remarks: 'Pending review' },
  ]);

  const [newResult, setNewResult] = useState({
    patient: '',
    date: '',
    result: '',
    remarks: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setNewResult({
      ...newResult,
      [name]: name === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate adding a new test result
    setTestResults([...testResults, { ...newResult, id: testResults.length + 1 }]);
    setNewResult({ patient: '', date: '', result: '', remarks: '', file: null });
  };

  return (
    <div className="test-results-management-container">
      <h1>Test Results Management</h1>
      
      <div className="upload-form-container">
        <h3>Upload New Test Result</h3>
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="form-group">
            <label htmlFor="patient">Patient Name:</label>
            <input
              type="text"
              id="patient"
              name="patient"
              value={newResult.patient}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={newResult.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="result">Test Result Description:</label>
            <input
              type="text"
              id="result"
              name="result"
              value={newResult.result}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="remarks">Remarks:</label>
            <textarea
              id="remarks"
              name="remarks"
              value={newResult.remarks}
              onChange={handleChange}
              placeholder="Additional remarks"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="file">Upload File:</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleChange}
              accept=".pdf,.jpg,.png,.doc,.docx"
            />
          </div>

          <button type="submit" className="submit-btn">Upload Result</button>
        </form>
      </div>

      <div className="test-results-list">
        <h3>Existing Test Results</h3>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Result</th>
              <th>Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {testResults.map((result) => (
              <tr key={result.id}>
                <td>{result.patient}</td>
                <td>{result.date}</td>
                <td>{result.result}</td>
                <td>{result.remarks}</td>
                <td>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestResultsManagement;