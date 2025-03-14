import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ResetPassword.css"; // Import the CSS file


const ResetPassword = () => {
  const { token } = useParams(); // Extract token from URL
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("❌ Passwords do not match.");
      return;
    }

    setLoading(true);
    setMessage(""); // Clear any previous messages

    try {
      const response = await axios.post(
        `http://82.29.169.222:5000/api/auth/reset-password/${token}`, // Token is in URL
        { newPassword }, // Only send the new password in request body
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage("✅ " + response.data.message);
      console.log("Password reset successful:", response.data);

      setTimeout(() => navigate("/?login=true"), 2000);
    } catch (error) {
      console.error("Reset Password Error:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        {/* Use public path for logo */}
        <img src="/assets/images/logo/agrovestlog.webp" alt="Logo" className="logo" />
        <h1>Reset Your Password</h1>
        <p className="subtitle">Enter your new password below.</p>

        <form onSubmit={handleResetPassword}>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;


















