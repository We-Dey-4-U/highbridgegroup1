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
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchKYCRequests();
    fetchInvestments();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://highbridge-api-15.onrender.com/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(Array.isArray(response.data) ? response.data : []);
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
      const response = await axios.get("https://highbridge-api-15.onrender.com/api/admin/kyc-requests", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("[KYC DATA]", response.data); // Debugging log
      setKycRequests(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching KYC requests:", error);
      setKycRequests([]);
    }
  };

  const fetchInvestments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://highbridge-api-15.onrender.com/api/admin/investments", {
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
      await axios.patch(`https://highbridge-api-15.onrender.com/api/admin/kyc/${userId}`, 
        { status }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(`KYC ${status} successfully!`);
      fetchKYCRequests();
    } catch (error) {
      console.error("Error updating KYC status:", error);
      alert("Failed to update KYC status. Please try again.");
    }
  };



  const handleApprovePayment = async (investmentId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://highbridge-api-15.onrender.com/api/admin/approve-payment/${investmentId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      alert(response.data.message || "Payment approved successfully!");
      fetchInvestments(); // Refresh investments list
    } catch (error) {
      console.error("Error approving payment:", error);
      alert(error.response?.data?.message || "Failed to approve payment. Please try again.");
    }
  };




  const handleDeleteInvestment = async (investmentId) => {
    if (!window.confirm("Are you sure you want to delete this investment?")) return;
  
    try {
      const token = localStorage.getItem("token"); // Add this line to retrieve token
      const response = await fetch(`https://highbridge-api-15.onrender.com/api/admin/investments/${investmentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Use the retrieved token
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert(data.message);
        setInvestments((prev) => prev.filter((inv) => inv._id !== investmentId));
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error deleting investment:", error);
      alert("Server error, try again later.");
    }
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };


   // Pagination Logic
   const indexOfLastUser = currentPage * usersPerPage;
   const indexOfFirstUser = indexOfLastUser - usersPerPage;
   const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
   const totalPages = Math.ceil(users.length / usersPerPage);

  const printKYC = () => {
    window.print();
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
    <div className="table-container">
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
       {/* Pagination Controls */}
       {totalPages > 1 && (
                <div className="pagination">
                  <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
                  <span>Page {currentPage} of {totalPages}</span>
                  <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                </div>
              )}
    </div>
  )}
</section>





        {selectedKYC && (
  <div className="kyc-modal">
    <div className="kyc-modal-content" id="kyc-print-content">
      
      {/* Hero Image */}
      <img src="/assets/images/hero/subscrptionimage.jpg" alt="KYC Banner" className="kyc-hero" />

    
      
      <h2>KYC Details Subscription Form</h2>

      {/* Passport Image Box */}

      {selectedKYC?.kycData?.passportImage && (
                <div className="passport-box" style={{ textAlign: "center", marginBottom: "10px" }}>
                  <img
                    src={`https://highbridge-api-15.onrender.com/${selectedKYC.kycData.passportImage.replace(/\\/g, "/")}`}
                    alt="Passport"
                    style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "5px", border: "1px solid #ccc" }}
                    onError={(e) => console.error("Passport image failed to load:", e.target.src)}
                  />
                </div>
              )}
      
      <div className="kyc-data">
      <p><strong>Name:</strong> {selectedKYC?.name || "N/A"}</p>
      <p><strong>Email:</strong> {selectedKYC?.email || "N/A"}</p>
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
  src={`https://highbridge-api-15.onrender.com/${selectedKYC.kycData.idDocumentImage.replace(/\\/g, "/")}`}
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
  <h2>Investments</h2>
  {loading ? (
    <p>Loading...</p>
  ) : (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Amount</th>
            <th>Plan</th>
            <th>Start Date</th>
            <th>Maturity Date</th>
            <th>Expected Returns</th>
            <th>Status</th>
            <th>Payment Method</th>
            <th>Receipt</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {investments.map((investment) => (
            <tr key={investment._id}>
              <td>{investment._id}</td>
              <td>{investment.user?.name || "N/A"}</td>
              <td>₦{investment.amount}</td>
              <td>{investment.plan}</td>
              <td>{new Date(investment.startDate).toLocaleDateString()}</td>
              <td>{new Date(investment.maturityDate).toLocaleDateString()}</td>
              <td>₦{investment.expectedReturns}</td>
              <td>{investment.status}</td>
              <td>{investment.paymentMethod}</td>
              <td>
                {investment.paymentMethod === "manual" && investment.receipt ? (
                  <a
                    href={investment.receipt.startsWith("http") ? investment.receipt : `https://highbridge-api-15.onrender.com${investment.receipt}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Receipt
                  </a>
                ) : (
                  "N/A"
                )}
              </td>
              <td>
  {investment.status === "Pending" && investment.paymentMethod === "manual" && (
    <>
      <button onClick={() => handleApprovePayment(investment._id)}>Approve</button>
      <button onClick={() => handleDeleteInvestment(investment._id)} className="delete-btn">Delete</button>
    </>
  )}
</td>
            </tr>
          ))}
        </tbody>
      </table>
       {/* Pagination Controls */}
       {totalPages > 1 && (
                <div className="pagination">
                  <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
                  <span>Page {currentPage} of {totalPages}</span>
                  <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                </div>
              )}
    </div>
  )}
</section>
      </div>
    </div>
  );
};

export default AdminDashboard;
