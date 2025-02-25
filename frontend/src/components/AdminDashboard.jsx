import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [kycRequests, setKycRequests] = useState([]);
  const [selectedKYC, setSelectedKYC] = useState(null);
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchKYCRequests();
    fetchInvestments();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://highbridge-api-9.onrender.com/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Ensure response data is an array and includes referral fields
      setUsers(Array.isArray(response.data) 
      ? response.data.map(user => ({
          id: user._id || "N/A",  // Ensure `_id` exists
          name: user.name || "N/A",
          email: user.email || "N/A",
          referralCode: user.referralCode || "N/A",
          referer: user.referer || "N/A",
        }))
      : []
  );
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchKYCRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://highbridge-api-9.onrender.com/api/admin/kyc-requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("[KYC DATA]", response.data); // Debugging log
      setKycRequests(Array.isArray(response.data) ? response.data.filter(user => user?.kycData?.residentialAddress) : []);
    } catch (error) {
      console.error("Error fetching KYC requests:", error);
      setKycRequests([]);
    }
  };

  const fetchInvestments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://highbridge-api-9.onrender.com/api/admin/investments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInvestments(response.data || []);
    } catch (error) {
      console.error("Error fetching investments:", error);
      setInvestments([]);
    }
  };

  
  
  const handleApproveKYC = async (userId, status) => {
    try {
        const token = localStorage.getItem("token");
        await axios.patch(`https://highbridge-api-9.onrender.com/api/admin/kyc/${userId}`, 
            { status }, 
            { headers: { Authorization: `Bearer ${token}` } }
        );

        alert(`KYC ${status} successfully!`);
        fetchKYCRequests(); // Refresh KYC list after updating
    } catch (error) {
        console.error("Error updating KYC status:", error);
        alert("Failed to update KYC status. Please try again.");
    }
};
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };


  const printKYC = () => {
    window.print(); // Opens print preview
  };

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-content">
        <h1>Admin Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>

        <section>
        <h2 style={{ color: 'black' }}>Users</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table>
             <thead>
  <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Email</th>
    <th>Referral Code</th>
    <th>Referred By</th>
    <th>Actions</th>
  </tr>
</thead>
              <tbody>
              {users.map(user => (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.referralCode}</td>
      <td>{user.referer}</td>
      <td>
        <button onClick={() => setSelectedKYC(user)}>View KYC</button>
      </td>
    </tr>
  ))}
              </tbody>
            </table>
          )}
        </section>

        {selectedKYC && (
  <div className="kyc-modal">
    <div className="kyc-modal-content" id="kyc-print-content">
      
      {/* Hero Image */}
      <img src="/assets/images/hero/subscrptionimage.jpg" alt="KYC Banner" className="kyc-hero" />

      <h2>KYC Details Subscription Form</h2>
      
      <div className="kyc-data">
        <p><strong>Address:</strong> {selectedKYC.kycData?.residentialAddress || "N/A"}</p>
        <p><strong>Date of Birth:</strong> {selectedKYC.kycData?.dateOfBirth || "N/A"}</p>
        <p><strong>Nationality:</strong> {selectedKYC.kycData?.nationality || "N/A"}</p>
        <p><strong>Marital Status:</strong> {selectedKYC.kycData?.maritalStatus || "N/A"}</p>
        <p><strong>Occupation:</strong> {selectedKYC.kycData?.occupation || "N/A"}</p>
        <p><strong>Place of Work:</strong> {selectedKYC.kycData?.placeOfWork || "N/A"}</p>
        <p><strong>Work Address:</strong> {selectedKYC.kycData?.workAddress || "N/A"}</p>
        <p><strong>ID Document Type:</strong> {selectedKYC.kycData?.idDocumentType || "N/A"}</p>

        {selectedKYC?.kycData?.idDocumentImage && (
  <img
  src={`http://localhost:5000/${selectedKYC.kycData.idDocumentImage.replace(/\\/g, "/")}`}
  alt="Uploaded ID Document"
  style={{ width: "100%", maxHeight: "300px", objectFit: "contain" }}
  onError={(e) => console.error("Image failed to load:", e.target.src)}
/>
)}
        <h3>Next of Kin</h3>
        <p><strong>Name:</strong> {selectedKYC.kycData?.nextOfKin?.name || "N/A"}</p>
        <p><strong>Phone:</strong> {selectedKYC.kycData?.nextOfKin?.phone || "N/A"}</p>
        <p><strong>Relationship:</strong> {selectedKYC.kycData?.nextOfKin?.relationship || "N/A"}</p>
        <p><strong>Address:</strong> {selectedKYC.kycData?.nextOfKin?.address || "N/A"}</p>

        <h3>Bank Details</h3>
        <p><strong>Bank Name:</strong> {selectedKYC.kycData?.bankDetails?.bankName || "N/A"}</p>
        <p><strong>Account Number:</strong> {selectedKYC.kycData?.bankDetails?.accountNumber || "N/A"}</p>
        <p><strong>Account Name:</strong> {selectedKYC.kycData?.bankDetails?.accountName || "N/A"}</p>

        <h3>Corporate Info</h3>
        <p><strong>Corporate Name:</strong> {selectedKYC.kycData?.corporateInfo?.corporateName || "N/A"}</p>
        <p><strong>Corporate Address:</strong> {selectedKYC.kycData?.corporateInfo?.corporateAddress || "N/A"}</p>
        <p><strong>Contact Name:</strong> {selectedKYC.kycData?.corporateInfo?.contactName || "N/A"}</p>
        <p><strong>Correspondence Address:</strong> {selectedKYC.kycData?.corporateInfo?.correspondenceAddress || "N/A"}</p>
        <p><strong>Corporate Phone:</strong> {selectedKYC.kycData?.corporateInfo?.corporatePhone || "N/A"}</p>
        <p><strong>Corporate Email:</strong> {selectedKYC.kycData?.corporateInfo?.corporateEmail || "N/A"}</p>
      </div>

      {/* Buttons */}
      <div className="kyc-buttons">
        <button className="approve-btn" onClick={() => handleApproveKYC(selectedKYC.id, "approved")}>
          ✅ Approve
        </button>
        <button className="reject-btn" onClick={() => handleApproveKYC(selectedKYC.id, "rejected")}>
          ❌ Reject
        </button>
        <button className="print-btn" onClick={printKYC}>
          🖨️ Print KYC
        </button>
        <button className="close-btn" onClick={() => setSelectedKYC(null)}>
          🔲 Close
        </button>
      </div>
    </div>
  </div>
)}
        <section>
          <h2 style={{ color: 'black' }}>Investments</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {investments.length > 0 ? (
                investments.map(investment => (
                  investment.user ? (
                    <tr key={investment.id}>
                      <td>{investment.id}</td>
                      <td>{investment.user.name || "N/A"} ({investment.user.email || "N/A"})</td>
                      <td>${investment.amount}</td>
                    </tr>
                  ) : null
                ))
              ) : (
                <tr>
                  <td colSpan="3">No investments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
