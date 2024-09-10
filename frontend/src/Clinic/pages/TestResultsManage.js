import React, { useState } from 'react';
import './TestResultsManage.css';

const TestResultsManage = () => {
  const [testResults, setTestResults] = useState([
    { id: 1, patient: 'John Doe', test: 'Blood Test', date: '2024-09-01', result: 'Normal', notes: 'No issues' },
    { id: 2, patient: 'Jane Doe', test: 'X-Ray', date: '2024-09-02', result: 'Abnormal', notes: 'Further analysis needed' },
    // Add more sample data as needed
  ]);

  const [selectedTest, setSelectedTest] = useState(null);
  const [newResult, setNewResult] = useState('');

  const handleEdit = (test) => {
    setSelectedTest(test);
    setNewResult(test.result);
  };

  const handleSave = () => {
    if (selectedTest) {
      setTestResults(testResults.map(test =>
        test.id === selectedTest.id ? { ...test, result: newResult } : test
      ));
      setSelectedTest(null);
      setNewResult('');
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    // Handle file upload logic here
    console.log('File uploaded');
  };

  return (
    <div className="test-results-manage-container">
      <h1>Test Results Management</h1>

      <div className="upload-section">
        <h2>Upload Test Results</h2>
        <form onSubmit={handleUpload}>
          <input type="file" accept=".pdf,.jpg,.png" />
          <button type="submit" className="upload-btn">Upload</button>
        </form>
      </div>

      <div className="test-results-list">
        <h2>Manage Test Results</h2>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Test</th>
              <th>Date</th>
              <th>Result</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {testResults.map((test) => (
              <tr key={test.id}>
                <td>{test.patient}</td>
                <td>{test.test}</td>
                <td>{test.date}</td>
                <td>
                  {selectedTest?.id === test.id ? (
                    <input
                      type="text"
                      value={newResult}
                      onChange={(e) => setNewResult(e.target.value)}
                    />
                  ) : (
                    test.result
                  )}
                </td>
                <td>{test.notes}</td>
                <td>
                  {selectedTest?.id === test.id ? (
                    <>
                      <button onClick={handleSave} className="save-btn">Save</button>
                      <button onClick={() => setSelectedTest(null)} className="cancel-btn">Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => handleEdit(test)} className="edit-btn">Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestResultsManage;