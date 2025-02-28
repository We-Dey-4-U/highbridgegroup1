import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-us">
      <h2 style={{ color: "white" }}>Contact Us</h2>

      {/* Office Info and Maps Section */}
      <div className="offices">
        {/* Lagos Office */}
        <div className="office">
          <h3 style={{ color: "white" }}>Lagos State</h3>
          <p><FaMapMarkerAlt className="icon" /> KM 34 A&M PLAZA, BESIDE MOBIL FILLING STATION, LEKKI-EPE EXPRESSWAY, ORIBANWA, LAGOS.</p>
          <p><FaPhone className="icon" /> (+234)8152886217, (+234)8152886218, (+234)8152886219, (+234)8152886220, (+234)8152886221</p>
          <p><FaEnvelope className="icon" /> <a href="mailto:info@highbridgehomesltd.com">info@highbridgehomesltd.com</a></p>
          <p><FaClock className="icon" /> MON - FRI: 08.00 AM – 06.00PM<br />SAT: 09.00 AM – 04.00PM</p>
          <div className="map">
            <iframe
              title="Lagos Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126918.54744983907!2d3.4673634771442297!3d6.524379265318264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8c3d30f123ab%3A0x98ab6c5dbffb62f7!2sLagos!5e0!3m2!1sen!2sng!4v1691687234567!5m2!1sen!2sng"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Abuja Office */}
        <div className="office">
          <h3 style={{ color: "white" }}>F.C.T Abuja</h3>
          <p><FaMapMarkerAlt className="icon" /> SUITE 7, GROUND FLOOR, SHEMA PLAZA, INSIDE SHEMA FILLING STATION, AIRPORT ROAD, ABUJA.</p>
          <p><FaPhone className="icon" /> (+234)8152886217, (+234)8152886218, (+234)8152886219, (+234)8152886220, (+234)8152886221</p>
          <p><FaEnvelope className="icon" /> <a href="mailto:info@highbridgehomesltd.com">info@highbridgehomesltd.com</a></p>
          <p><FaClock className="icon" /> MON - FRI: 08.00 AM – 06.00PM<br />SAT: 09.00 AM – 04.00PM</p>
          <div className="map">
            <iframe
              title="Abuja Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126918.54744983907!2d7.4913027!3d9.0578516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b899ab1ed3c5f%3A0x40dbf9af529a6fd8!2sAbuja!5e0!3m2!1sen!2sng!4v1691687234567!5m2!1sen!2sng"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="contact-form">
        <h3 style={{ color: "white" }}>Send Us a Message</h3>
        <form>
          <div className="form-group">
            <label htmlFor="name" style={{ color: "white" }}>Name</label>
            <input type="text" id="name" placeholder="Your Name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email" style={{ color: "white" }}>Email</label>
            <input type="email" id="email" placeholder="Your Email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message" style={{ color: "white" }}>Message</label>
            <textarea id="message" placeholder="Your Message" rows="5" required></textarea>
          </div>
          <button type="submit" className="btn-submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;