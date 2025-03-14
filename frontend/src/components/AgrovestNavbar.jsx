import React, { useState } from "react";
import "./Navbar.css";

const AgrovestNavbar = ({ passportImage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <img src="/assets/images/logo/agrovestlog.webp" alt="Agrovest Logo" />
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="hamburger" onClick={toggleMobileMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* Nav Links */}
        <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          <li><a href="/">Home</a></li>
          <li><a href="/flipvest">Flipvest</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default AgrovestNavbar;