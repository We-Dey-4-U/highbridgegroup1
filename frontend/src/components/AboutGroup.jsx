import React from "react";
import "./About.css"; // Import the CSS file for styl

const AboutGroup = () => {
  return (
    <div className="about-container">
      <h1 className="about-heading">About Us</h1>
      <div className="about-content">
        <div className="about-text">
          <p>
          Highbridge Group is a leading Nigerian conglomerate dedicated to connecting local and global clients with high-value opportunities across real estate, energy, agriculture, and investments. With a commitment to innovation, sustainability, and excellence, we empower individuals and businesses by delivering technology-driven solutions that foster economic growth and long-term value creation.

         Guided by integrity, expertise, and a client-first approach, we set industry benchmarks while driving development and wealth creation for Nigerians and global investors. Through our subsidiaries—Highbridge Homes, Highbridge Energy & Tech, Highbridge Flipvest, and Highbridge Agrotech—we leverage synergy, strategic partnerships, and cutting-edge technology to shape a better future
          </p>
          <a href="/about" className="read-more-button">
            Read More
          </a>
        </div>
        <div className="about-video">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/vkF__wRUFKA" 
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default AboutGroup;