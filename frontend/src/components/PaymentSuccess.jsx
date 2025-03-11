import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  // Retrieve user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Function to handle navigation to the correct dashboard
  const goToDashboard = () => {
    if (user) {
      navigate(user.role === "admin" ? "/admin/dashboard" : `/dashboard/${user.id}`, { replace: true });
    } else {
      navigate("/login"); // Fallback in case user data is missing
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>✅ Payment Successful!</h1>
      <p>Thank you for your investment. Your transaction was successful.</p>
      <button onClick={goToDashboard}>Go to Dashboard</button>
    </div>
  );
};

export default PaymentSuccess;