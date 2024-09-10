import React from 'react';
import './TestResults.css';

const TestResults = () => {
  // Sample test results data
  const testResults = [
    { date: "2024-08-10", testName: "Blood Test", result: "Normal", file: "View Report" },
    { date: "2024-08-20", testName: "X-Ray", result: "Clear", file: "View Report" },
    // Add more test results as needed
  ];

  return (
    <div className="test-results-container">
      <h1>Test Results</h1>
      <p>Here you can view and download your test results.</p>
      
      <div className="results-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Test Name</th>
              <th>Result</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            {testResults.map((result, index) => (
              <tr key={index}>
                <td>{result.date}</td>
                <td>{result.testName}</td>
                <td>{result.result}</td>
                <td>
                  <a href="/" className="download-link">
                    {result.file}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestResults;