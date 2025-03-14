import React, { useState } from "react";
import axios from "axios";
import "./BecomeRealtor.css";

const API_BASE_URL = "http://82.29.169.222:5000/api/realtors";

const BecomeRealtor = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    mobileNo: "",
    gender: "",
    dob: "",
    address: "",
    bankName: "",
    accountName: "",
    accountNumber: "",
    referralCode: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, formData);
      setMessage(response.data.message);
      setFormData({
        name: "",
        email: "",
        username: "",
        mobileNo: "",
        gender: "",
        dob: "",
        address: "",
        bankName: "",
        accountName: "",
        accountNumber: "",
        referralCode: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Error registering realtor");
    }
  };

  return (
    <div className="become-realtor">
      <div className="form-container">
        <img src="/path-to-your-logo.png" alt="Logo" className="logo-image" />
        <h1>Become a Realtor</h1>
        <p>Provide valid credentials to become a realtor.</p>
        <form className="realtor-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Enter Your Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Enter Your Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="username">Enter Your Username</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="mobile">Enter Your Mobile Number</label>
            <input type="tel" id="mobile" name="mobileNo" value={formData.mobileNo} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Select Gender</label>
            <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="dob">Enter Your Date Of Birth</label>
            <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="address">Enter Your Address</label>
            <textarea id="address" name="address" rows="3" value={formData.address} onChange={handleChange} required></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="bankName">Enter Your Bank Name</label>
            <input type="text" id="bankName" name="bankName" value={formData.bankName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="accountName">Enter Your Account Name</label>
            <input type="text" id="accountName" name="accountName" value={formData.accountName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="accountNumber">Enter Your Account Number</label>
            <input type="text" id="accountNumber" name="accountNumber" value={formData.accountNumber} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="referrerCode">Enter Your Referrer's Code (Optional)</label>
            <input type="text" id="referrerCode" name="referralCode" value={formData.referralCode} onChange={handleChange} />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default BecomeRealtor;