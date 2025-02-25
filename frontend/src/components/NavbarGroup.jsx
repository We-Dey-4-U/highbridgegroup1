import React, { useState } from "react";
import "./Navbar.css";

const NavbarGroup = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubsidiariesDropdownOpen, setIsSubsidiariesDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (dropdownSetter) => {
    dropdownSetter((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <img src="/assets/images/logo/highbridge2.png" alt="Highbridge Homes Logo" />
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
          <li><a href="/about">About Us</a></li>
          <li><a href="/events">Events</a></li>
          <li><a href="/contact">Contact</a></li>

          {/* Subsidiaries Dropdown (Moved to Realtor's Position) */}
          <li 
            className="dropdown" 
            onMouseEnter={() => setIsSubsidiariesDropdownOpen(true)} 
            onMouseLeave={() => setIsSubsidiariesDropdownOpen(false)}
          >
            <button 
              className="dropdown-toggle green-button"
              onClick={() => toggleDropdown(setIsSubsidiariesDropdownOpen)}
            >
              Subsidiaries
            </button>
            {isSubsidiariesDropdownOpen && (
              <ul className="dropdown-menu">
                {/* External link - opens in a new tab */}
                <li>
                  <a href="http://www.highbridgeenergyltd.com" target="_blank" rel="noopener noreferrer">
                    Highbridge Energy
                  </a>
                </li>
                {/* Internal links remain unchanged */}
                <li><a href="/HighbridgeHomes">Highbridge Homes</a></li>
                <li><a href="/highbridge-tech">Highbridge Energy & Tech</a></li>
                <li><a href="/flipvest">Highbridge Flipvest</a></li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarGroup;