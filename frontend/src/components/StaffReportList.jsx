import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StaffReportList.css';

const StaffReportList = () => {
  const [staffReports, setStaffReports] = useState([]);
  const [timeOutValues, setTimeOutValues] = useState({});
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 12;

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentDateTime(now.toLocaleString('en-NG', { timeZone: 'Africa/Lagos' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    axios.get('http://82.29.169.222:5000/api/staff-reports/staff-reports')
      .then((response) => {
        setStaffReports(response.data);

        // Initialize timeOutValues with existing timeOut data
        const initialTimeOutValues = response.data.reduce((acc, report) => {
          acc[report._id] = report.timeOut || ''; // Keep the existing value if available
          return acc;
        }, {});
        setTimeOutValues(initialTimeOutValues);
      })
      .catch((error) => {
        console.error('Error fetching staff reports:', error);
      });
  }, []);

  const formatTime = (time) => {
    if (!time) return 'N/A';
    return new Date(`1970-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleTimeOutChange = (reportId, value) => {
    setTimeOutValues((prev) => ({
      ...prev,
      [reportId]: value,
    }));
  };

  const handleTimeOutSubmit = async (reportId) => {
    try {
      if (!timeOutValues[reportId]) {
        alert('Please enter a valid Time Out');
        return;
      }

      await axios.put(`http://82.29.169.222:5000/api/staff-reports/staff-reports/${reportId}`, {
        timeOut: timeOutValues[reportId],
      });

      // Persist the saved Time Out value in staffReports state
      const updatedReports = staffReports.map((report) =>
        report._id === reportId ? { ...report, timeOut: timeOutValues[reportId] } : report
      );
      setStaffReports(updatedReports);

      alert('TimeOut recorded successfully!');
    } catch (error) {
      console.error('Error updating timeOut:', error);
      alert('Failed to record TimeOut!');
    }
  };

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = staffReports.slice(indexOfFirstReport, indexOfLastReport);

  return (
    <div className="staff-report-list-container">
      <div style={styles.dateTimeContainer}>
        <h3 style={styles.dateTimeHeading}>Current Date & Time</h3>
        <p style={styles.dateTimeText}>{currentDateTime}</p>
      </div>

      <img src="/assets/images/logo/highbridge2.png" alt="Highbridge Homes Logo" />
      <h2 style={{ color: '#ffffff' }}>Staff Attendance Report List</h2>
      <table className="staff-report-table">
        <thead>
          <tr>
            <th>Serial No (SN)</th>
            <th>Staff Image</th> {/* Added this column */}
            <th>Staff Name</th>
            <th>Date</th>
            <th>Branch</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Private Note</th>
            <th>Time In</th>
            <th>Time Out</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
  {currentReports.map((report) => (
    <tr key={report._id}>
      <td>{report.sn}</td>
      <td>
        {report.image ? (
          <img
            src={`http://82.29.169.222:5000/${report.image}`}
            alt="Staff"
            style={{ width: '100px', height: '100px', borderRadius: '70%' }}
          />
        ) : (
          <span>No Image</span>
        )}
      </td>
      <td>{report.name}</td>
      <td>{new Date(report.date).toLocaleDateString('en-NG', { timeZone: 'Africa/Lagos' })}</td>
      <td>{report.branch}</td>
      <td>{report.email}</td>
      <td>{report.mobileNumber}</td>
      <td>{report.privateNote}</td>
      <td>{formatTime(report.timeIn)}</td>
      <td>
        <input
          type="time"
          value={timeOutValues[report._id] || ''}
          onChange={(e) => handleTimeOutChange(report._id, e.target.value)}
        />
      </td>
      <td>
        <button onClick={() => handleTimeOutSubmit(report._id)}>Save TimeOut</button>
      </td>
    </tr>
  ))}
</tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prev) =>
            Math.min(prev + 1, Math.ceil(staffReports.length / reportsPerPage))
          )}
          disabled={currentPage === Math.ceil(staffReports.length / reportsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const styles = {
  dateTimeContainer: {
    backgroundColor: '#2D3748',
    padding: '15px 20px',
    borderRadius: '8px',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#fff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  dateTimeHeading: {
    fontSize: '1.5rem',
    margin: '0 0 5px',
    fontWeight: 'bold',
  },
  dateTimeText: {
    fontSize: '1.2rem',
    margin: 0,
  },
};

export default StaffReportList;