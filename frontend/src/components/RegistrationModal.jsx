import { useState } from "react";
import "./RegistrationModal.css"; // Add custom styles

const RegistrationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration successful! Redirecting to WhatsApp...");
        setTimeout(() => {
          window.location.href = "https://chat.whatsapp.com/YOUR_GROUP_INVITE_LINK";
        }, 1000);
      } else {
        alert("Error: User already registered or invalid data.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h2>Register to Join</h2>
            <button className="close-button" onClick={onClose}>&times;</button>
          </div>
          <div className="modal-body">
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              onChange={handleChange}
              required
            />
            <input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              onChange={handleChange}
              required
            />
          </div>
          <div className="modal-footer">
            <button className="cancel-button" onClick={onClose}>Cancel</button>
            <button className="submit-button" onClick={handleSubmit}>Register</button>
          </div>
        </div>
      </div>
    )
  );
};

export default RegistrationModal;