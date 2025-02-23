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
  const [paymentLink, setPaymentLink] = useState("");
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [investmentData, setInvestmentData] = useState([]); // ✅ State for Chart Data
  const [investmentCountdowns, setInvestmentCountdowns] = useState({});
  const [referralCode, setReferralCode] = useState("");
const fullReferralCode = `REF-${referralCode}`;
const [isKycModalOpen, setKycModalOpen] = useState(false);

  
 

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
        //http://localhost:5000/api/dashboard

        const response = await axios.get("https://highbridge-api-9.onrender.com/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("✅ API Response:", response.data);
        // Ensure the KYC verification field is updated
      if (response.data.kycApproved) {
        response.data.kycVerified = true;
      }
        console.log("📌 Referral Code from API:", response.data.referralCode);

        setUser(response.data);
        setReferralCode(response.data.referralCode || "N/A"); // ✅ Store referral code
       // ✅ Process Data for Chart
const formattedData = response.data.investments
? response.data.investments.map((investment) => {
    const plan = investmentPlans.find((p) => p.value === investment.plan); // ✅ Match using value instead of label
    const percentage = plan ? parseFloat(plan.label.match(/(\d+)%/)[1]) : 0; // ✅ Extract percentage correctly
    const expectedReturns = plan ? (investment.amount * percentage) / 100 : 0;
    return {
      name: investment.plan,
      amount: investment.amount,
      expectedReturns,
    };
  })
: [];

        console.log("📊 Formatted Investment Data:", formattedData);
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





  const handlePayment = async () => {
    console.log("👤 User Data: ", user);
    console.log("📌 Selected Plan: ", selectedPlan);
    console.log("💰 Investment Amount: ", investmentAmount);

    try {
        if (!selectedPlan) {
            setErrorMessage("⚠️ Please select an investment plan.");
            return;
        }
        if (investmentAmount < 500000) {
            setErrorMessage("⚠️ Minimum investment is ₦500,000.");
            return;
        }

        setProcessing(true);
        setErrorMessage("");

        const token = localStorage.getItem("token");

        const planDetails = investmentPlans.find(plan => plan.value === selectedPlan);
        const expectedReturns = planDetails 
            ? (investmentAmount * parseFloat(planDetails.label.match(/\d+/)[0]) / 100) 
            : 0;

       const webhookUrl = "https://highbridge-api-9.onrender.com/api/payments/webhook"; // ✅ Corrected URL

        const paymentData = {
            amount: investmentAmount,
            plan: selectedPlan,
            email: user.email || "",
            phone: user.phone || "",
            currency: "NGN",
            fullName: user.name || "",
            expectedReturns,
            webhookUrl  // ✅ Include Webhook URL
        };

        console.log("🚀 Sending Payment Data:", paymentData);

        const paymentResponse = await axios.post(
            "https://highbridge-api-9.onrender.com/api/payments/initiate-flutterwave-payment",
            paymentData,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("✅ Full API Response:", paymentResponse);

        // Ensure the response contains the expected structure
        if (paymentResponse.data && paymentResponse.data.redirectUrl) {
            console.log("🔗 Payment Link:", paymentResponse.data.redirectUrl);
            setPaymentLink(paymentResponse.data.redirectUrl);
            window.location.href = paymentResponse.data.redirectUrl;
        } else {
            console.error("🛑 Unexpected Response Structure:", paymentResponse.data);
            setErrorMessage("⚠️ Error generating payment link. Please try again.");
        }
    } catch (error) {
        console.error("🛑 Payment API Error:", error.response?.data || error.message);
        setErrorMessage(error.response?.data?.message || "⚠️ Payment failed. Please try again.");
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
      </BarChart>
    </ResponsiveContainer>
  ) : (
    <p style={{ color: "white" }}>No investment data available.</p>
  )}
</div>

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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p style={{ color: "white" }}>No active investments</p>
  )}
</div>

      {/* ✅ Investment Form */}
      <h2>Invest Now</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="investment-form">
        <label>Select Investment Plan:</label>
        <select value={selectedPlan} onChange={handlePlanChange}>
          <option value="">Select Plan</option>
          {investmentPlans.map(plan => (
            <option key={plan.value} value={plan.value}>{plan.label}</option>
          ))}
        </select>

        <label>Enter Investment Amount:</label>
        <input type="number" value={investmentAmount} min={500000} onChange={(e) => setInvestmentAmount(Number(e.target.value))} />

        <button onClick={handlePayment} disabled={processing || !selectedPlan || investmentAmount < 500000}>
          {processing ? "Processing..." : "Pay with Flutterwave"}
        </button>
      </div>

      {paymentLink && <a href={paymentLink} target="_blank" rel="noopener noreferrer">Proceed to Payment</a>}

      <Footer />
    </div>
  );
};

export default Dashboard;