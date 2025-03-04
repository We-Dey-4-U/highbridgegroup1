import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>✅ Payment Successful!</h1>
      <p>Thank you for your investment. Your transaction was successful.</p>
      <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
    </div>
  );
};

export default PaymentSuccess;