import React from "react";
import { FaFacebook, FaYoutube, FaTwitter, FaInstagram, FaTelegram } from "react-icons/fa"; // Importing social icons
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa"; // Importing additional icons
import "./Footer.css";

const AgrovestFooter= () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo and Description */}
        <div className="footer-about">
          <img
            src="/assets/images/logo/agrovestlog.webp"
            alt="Highbridge Homes"
            className="footer-logo"
          />
          <p>
          AgroVest is a strategic investment opportunity focused on agro-allied industries, 
          encompassing both livestock and crop investments. It provides investors with an opportunity
           to earn attractive returns by funding profitable agricultural ventures.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about-us-group">About Us</a></li>
            <li><a href="/team">Meet Our Team</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/flipvest">Flipvest</a></li>
            <li><a href="/">Energy/Tech</a></li>
            <li><a href="/">Luxury</a></li>
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
            <a href="https://web.facebook.com/highbridgeltd" className="social-icon">
              <FaFacebook />
            </a>
            <a href="https://www.youtube.com/@highbridgetv5660 " target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaYoutube />
            </a>
            <a href="https://x.com/Highbridge_ltd " target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/highbridge_homesltd/  " target="_blank" rel="noopener noreferrer" className="social-icon">
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

export default AgrovestFooter;