import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AgrovestFooter from "../components/AgovestFooter"; // ✅ Import Footer
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
      const response = await axios.get("https://highbridge-api-16.onrender.com/api/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ API Response:", response.data);

      setUser({
        ...response.data,
        investments: response.data.investments || [],
      });

      // ✅ Ensure countdown and paymentMethod are correctly stored
      const countdowns = {};
      response.data.investments?.forEach((investment) => {
        if (investment.status === "Active") {
          countdowns[investment._id] = investment.countdown ?? "N/A";
        }
      });

      setInvestmentCountdowns(countdowns);

      // ✅ Prepare Data for Chart
      const formattedData = response.data.investments?.map((investment) => {
        const plan = investmentPlans.find((p) => p.value === investment.plan);
        const percentage = plan ? parseFloat(plan.label.match(/(\d+)%/)[1]) : 0;
        const expectedReturns = plan ? (investment.amount * percentage) / 100 : 0;

        return {
          name: investment.plan,
          amount: investment.amount,
          expectedReturns,
          paymentMethod: investment.paymentMethod || "N/A", // ✅ Ensure paymentMethod is set
          status: investment.status || "Pending",
          countdown: investment.countdown ?? "N/A", // ✅ Ensure countdown is set
        };
      });

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
}, [navigate]);// ✅ Fetch data when navigating



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
      setErrorMessage(""); // ✅ Clear any previous errors

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
              paymentMethod,
          };

          console.log("🚀 Sending Payment Data:", paymentData);
          const response = await axios.post(
              "https://highbridge-api-16.onrender.com/api/payments/initiate-flutterwave-payment",
              paymentData,
              { headers: { Authorization: `Bearer ${token}` } }
          );

          console.log("✅ API Response:", response.data);

          if (response.data?.redirectUrl) {
              console.log("🔗 Redirecting to:", response.data.redirectUrl);
              setErrorMessage(""); // ✅ Clear error if payment initiation is successful

              // Store success flag in localStorage
              localStorage.setItem("paymentSuccess", "true");

              // Redirect to payment URL
              window.location.href = response.data.redirectUrl;
          } else {
              setErrorMessage("⚠️ Payment link generation failed. Try again.");
          }
      } else if (paymentMethod === "manual") {
          const formData = new FormData();
          formData.append("amount", investmentAmount);
          formData.append("plan", selectedPlan);
          formData.append("paymentMethod", paymentMethod);
          formData.append("receipt", paymentReceipt);

          const manualResponse = await axios.post(
              "https://highbridge-api-16.onrender.com/api/payments/manual-payment",
              formData,
              {
                  headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "multipart/form-data",
                  },
              }
          );

          console.log("✅ Manual Payment Response:", manualResponse.data);

          if (
            manualResponse.data &&
            (manualResponse.data.message?.includes("Manual payment and investment recorded successfully") ||
             manualResponse.data.success === true)
        ) {
            setErrorMessage(""); // ✅ Clear any existing errors
            setSuccessMessage("✅ Payment initiation was successful.");
        
            // Store success flag in localStorage
            localStorage.setItem("paymentSuccess", "true");
        
            // Redirect to success page after 3 seconds
            setTimeout(() => {
                navigate("/payment-success");
            }, 3000);
        } else {
            console.log("❌ Manual Payment Failed Response:", manualResponse.data); // Debugging line
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
        <p style={{ color: "green", fontWeight: "bold" }}>
          Kindly complete your payment within 24 hours, to activate your investment.
        </p>
      </div>
    </div>
  </div>
)}


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
                  <th>Days to Maturity</th>
                  <th>Expected Returns</th>
                  <th>Payment Method</th>
                </tr>
              </thead>
              <tbody>
                {user?.investments?.map((investment, index) => (
                  <tr key={index} className="investment-row">
                    <td>{investment?.plan || "N/A"}</td>
                    <td>
                      {investment?.amount
                        ? new Intl.NumberFormat("en-NG", {
                            style: "currency",
                            currency: "NGN",
                          }).format(investment.amount)
                        : "N/A"}
                    </td>
                    <td>{investment?.status || "N/A"}</td>
                    <td>
                      {investment?.startDate
                        ? new Date(investment.startDate).toDateString()
                        : "N/A"}
                    </td>
                    <td>
                      {investment?.maturityDate
                        ? new Date(investment.maturityDate).toDateString()
                        : "N/A"}
                    </td>
                    <td>
                      {investment?.status === "Active"
                        ? investmentCountdowns[investment._id] ?? "N/A"
                        : "N/A"}
                    </td>
                    <td>
                      {investment?.expectedReturns
                        ? new Intl.NumberFormat("en-NG", {
                            style: "currency",
                            currency: "NGN",
                          }).format(investment.expectedReturns)
                        : "N/A"}
                    </td>
                    <td>
                      {investment?.paymentMethod
                        ? investment.paymentMethod === "manual"
                          ? "Manual Payment"
                          : "Flutterwave"
                        : "N/A"}
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

      <AgrovestFooter />
    </div>
  );
};

export default Dashboard;