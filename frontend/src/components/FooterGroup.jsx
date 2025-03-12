import React from "react";
import { FaFacebook, FaYoutube, FaTwitter, FaInstagram, FaTelegram } from "react-icons/fa"; // Importing social icons
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa"; // Importing additional icons
import "./FooterGroup.css";


const subsidiaries = [
  {
    name: "Highbridge Home",
    logo: "/assets/images/logo/highbridge2.png",
    links: {
      facebook: "https://web.facebook.com/highbridgeltd",
      instagram: "https://www.instagram.com/highbridge_homesltd/",
      twitter: "https://x.com/Highbridge_ltd",
      youtube: "https://www.youtube.com/@highbridgetv5660",
      telegram: "https://telegram.org",
    },
  },
  {
    name: "Highbridge Flipvest",
    logo: "/assets/images/logo/FLIPVEST.png",
    links: {
      facebook: "https://web.facebook.com/highbridgeltd",
      instagram: "https://www.instagram.com/highbridge_flipvest/",
      twitter: "https://x.com/Highbridge_flipvest",
      youtube: "https://www.youtube.com/@highbridgetv5660",
      telegram: "https://telegram.org",
    },
  },
  {
    name: "Highbridge Energy/Tech",
    logo: "/assets/images/brandlogo/energy2.png",
    links: {
      facebook: "https://web.facebook.com/highbridgeltd",
      instagram: "https://www.instagram.com/highbridge_energytech/",
      twitter: "https://x.com/Highbridge_energy",
      youtube: "https://www.youtube.com/@highbridgetv5660",
      telegram: "https://telegram.org",
    },
  },
  {
    name: "Highbridge Luxury",
    logo: "/assets/images/brandlogo/webluxury.png",
    links: {
      facebook: "https://web.facebook.com/highbridgeltd",
      instagram: "https://www.instagram.com/highbridge_luxury/",
      twitter: "https://x.com/Highbridge_luxury",
      youtube: "https://www.youtube.com/@highbridgetv5660",
      telegram: "https://telegram.org",
    },
  },
 
];

const FooterGroup = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo and Description */}
        <div className="footer-about">
          <img
            src="/assets/images/logo/group.png"
            alt="Highbridge Homes"
            className="footer-logo"
          />
          <p>
          Highbridge Group is a leading Nigerian conglomerate dedicated to connecting local 
          and global clients with high-value opportunities across real estate, energy, agriculture, 
          and investments. Committed to innovation, sustainability, and excellence, we empower 
          individuals and businesses with technology-driven solutions that foster economic growth 
          and long-term value creation. Guided by integrity, expertise, and a client-first approach, 
          we set industry benchmarks while driving development and wealth creation for Nigerians and 
          global investors. Through our subsidiaries, we leverage synergy, strategic partnerships, and 
          cutting-edge technology to shape a better future.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
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
      <div className="subsidiary-group-container">
        {subsidiaries.map((subsidiary, index) => (
          <div key={index} className="subsidiary-group">
            <img src={subsidiary.logo} alt={subsidiary.name} className="subsidiary-logo" />
            <div className="social-icons">
              <a href={subsidiary.links.facebook} className="social-icon"><FaFacebook /></a>
              <a href={subsidiary.links.instagram} className="social-icon"><FaInstagram /></a>
              <a href={subsidiary.links.twitter} className="social-icon"><FaTwitter /></a>
              <a href={subsidiary.links.youtube} className="social-icon"><FaYoutube /></a>
              <a href={subsidiary.links.telegram} className="social-icon"><FaTelegram /></a>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Highbridge Group Limited. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default FooterGroup;