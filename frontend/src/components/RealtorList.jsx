import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RealtorList.css";

const API_BASE_URL = "http://82.29.169.222:5000/api/admin/realtors";

const RealtorList = () => {
  const [realtors, setRealtors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRealtor, setSelectedRealtor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [realtorsPerPage] = useState(10);
  const [highestReferralsPage, setHighestReferralsPage] = useState(1);

  useEffect(() => {
    const fetchRealtors = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage (or context)
        if (!token) {
          setError("Unauthorized: No token found");
          setLoading(false);
          return;
        }
  
        const response = await axios.get(API_BASE_URL, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request headers
          },
        });
  
        setRealtors(response.data);
      } catch (err) {
        setError("Error fetching realtors");
      } finally {
        setLoading(false);
      }
    };
  
    fetchRealtors();
  }, []);


  


  const handleView = (realtor) => {
    setSelectedRealtor(realtor);
  };

  const closePopup = () => {
    setSelectedRealtor(null);
  };

  // Remove duplicates based on Email field
  const removeDuplicates = (data) => {
    const uniqueData = [];
    const seen = new Set();
    for (let realtor of data) {
      if (!seen.has(realtor.Email)) {
        seen.add(realtor.Email);
        uniqueData.push(realtor);
      }
    }
    return uniqueData;
  };

  // Highest Referral Realtors Table Filtered and Sorted
  const highestReferralRealtors = removeDuplicates(realtors)
  .filter(realtor => 
    realtor["No Of Referrals"] > 0 &&
    (realtor.Name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
     realtor.Username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
     realtor.Email?.toLowerCase().includes(searchQuery.toLowerCase()))
  )
  .sort((a, b) => b["No Of Referrals"] - a["No Of Referrals"]);

  const indexOfLastHighestReferral = highestReferralsPage * realtorsPerPage;
  const indexOfFirstHighestReferral = indexOfLastHighestReferral - realtorsPerPage;
  const currentHighestReferrals = highestReferralRealtors.slice(indexOfFirstHighestReferral, indexOfLastHighestReferral);

  const paginateHighestReferrals = (pageNumber) => {
    setHighestReferralsPage(pageNumber);
  };

  const filteredRealtors = realtors.filter((realtor) => {
    const name = realtor.Name ? realtor.Name.toLowerCase() : "";
    const username = realtor.Username ? realtor.Username.toLowerCase() : "";
    const email = realtor.Email ? realtor.Email.toLowerCase() : "";
  
    return (
      name.includes(searchQuery.toLowerCase()) ||
      username.includes(searchQuery.toLowerCase()) ||
      email.includes(searchQuery.toLowerCase())
    );
  });

  const indexOfLastRealtor = currentPage * realtorsPerPage;
  const indexOfFirstRealtor = indexOfLastRealtor - realtorsPerPage;
  const currentRealtors = filteredRealtors.slice(
    indexOfFirstRealtor,
    indexOfLastRealtor
  );

  const totalPages = Math.ceil(filteredRealtors.length / realtorsPerPage);


  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="realtor-list-page">
      
      <div className="realtor-list-container">
      <h2>Realtors List</h2>
      <input
        type="text"
        placeholder="Search by name, username, or email..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />
      {loading ? (
        <p>Loading realtors...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
          <div className="realtor-table-wrapper">
            {/* Highest Referral Realtors Table */}
            <h3>Highest Referrals</h3>
            <table className="realtor-table">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Mobile No</th>
                  <th>Gender</th>
                  <th>DOB</th>
                  <th>Bank Name</th>
                  <th>Account Name</th>
                  <th>Account Number</th>
                  <th>Referral Code</th>
                  <th>Referred By</th>
                  <th>Referral Count</th>
                  <th>Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {currentHighestReferrals.map((realtor, index) => (
                  <tr key={realtor._id}>
                    <td>{(highestReferralsPage - 1) * realtorsPerPage + index + 1}</td>
                    <td>{realtor.Name || "N/A"}</td>
                    <td>{realtor.Username || "N/A"}</td>
                    <td>{realtor.Email || "N/A"}</td>
                    <td>{realtor.Mobile || "N/A"}</td>
                    <td>{realtor.Gender || "N/A"}</td>
                    <td>{realtor["Date Of Birth"] ? formatDate(realtor["Date Of Birth"]) : "N/A"}</td>
                    <td>{realtor["Bank Name"] || "N/A"}</td>
                    <td>{realtor["Account Name"] || "N/A"}</td>
                    <td>{realtor["Account Number"] || "N/A"}</td>
                    <td>{realtor["Referral Code"] || "N/A"}</td>
                    <td>{realtor.Referrer || "N/A"}</td>
                    <td>{realtor["No Of Referrals"] || 0}</td>
                    <td>{realtor["Date & Time"] || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination for Highest Referrals */}
            <div className="pagination">
              <button onClick={() => paginateHighestReferrals(highestReferralsPage - 1)} disabled={highestReferralsPage === 1}>
                Previous
              </button>
              <span>
                Page {highestReferralsPage} of {Math.ceil(highestReferralRealtors.length / realtorsPerPage)}
              </span>
              <button onClick={() => paginateHighestReferrals(highestReferralsPage + 1)} disabled={highestReferralsPage === Math.ceil(highestReferralRealtors.length / realtorsPerPage)}>
                Next
              </button>
            </div>
          </div>
        )}

        {/* Main Realtor Table */}
        <div className="realtor-table-wrapper">
          <h3>All Realtors</h3>
          <table className="realtor-table">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Mobile No</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>Bank Name</th>
                <th>Account Name</th>
                <th>Account Number</th>
                <th>Referral Code</th>
                <th>Referred By</th>
                <th>Referral Count</th>
                <th>Date & Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRealtors.map((realtor, index) => (
                <tr key={realtor._id}>
                  <td>{(currentPage - 1) * realtorsPerPage + index + 1}</td>
                  <td>{realtor.Name || "N/A"}</td>
                  <td>{realtor.Username || "N/A"}</td>
                  <td>{realtor.Email || "N/A"}</td>
                  <td>{realtor.Mobile || "N/A"}</td>
                  <td>{realtor.Gender || "N/A"}</td>
                  <td>{realtor["Date Of Birth"] ? formatDate(realtor["Date Of Birth"]) : "N/A"}</td>
                  <td>{realtor["Bank Name"] || "N/A"}</td>
                  <td>{realtor["Account Name"] || "N/A"}</td>
                  <td>{realtor["Account Number"] || "N/A"}</td>
                  <td>{realtor["Referral Code"] || "N/A"}</td>
                  <td>{realtor.Referrer || "N/A"}</td>
                  <td>{realtor["No Of Referrals"] || 0}</td>
                  <td>{realtor["Date & Time"] || "N/A"}</td>
                  <td>
                    <button className="view-btn" onClick={() => handleView(realtor)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination for Main Table */}
        <div className="pagination">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>

        {/* Realtor Details Pop-up */}
        {selectedRealtor && (
          <div className="popup-overlay" onClick={closePopup}>
            <div className="popup-container" onClick={(e) => e.stopPropagation()}>
              <h3>Realtor Details</h3>
              <p><strong>Name:</strong> {selectedRealtor.Name || "N/A"}</p>
              <p><strong>Email:</strong> {selectedRealtor.Email || "N/A"}</p>
              <p><strong>Username:</strong> {selectedRealtor.Username || "N/A"}</p>
              <p><strong>Referral Count:</strong> {selectedRealtor["No Of Referrals"] || 0}</p>
              <button onClick={closePopup}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealtorList;