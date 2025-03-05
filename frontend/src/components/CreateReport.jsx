// src/components/CreateReport.js
import React, { useState } from 'react';
import axios from 'axios';
import './CreateReport.css'; // Import the styling

const CreateReport = () => {
  const [report, setReport] = useState({
    staffName: '',
    date: '',
    department: '',
    taskAccomplished: '',
    issues: '',
    pendingTasks: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReport((prevReport) => ({
      ...prevReport,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //https://highbridge-api-2.onrender.com/api/reports'

    axios.post('https://highbridge-api-12.onrender.com/api/reports', report)
      .then((response) => {
        alert(response.data.message);
        setReport({
          staffName: '',
          date: '',
          department: '',
          taskAccomplished: '',
          issues: '',
          pendingTasks: '',
        });
      })
      .catch((error) => {
        alert('Error submitting report');
        console.log(error);
      });
  };

  return (
    <div className="create-report-container">
      <img src="/assets/images/logo/highbridge2.png" alt="Highbridge Homes Logo" />
      <h2 style={{ color: '#ffffff' }}>Create a New Report</h2>
      <form onSubmit={handleSubmit} className="report-form">
        <label>Staff Name:
          <input
            type="text"
            name="staffName"
            value={report.staffName}
            onChange={handleChange}
            required
          />
        </label>

        <label>Date:
          <input
            type="date"
            name="date"
            value={report.date}
            onChange={handleChange}
            required
          />
        </label>

        <label>Department:
          <input
            type="text"
            name="department"
            value={report.department}
            onChange={handleChange}
            required
          />
        </label>

        <label>Task Accomplished:
          <textarea
            name="taskAccomplished"
            value={report.taskAccomplished}
            onChange={handleChange}
            required
          />
        </label>

        <label>Issues/Challenges:
          <textarea
            name="issues"
            value={report.issues}
            onChange={handleChange}
            required
          />
        </label>

        <label>Pending Tasks:
          <textarea
            name="pendingTasks"
            value={report.pendingTasks}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="submit-btn">Submit Report</button>
      </form>
    </div>
  );
};

export default CreateReport;