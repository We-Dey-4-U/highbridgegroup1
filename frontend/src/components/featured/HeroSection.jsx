import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  const [isRegistering, setIsRegistering] = useState(true);
  const [user, setUser] = useState({ name: "", email: "", phone: "", password: "", referralCode: "" });
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleModal = () => setShowModal(!showModal);
  const switchForm = () => setIsRegistering(!isRegistering);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://highbridge-api-12.onrender.com/api/auth/register", user);
      setSubmissionSuccess(response.data.message);
      setUser({ name: "", email: "", phone: "", password: "", referralCode: "" });
      setIsRegistering(false);
    } catch (error) {
      setSubmissionSuccess("Registration failed. Please try again.");
    }
    setLoading(false);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://highbridge-api-12.onrender.com/api/auth/login", loginData);
      console.log("Login response:", response.data);
      setShowModal(false);
    } catch (error) {
      setSubmissionSuccess("Login failed. Please check your credentials.");
    }
    setLoading(false);
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
            {isRegistering ? (
              <form onSubmit={handleSubmit} className="form-container">
                <h2>Register</h2>
                <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Full Name" required />
                <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required />
                <input type="text" name="phone" value={user.phone} onChange={handleChange} placeholder="Phone Number" required />
                <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" required />
                <input type="text" name="referralCode" value={user.referralCode} onChange={handleChange} placeholder="Referral Code (Optional)" />
                <button type="submit" disabled={loading}>{loading ? "Processing..." : "Register"}</button>
                <p>Already have an account? <span onClick={switchForm} className="toggle-link">Login</span></p>
              </form>
            ) : (
              <form onSubmit={handleLoginSubmit} className="form-container">
                <h2>Login</h2>
                <input type="email" name="email" placeholder="Email" value={loginData.email} onChange={handleLoginChange} required />
                <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} required />
                <button type="submit" disabled={loading}>{loading ? "Processing..." : "Login"}</button>
                <p>Don't have an account? <span onClick={switchForm} className="toggle-link">Register</span></p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;