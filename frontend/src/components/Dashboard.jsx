import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer"; // ✅ Import Footer
import "./Dashboard.css"; // ✅ Import Styles
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"; // ✅ Import Recharts

const investmentPlans = [
  { label: "25% ROI in 6 Months", value: "6m", minAmount: 500000 },
  { label: "30% ROI in 9 Months", value: "9m", minAmount: 500000 },
  { label: "50% ROI in 12 Months", value: "12m", minAmount: 500000 },
  { label: "75% ROI in 18 Months", value: "18m", minAmount: 500000 },
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

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login"); // Redirect if not logged in
          return;
        }

        const response = await axios.get("http://localhost:5000/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);

        // ✅ Process Data for Chart
        const formattedData = response.data.investments
  ? response.data.investments.map((investment) => ({
      name: investment.plan,
      amount: investment.amount,
    }))
  : [];
        setInvestmentData(formattedData);
      } catch (error) {
        setErrorMessage("⚠️ Failed to load dashboard. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);



  

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

        const paymentResponse = await axios.post(
            "http://localhost:5000/api/payments/initiate-flutterwave-payment",
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
        </div>
      </div>

      {/* ✅ Investment Chart */}
      <h2>Investment Overview</h2>
      <div style={{ width: "100%", height: "400px", margin: "0 auto" }}>
        {investmentData.length ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={investmentData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p style={{ color: "white" }}>Loading chart data...</p>
        )}
      </div>

      {/* ✅ User Investments */}
      <h2>Your Investments</h2>
      <div className="investments-container">
        {user?.investments?.length ? (
          user.investments.map((investment, index) => (
            <div key={index} className="investment-card">
              <p><strong>Plan:</strong> {investment.plan}</p>
              <p><strong>Amount:</strong> {new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(investment.amount)}</p>
              <p><strong>Status:</strong> {investment.status}</p>
              <p><strong>Start Date:</strong> {new Date(investment.startDate).toDateString()}</p>
              <p><strong>Maturity Date:</strong> {new Date(investment.maturityDate).toDateString()}</p>
              <p><strong>Expected Returns:</strong> {new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(investment.expectedReturns)}</p>
            </div>
          ))
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