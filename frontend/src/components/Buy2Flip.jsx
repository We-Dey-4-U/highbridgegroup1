import React from "react";
import "./AgroVest.css"; // Import the CSS file for styling
import Buy2FlipNavbar from "./Buy2FlipNavbar"; // Import Navbar
import FeaturedBuy2Flip from "./featured/FeaturedBuy2Flip"; // Import FeaturedGroup
import SponsorSliderGroup from "./SponsorSliderGroup"; // Import Sponsor Slider
import Buy2FlipFooter from "./Buy2FlipFooter"; // Import Footer

const Buy2Flip = () => {
  return (
    <>
      {/* Navbar at the top */}
      <Buy2FlipNavbar />
      
      {/* Featured Group Section */}
      <FeaturedBuy2Flip />

      

      {/* Sponsor Slider before Footer */}
      <SponsorSliderGroup />

      {/* Footer at the bottom */}
      <Buy2FlipFooter />
    </>
  );
};

export default Buy2Flip;
