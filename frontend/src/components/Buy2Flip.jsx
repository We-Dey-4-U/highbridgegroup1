import React from "react";
import "./Buy2Flip.css"; // Import the CSS file for styling
import NavbarGroup from "./NavbarGroup"; // Navbar Component
import SponsorSliderGroup from "./SponsorSliderGroup"; // Sponsor Slider Component
import FooterGroup from "./FooterGroup"; // Footer Component

const Buy2Flip = () => {
  return (
    <>
      {/* Navbar at the top */}
      <NavbarGroup />

      <div className="investment-info">
        <h2 className="title">HighBridge Buy2Flip</h2>
        <p className="description">
          Buy2Flip is an innovative short-term investment model designed for real estate flipping. It allows investors to purchase
          undervalued properties, renovate them, and sell at a higher value for profit.
        </p>
        <p className="description">
          This strategy is backed by expert market analysis, ensuring that every investment opportunity maximizes returns efficiently.
        </p>
        <a href="/flipvest" className="learn-more-btn">
          Learn More
        </a>
      </div>

      {/* Sponsor Slider before Footer */}
      <SponsorSliderGroup />

      {/* Footer at the bottom */}
      <FooterGroup />
    </>
  );
};

export default Buy2Flip;