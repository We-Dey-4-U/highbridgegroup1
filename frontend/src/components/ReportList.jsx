import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCommentDots } from "react-icons/fa"; // Import an icon from react-icons
import "./ReportList.css"; // Import the styling

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false); // Toggle state for chatbot

  useEffect(() => {
    axios
      .get("https://highbridge-api-12.onrender.com/api/reports")
      .then((response) => {
        setReports(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reports:", error);
      });
  }, []);

  return (
    <div className="report-list-wrapper">
      {/* Report List Section */}
      <div className="report-list-container">
        <img src="/assets/images/logo/highbridge2.png" alt="Highbridge Homes Logo" />
        <h2 style={{ color: "#ffffff" }}>Staff Weekly Report List</h2>
        <table className="report-table">
          <thead>
            <tr>
              <th>Staff Name</th>
              <th>Date</th>
              <th>Department</th>
              <th>Task Accomplished</th>
              <th>Issues</th>
              <th>Pending Tasks</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report._id}>
                <td>{report.staffName}</td>
                <td>{new Date(report.date).toLocaleDateString()}</td>
                <td>{report.department}</td>
                <td>{report.taskAccomplished}</td>
                <td>{report.issues}</td>
                <td>{report.pendingTasks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chatbot Toggle Button */}
      <button className="chatbot-toggle" onClick={() => setIsChatOpen(!isChatOpen)}>
        <FaCommentDots />
      </button>

      {/* Chatbot Section */}
      <div className={`chatbot-container ${isChatOpen ? "active" : ""}`}>
        <iframe
          src="https://www.chatbase.co/chatbot-iframe/FB8SoblgMLKD2t3s79q3P"
          width="100%"
          style={{ height: "100%", minHeight: "700px", border: "none" }}
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
};

export default ReportList;