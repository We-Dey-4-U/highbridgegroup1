import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import "./HeroSection.css";

const images = [
  "/assets/images/hero/landhero2.png",
  "/assets/images/hero/handhero.png",
  "/assets/images/hero/landhero3.png",
];

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("register"); // "register" | "login" | "forgotPassword"
  const [user, setUser] = useState({ name: "", email: "", phone: "", password: "", referralCode: "" });
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // Added missing message state
  const navigate = useNavigate();
  const location = useLocation();
  const [submissionSuccess, setSubmissionSuccess] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("login")) {
      setShowModal(true);
      setModalType("login");
      setMessage("Your password has been reset. Please log in."); // Show success message
    }
  }, [location.search]);

  const toggleModal = () => setShowModal(!showModal);
  const switchForm = (type) => {
    setModalType(type);
    setMessage(""); // Clear messages when switching forms
  };
  

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const response = await axios.post("https://highbridge-api-16.onrender.com/api/auth/register", user);
        setSubmissionSuccess(response.data.message);
        setUser({ name: "", email: "", phone: "", password: "", referralCode: "" });

        // Switch to login form after successful registration
        setModalType("login");
    } catch (error) {
        setSubmissionSuccess("Registration failed. Please try again.");
    }
    setLoading(false);
};

  const handleForgotPassword = async () => {
    setLoading(true);
    try {
      const response = await axios.post("https://highbridge-api-16.onrender.com/api/auth/forgot-password", { email: forgotPasswordEmail });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Something went wrong. Try again.");
    }
    setLoading(false);
  };



  

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmissionSuccess(""); // Clear previous messages

    try {
        const response = await axios.post("https://highbridge-api-16.onrender.com/api/auth/login", loginData);
        const { token, user } = response.data;

        if (token && user) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            // Show a success message before redirecting
            setSubmissionSuccess("Login successful! Redirecting...");
            setTimeout(() => {
                navigate(user.role === "admin" ? "/admin/dashboard" : `/dashboard/${user.id}`, { replace: true });
            }, 2000);
        } else {
            setSubmissionSuccess("Invalid credentials. Please try again.");
        }
    } catch (error) {
        setSubmissionSuccess(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
        setLoading(false);
    }
};




  return (
    <div className="hero-section">
      <div className="hero-background" style={{ backgroundImage: `url(${images[currentImage]})` }} />
      <div className="hero-content">
        <h1 style={{ color: "#fff" }}>
          💰 Secure Your Future: Profitable Agricultural Investments in Nigeria! 🌾📈
        </h1>
        <div className="center-button-container">
          <button className="transparent-btn" onClick={toggleModal}>Register Now</button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay2">
          <div className="modal2">
            <button 
              style={{ position: "absolute", top: "10px", right: "15px", fontSize: "20px", border: "none", background: "green", color: "white", padding: "5px 10px", borderRadius: "50%", cursor: "pointer" }}
              onClick={toggleModal}
            >
              ×
            </button>
            {modalType === "register" && (
              <form className="form-container" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Full Name" required />
                <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required />
                <input type="text" name="phone" value={user.phone} onChange={handleChange} placeholder="Phone Number" required />
                <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" required />
                <input type="text" name="referralCode" value={user.referralCode} onChange={handleChange} placeholder="Referral Code (Optional)" />
                <button type="submit" disabled={loading}>{loading ? "Processing..." : "Register"}</button>
                <p>Already have an account? <span onClick={() => switchForm("login")} className="toggle-link">Login</span></p>
              </form>
            )}
            {modalType === "login" && (
              <form className="form-container" onSubmit={handleLoginSubmit}>
                <h2>Login</h2>
                <input type="email" name="email" value={loginData.email} onChange={handleLoginChange} placeholder="Email" required />
                <input type="password" name="password" value={loginData.password} onChange={handleLoginChange} placeholder="Password" required />
                <button type="submit" disabled={loading}>{loading ? "Processing..." : "Login"}</button>
                <p onClick={() => switchForm("forgotPassword")} className="forgot-password-link" style={{ cursor: "pointer", color: "blue" }}>Forgot Password?</p>
                <p>Don't have an account? <span onClick={() => switchForm("register")} className="toggle-link">Register</span></p>
              </form>
            )}
            {modalType === "forgotPassword" && (
              <div className="form-container">
                <h2>Forgot Password</h2>
                <input type="email" placeholder="Enter your email" value={forgotPasswordEmail} onChange={(e) => setForgotPasswordEmail(e.target.value)} required />
                <button onClick={handleForgotPassword} disabled={loading}>{loading ? "Processing..." : "Send Reset Link"}</button>
                {message && <p>{message}</p>}
                <p onClick={() => switchForm("login")} style={{ cursor: "pointer", color: "blue" }}>Back to Login</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
