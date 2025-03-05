import React from "react";
import "./AgroVest.css"; // Import the CSS file for styling
import NavbarGroup from "./NavbarGroup"; // Import Navbar
import SponsorSliderGroup from "./SponsorSliderGroup"; // Import Sponsor Slider
import FooterGroup from "./FooterGroup"; // Import Footer

const AgroVest = () => {
  return (
    <>
      {/* Navbar at the top */}
      <NavbarGroup />

      <div className="investment-info">
        <h2 className="investment-title">HighBridge AgroVest</h2>
        <p className="investment-description">
          AgroVest is a dedicated investment scheme focused on agro-allied industries, including both crop and livestock investments.
          It provides investors with the opportunity to earn attractive returns by funding profitable agricultural ventures.
        </p>
        <p className="investment-description">
          With HighBridge AgroVest, you can invest in sustainable agriculture, supporting food production while securing financial growth.
        </p>
      </div>

      {/* Sponsor Slider before Footer */}
      <SponsorSliderGroup />

      {/* Footer at the bottom */}
      <FooterGroup />
    </>
  );
};

export default AgroVest;