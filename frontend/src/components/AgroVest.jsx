import React from "react";
import "./AgroVest.css"; // Import the CSS file for styling
import AgrovestNavbar from "./AgrovestNavbar"; // Import Navbar
import FeaturedAgrovest from "./featured/FeaturedAgrovest"; // Import FeaturedGroup
import SponsorSliderGroup from "./SponsorSliderGroup"; // Import Sponsor Slider
import AgrovestFooter from "./AgovestFooter";

const AgroVest = () => {
  return (
    <>
      {/* Navbar at the top */}
      <AgrovestNavbar />
      
      {/* Featured Group Section */}
      <FeaturedAgrovest />

      

      {/* Sponsor Slider before Footer */}
      <SponsorSliderGroup />

      {/* Footer at the bottom */}
      <AgrovestFooter />
    </>
  );
};

export default AgroVest;
