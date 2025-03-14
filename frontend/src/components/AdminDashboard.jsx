import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import axios from "axios";
import "./AdminDashboard.css";
import RealtorList from "./RealtorList";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [kycRequests, setKycRequests] = useState([]);
  const [selectedKYC, setSelectedKYC] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
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
      const response = await axios.get("http://82.29.169.222:5000/api/admin/users", {
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
      const response = await axios.get("http://82.29.169.222:5000/api/admin/kyc-requests", {
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
      const response = await axios.get("http://82.29.169.222:5000/api/admin/investments", {
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
      await axios.patch(`http://82.29.169.222:5000/api/admin/kyc/${userId}`, 
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
        `http://82.29.169.222:5000/api/admin/approve-payment/${investmentId}`,
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
      const response = await fetch(`http://82.29.169.222:5000/api/admin/investments/${investmentId}`, {
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


   // Filter users based on search query (name or email)
 // Pagination Logic
 const indexOfLastUser = currentPage * usersPerPage;
 const indexOfFirstUser = indexOfLastUser - usersPerPage;
 const filteredUsers = users.filter(
   (user) =>
     user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     user.email.toLowerCase().includes(searchQuery.toLowerCase())
 );
 const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
 const totalPages = Math.ceil(filteredUsers.length / usersPerPage);



 // Filter investments based on search query (name or email)
const filteredInvestments = investments.filter(
  (investment) =>
    investment.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    investment.user?.email?.toLowerCase().includes(searchQuery.toLowerCase())
);

// Pagination Logic for Investments
const indexOfLastInvestment = currentPage * usersPerPage;
const indexOfFirstInvestment = indexOfLastInvestment - usersPerPage;
const currentInvestments = filteredInvestments.slice(indexOfFirstInvestment, indexOfLastInvestment);
const totalInvestmentPages = Math.ceil(filteredInvestments.length / usersPerPage);




  const printKYC = () => {
    window.print();
  };

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-content">
        <h1>Highbridge Admin Dashboard Panel</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>

        <div className="search-container">
  <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1111.832 3.767l4.23 4.231a1 1 0 11-1.414 1.414l-4.23-4.231A6 6 0 012 8z"
      clipRule="evenodd"
    />
  </svg>
  <input
    type="text"
    placeholder="Search by name or email..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="search-input"
  />
</div>

        <section>
          <h2 style={{ color: "black" }}>Users</h2>
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
                  {currentUsers.map((user) => (
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
                    src={`http://82.29.169.222:5000/${selectedKYC.kycData.passportImage.replace(/\\/g, "/")}`}
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
  src={`http://82.29.169.222:5000/${selectedKYC.kycData.idDocumentImage.replace(/\\/g, "/")}`}
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


{/* Signature Image Box */}
{/* Signature Image Box */}
{selectedKYC?.kycData?.signatureImage && (
  <div style={{ textAlign: "center", marginBottom: "20px" }}>
    <p style={{ fontWeight: "bold",  color: "white", marginBottom: "5px" }}>Signature Upload Image</p>
    <div
      className="signature-box"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "380px",
        height: "200px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        overflow: "hidden",
        margin: "auto",
      }}
    >
      <img
        src={`http://82.29.169.222:5000/${selectedKYC.kycData.signatureImage.replace(/\\/g, "/")}`}
        alt="Signature"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover", // Fills the box while maintaining aspect ratio
        }}
        onError={(e) => console.error("Signature image failed to load:", e.target.src)}
      />
    </div>
  </div>
)}

      {/* Buttons */}
      <div className="kyc-buttons">
        <button className="approve-btn" onClick={() => handleApproveKYC(selectedKYC.id, "approved")}>
          ✅ Approved
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
  <h2 style={{ color: "black" }}>Investments</h2>
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
          {filteredInvestments.map((investment) => (
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
                    href={investment.receipt.startsWith("http") ? investment.receipt : `http://82.29.169.222:5000${investment.receipt}`}
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
                    <button onClick={() => handleApprovePayment(investment._id)}>Approved</button>
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

<div className="admin-section">
  <h2>Realtors Management</h2>
  <RealtorList />
</div>



      </div>
    </div>
  );
};

export default AdminDashboard;
