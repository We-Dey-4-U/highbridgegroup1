import React from "react";
import "./SponsorSlider.css";

const SponsorSliderGroup = () => {
  const sponsors = [
    "/assets/images/brandlogo/homes.png",
    "/assets/images/brandlogo/farmcity.png",
    "/assets/images/brandlogo/county.png",
    "/assets/images/brandlogo/manor.png",
    "/assets/images/brandlogo/haven.png", // Add more sponsors as needed
    "/assets/images/brandlogo/lacost.png", // Add more sponsors as needed
  ];

  return (
    <section className="sponsor-slider">
      <div className="sponsor-slider-wrapper">
        <div className="sponsor-label">
          <h3>Projects</h3>
        </div>
        <div className="sponsor-slider-container">
          {sponsors.map((logo, index) => (
            <div key={index} className="sponsor-logo">
              <img src={logo} alt={`Sponsor ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorSliderGroup;