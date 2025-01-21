import React from "react";
import { FaFacebook, FaYoutube, FaTwitter, FaInstagram, FaTelegram } from "react-icons/fa"; // Importing social icons
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa"; // Importing additional icons
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo and Description */}
        <div className="footer-about">
          <img
            src="/assets/images/logo/highbridge2.png"
            alt="Highbridge Homes"
            className="footer-logo"
          />
          <p>
            Highbridge Homes Limited is a Real Estate investment company based
            in Lagos, Nigeria, specializing in the construction of affordable
            luxury housing for clients and investors. Our mission is inspired
            by the housing deficit in Nigeria.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Our Services</a></li>
            <li><a href="/team">Meet Our Team</a></li>
            <li><a href="/projects">Our Projects</a></li>
            <li><a href="/training">Digital Training</a></li>
            <li><a href="/inspection">Book Inspection</a></li>
            <li><a href="/realtors">Realtor Arena</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="footer-contact">
          <h3>Contact Information</h3>
          <p>
            <FaMapMarkerAlt className="footer-icon" />
            <strong>Head Office Address:</strong><br />
            KM 34 A&M PLAZA, BESIDE MOBIL FILLING STATION, LEKKI-EPE EXPRESSWAY, ORIBANWA, LAGOS.
          </p>
          <p>
            <FaPhone className="footer-icon" />
            <strong>Call Us On:</strong><br />
            Front Desk: (+234)8152886217, (+234)8152886218, (+234)8152886219<br />
            (+234)8152886220, (+234)8152886221
          </p>
          <p>
            <FaEnvelope className="footer-icon" />
            <strong>Email at:</strong><br />
            <a href="mailto:info@highbridgehomesltd.com">
              info@highbridgehomesltd.com
            </a>
          </p>
        </div>

        {/* Social Media Links */}
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaFacebook />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaYoutube />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaInstagram />
            </a>
            <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaTelegram />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Highbridge Homes Limited. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;