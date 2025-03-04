import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer"; // ✅ Import Footer
import "./Dashboard.css"; // ✅ Import Styles
import KYCForm from "../components/KYCForm"; // ✅ Import KYCForm component
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid  } from "recharts"; // ✅ Import Recharts


const investmentPlans = [
  { label: "25% ROI in 6 Months", value: "6months", minAmount: 500000 },
  { label: "30% ROI in 9 Months", value: "9months", minAmount: 500000 },
  { label: "50% ROI in 12 Months", value: "12months", minAmount: 500000 },
  { label: "75% ROI in 18 Months", value: "18months", minAmount: 500000 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState(500000);
  const [paymentMethod, setPaymentMethod] = useState("flutterwave");
  const [paymentReceipt, setPaymentReceipt] = useState(null);
  const [paymentLink, setPaymentLink] = useState("");
  const [processing, setProcessing] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [investmentData, setInvestmentData] = useState([]); // ✅ State for Chart Data
  const [investmentCountdowns, setInvestmentCountdowns] = useState({});
  const [referralCode, setReferralCode] = useState("");
const fullReferralCode = `REF-${referralCode}`;
const [isKycModalOpen, setKycModalOpen] = useState(false);
const [successMessage, setSuccessMessage] = useState("");
const [rememberManualPayment, setRememberManualPayment] = useState(false);

  
 

useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("🔴 No token found, redirecting to login...");
        navigate("/login");
        return;
      }

      console.log("🟢 Fetching dashboard data...");
      const response = await axios.get("http://localhost:5000/api/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ API Response:", response.data);

      if (response.data.kycApproved) {
        response.data.kycVerified = true;
      }

      // Merge investments with existing user investments
      setUser((prevUser) => {
        const newInvestments = response.data.investments || [];
      
        // Remove duplicates by checking if investment already exists
        const mergedInvestments = newInvestments.filter(
          (newInv) => !prevUser?.investments?.some((oldInv) => oldInv._id === newInv._id)
        );

        console.log("📊 Merged Investments Data:", mergedInvestments);

        return {
          ...response.data,
          investments: [...(prevUser?.investments || []), ...mergedInvestments],
        };
      });

      setReferralCode(response.data.referralCode || "N/A");

      // ✅ Process Investments for Chart (Including Manual Payments)
      const formattedData = response.data.investments
        ? response.data.investments.map((investment) => {
            const plan = investmentPlans.find((p) => p.value === investment.plan);
            const percentage = plan ? parseFloat(plan.label.match(/(\d+)%/)[1]) : 0;
            const expectedReturns = plan ? (investment.amount * percentage) / 100 : 0;

            return {
              name: investment.plan,
              amount: investment.amount,
              expectedReturns,
              paymentMethod: investment.paymentMethod || "manual", // Ensure manual payments are included
              status: investment.status || "Pending",
            };
          })
        : [];

      console.log("📊 Updated Investment Data:", formattedData);
      setInvestmentData(formattedData);
    } catch (error) {
      console.error("🛑 Error fetching dashboard data:", error.response?.data || error.message);
      setErrorMessage("⚠️ Failed to load dashboard. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  fetchDashboardData();
}, [navigate]);




  useEffect(() => {
    if (user?.investments) {
      const countdowns = {};

      user.investments.forEach((investment) => {
        if (investment.status === "active") {
          const endTime = new Date(investment.maturityDate).getTime();
          countdowns[investment.plan] = endTime;
        }
      });

      setInvestmentCountdowns(countdowns);
    }
  }, [user]);




  useEffect(() => {
    const interval = setInterval(() => {
      setInvestmentCountdowns((prevCountdowns) => {
        const updatedCountdowns = {};
        Object.keys(prevCountdowns).forEach((plan) => {
          const timeLeft = prevCountdowns[plan] - new Date().getTime();
          updatedCountdowns[plan] = timeLeft > 0 ? timeLeft : 0;
        });
        return updatedCountdowns;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms) => {
    if (ms <= 0) return "Completed";
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const seconds = Math.floor((ms / 1000) % 60);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };


  

  const handlePlanChange = (e) => {
    const selected = investmentPlans.find(plan => plan.value === e.target.value);
    if (selected) {
      setSelectedPlan(selected.value);
      if (investmentAmount < selected.minAmount) {
        setInvestmentAmount(selected.minAmount);
      }
    }
  };


  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    if (e.target.value === "manual") {
        setIsPaymentModalOpen(true);
    }
    setRememberManualPayment(false); // Reset when switching methods
};


  const handleReceiptUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
        console.log("📂 Selected File:", file);
        setPaymentReceipt(file);
    } else {
        console.warn("⚠️ No file selected");
    }
};

  

const handlePayment = async () => {
  console.log("👤 User Data: ", user);
  console.log("📌 Selected Plan: ", selectedPlan);
  console.log("💰 Investment Amount: ", investmentAmount);
  console.log("💳 Selected Payment Method: ", paymentMethod);

  try {
      if (!selectedPlan) {
          setErrorMessage("⚠️ Please select an investment plan.");
          return;
      }
      if (investmentAmount < 500000) {
          setErrorMessage("⚠️ Minimum investment is ₦500,000.");
          return;
      }
      if (!paymentMethod) {
          setErrorMessage("⚠️ Please select a payment method.");
          return;
      }
      if (paymentMethod === "manual" && !paymentReceipt) {
          setErrorMessage("⚠️ Please upload your payment receipt.");
          return;
      }

      setProcessing(true);
      setErrorMessage("");

      const token = localStorage.getItem("token");
      if (!token) {
          console.warn("🔴 No token found, redirecting to login...");
          navigate("/login");
          return;
      }

      const selectedPlanDetails = investmentPlans.find((p) => p.value === selectedPlan);
      const percentage = selectedPlanDetails ? parseFloat(selectedPlanDetails.label.match(/(\d+)%/)[1]) : 0;
      const expectedReturns = (investmentAmount * percentage) / 100;

      if (paymentMethod === "flutterwave") {
          const paymentData = {
              amount: investmentAmount,
              plan: selectedPlan,
              email: user.email || "",
              phone: user.phone || "",
              currency: "NGN",
              fullName: user.name || "",
              expectedReturns,
          };

          console.log("🚀 Sending Payment Data:", paymentData);
          const response = await axios.post(
              "http://localhost:5000/api/payments/initiate-flutterwave-payment",
              paymentData,
              { headers: { Authorization: `Bearer ${token}` } }
          );

          console.log("✅ API Response:", response.data);

          if (response.data?.redirectUrl) {
              console.log("🔗 Redirecting to:", response.data.redirectUrl);
              window.location.href = response.data.redirectUrl;
          } else {
              setErrorMessage("⚠️ Payment link generation failed. Try again.");
          }
      } else if (paymentMethod === "manual") {
          const formData = new FormData();
          formData.append("amount", investmentAmount);
          formData.append("plan", selectedPlan);
          formData.append("paymentMethod", paymentMethod);
          formData.append("receipt", paymentReceipt); // Ensure this is a File object

          const manualResponse = await axios.post(
              "http://localhost:5000/api/payments/manual-payment",
              formData,
              {
                  headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "multipart/form-data",
                  },
              }
          );

          console.log("✅ Manual Payment Response:", manualResponse.data);

          if (manualResponse.data && manualResponse.data.success === true) {
              setSuccessMessage("✅ Manual payment submitted successfully. Fetching updated investments...");

              const updatedResponse = await axios.get("http://localhost:5000/api/dashboard", {
                  headers: { Authorization: `Bearer ${token}` },
              });

              console.log("🔄 Updated Investment Data:", updatedResponse.data.investments);

              if (updatedResponse.data.investments) {
                  const formattedData = updatedResponse.data.investments.map((investment) => {
                      const plan = investmentPlans.find((p) => p.value === investment.plan);
                      const percentage = plan ? parseFloat(plan.label.match(/(\d+)%/)[1]) : 0;
                      const expectedReturns = plan ? (investment.amount * percentage) / 100 : 0;

                      return {
                          name: investment.plan,
                          amount: investment.amount,
                          expectedReturns,
                          paymentMethod: investment.paymentMethod || "manual",
                          status: investment.status || "Pending",
                      };
                  });
                  setInvestmentData(formattedData);
              }
          } else {
              setErrorMessage("⚠️ Failed to submit manual payment. Please try again.");
          }
      }
  } catch (error) {
      console.error("🛑 Error processing payment:", error.response?.data || error.message);
      setErrorMessage("⚠️ Payment processing failed. Please try again.");
  } finally {
      setProcessing(false);
  }
};


  if (loading) return <p>Loading dashboard...</p>;


  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name}</h1>
        <div className="user-info-grid">
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Phone:</strong> {user?.phone || "Not Provided"}</p>
          <p><strong>KYC Verified:</strong> {user?.kycVerified ? "Yes" : "No"}</p>
          <p><strong>Total Investments:</strong> {user?.totalInvestments}</p>
          <p><strong>Referral Code:</strong> {user?.referralCode || "Not Available"}</p> {/* ✅ Add Referral Code */}
        </div>
      </div>

      {/* KYC Section */}
      <div className="kyc-section">
      <h2>KYC Verification</h2>
        {user?.kycVerified ? (
          <p style={{ color: "green" }}>✅ Your KYC is Verified</p>
        ) : (
          <>
          <p style={{ color: "red" }}>⚠️ Your KYC is NOT Verified. Please submit your KYC details.</p>
          <button className="open-modal-btn" onClick={() => setKycModalOpen(true)}>
            Submit KYC
          </button>
        </>
      )}
    </div>

      {/* KYC Modal */}
       {/* Custom Modal */}
       {isKycModalOpen && (
        <div className="custom-modal-overlay" onClick={() => setKycModalOpen(false)}>
          <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>KYC Verification</h2>
              <button className="close-modal-btn" onClick={() => setKycModalOpen(false)}>X</button>
            </div>
            <div className="modal-body">
              <KYCForm user={user} onKycUpdate={() => window.location.reload()} />
            </div>
          </div>
        </div>
      )}

      {/* ✅ Investment Chart */}
      {/* ✅ Investment Chart */}
<h2 style={{ color: "white" }}>Investment Overview</h2>
<div style={{ width: "100%", height: "400px" }}>
  {investmentData.length ? (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={investmentData}>
        {/* ✅ White Grid Lines */}
        <CartesianGrid stroke="white" strokeDasharray="3 3" />
        
        {/* ✅ White Axis Lines & Text */}
        <XAxis dataKey="name" tick={{ fill: "white" }} stroke="white" />
        <YAxis tick={{ fill: "white" }} stroke="white" />
        
        {/* ✅ Tooltip with Yellow Expected Returns */}
        <Tooltip 
          contentStyle={{ backgroundColor: "#333", color: "white" }} 
          itemStyle={{ color: "yellow" }} 
        />

        {/* ✅ Legend Styling */}
        <Legend 
          formatter={(value, entry) => (
            <span style={{ color: entry.color === "#FFC107" ? "yellow" : "white" }}>
              {value}
            </span>
          )} 
        />
        
        {/* ✅ Bar Colors */}
        <Bar dataKey="amount" fill="#4CAF50" name="Investment Amount" />
        <Bar 
          dataKey="expectedReturns" 
          fill="#FFC107" 
          name="Expected Returns"
          label={{ position: "top", fill: "white" }} // 🔥 Ensures values show above bars
        />
        <Bar 
          dataKey="manualPayments" 
          fill="#FF5733" 
          name="Manual Payments" 
          label={{ position: "top", fill: "white" }} 
        />
        
        {/* ✅ Display Payment Method as a text label */}
        {investmentData.some(item => item.paymentMethod) && (
          <Bar dataKey="paymentMethod" fill="#2196F3" name="Payment Method" />
        )}
      </BarChart>
    </ResponsiveContainer>
  ) : (
    <p style={{ color: "white" }}>No investment data available.</p>
  )}
</div>




{isPaymentModalOpen && (
  <div className="custom-modal-overlay" onClick={() => setIsPaymentModalOpen(false)}>
    <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
      <h2 style={{ color: "black" }}>Account Payment Details</h2>
        <button className="close-modal-btn" onClick={() => setIsPaymentModalOpen(false)}>X</button>
      </div>
      <div className="modal-body">
        <p><strong>Bank Name:</strong> ZENITH Bank</p>
        <p><strong>Account Name:</strong> HIGHBRIDGE FLIPVEST LIMITED</p>
        <p><strong>Account Number:</strong> 1229557601</p>
        <p>Please make the payment and upload the receipt to proceed.</p>
      </div>
    </div>
  </div>
)}

      {/* ✅ User Investments */}
     {/* ✅ User Investments */}
{/* ✅ User Investments */}
<h2>Your Investments</h2>
<div className="investments-container">
  {user?.investments?.length ? (
    <div className="table-wrapper">
      <table className="investment-table">
        <thead>
          <tr>
            <th>Plan</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>Maturity Date</th>
            <th>Countdown</th>
            <th>Expected Returns</th>
            <th>Payment Method</th> {/* ✅ NEW COLUMN */}
            <th>Receipt</th> {/* ✅ NEW COLUMN (for manual payments) */}
          </tr>
        </thead>
        <tbody>
          {user.investments.map((investment, index) => (
            <tr key={index}>
              <td>{investment.plan}</td>
              <td>
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(investment.amount)}
              </td>
              <td>{investment.status}</td>
              <td>{new Date(investment.startDate).toDateString()}</td>
              <td>{new Date(investment.maturityDate).toDateString()}</td>
              <td>
                {investment.status === "active"
                  ? new Date(investment.maturityDate) > new Date()
                    ? formatTime(new Date(investment.maturityDate) - new Date())
                    : "N/A"
                  : "N/A"}
              </td>
              <td>
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(investment.expectedReturns)}
              </td>
              <td>{investment.paymentMethod === "manual" ? "Manual Payment" : "Flutterwave"}</td> {/* ✅ Show payment method */}
              <td>
                {investment.paymentMethod === "manual" && investment.receiptUrl ? (
                  <a href={investment.receiptUrl} target="_blank" rel="noopener noreferrer">
                    View Receipt
                  </a>
                ) : "N/A"}
              </td> {/* ✅ Show receipt link if available */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p style={{ color: "white" }}>No active investments</p>
  )}
</div>






<div className="investment-form">
  <h2>Make an Investment</h2>
  
  <label>Investment Plan:</label>
  <select value={selectedPlan} onChange={handlePlanChange}>
    <option value="">Select a plan</option>
    {investmentPlans.map((plan) => (
      <option key={plan.value} value={plan.value}>{plan.label}</option>
    ))}
  </select>

  <label>Investment Amount (₦):</label>
  <input
    type="number"
    value={investmentAmount}
    onChange={(e) => setInvestmentAmount(parseInt(e.target.value, 10))}
  />

<label>Select Payment Method:</label>
<select value={paymentMethod} onChange={handlePaymentMethodChange}>
  <option value="flutterwave">Pay with Flutterwave</option>
  <option value="manual">Manual Payment</option>
</select>

  {/* Show receipt upload if Manual Payment is selected */}
  {paymentMethod === "manual" && (
  <>
    <label>Upload Payment Receipt:</label>
    <input type="file" onChange={handleReceiptUpload} accept="image/*" />
  </>
)}

  {/* Show Flutterwave payment link if available */}
  {paymentMethod === "flutterwave" && paymentLink && (
    <a href={paymentLink} target="_blank" rel="noopener noreferrer" className="payment-link">
      Proceed to Payment
    </a>
  )}

  <button onClick={handlePayment} disabled={processing}>
    {processing ? "Processing..." : "Proceed with Payment"}
  </button>

  {errorMessage && <p className="error">{errorMessage}</p>}
</div>

      {paymentLink && <a href={paymentLink} target="_blank" rel="noopener noreferrer">Proceed to Payment</a>}

      <Footer />
    </div>
  );
};

export default Dashboard;