import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <img src="/assets/images/logo/highbridge2.png" alt="Highbridge Homes Logo" />
        </div>
        <div className="hamburger" onClick={toggleMobileMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          <li><a href="/">Home</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/properties">Properties</a></li>
          <li><a href="/events">Events</a></li> {/* New Event Link */}
          <li><a href="/contact">Contact</a></li>
          
          
          <li 
            className="dropdown" 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
          >
            <button className="dropdown-toggle green-button">
              Realtor arena
            </button>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li><a href="/become-realtor">Become a Realtor</a></li>
                <li><a href="/digital-marketing-training">Digital Marketing Training</a></li>
                <li><a href="/site-inspection">Book a Site Inspection</a></li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;