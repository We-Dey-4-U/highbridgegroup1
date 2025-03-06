import React from "react";
import "./AgroVest.css"; // Import the CSS file for styling
import NavbarGroup from "./NavbarGroup"; // Import Navbar
import FeaturedAgrovest from "./featured/FeaturedAgrovest"; // Import FeaturedGroup
import SponsorSliderGroup from "./SponsorSliderGroup"; // Import Sponsor Slider
import FooterGroup from "./FooterGroup"; // Import Footer

const AgroVest = () => {
  return (
    <>
      {/* Navbar at the top */}
      <NavbarGroup />
      
      {/* Featured Group Section */}
      <FeaturedAgrovest />

      

      {/* Sponsor Slider before Footer */}
      <SponsorSliderGroup />

      {/* Footer at the bottom */}
      <FooterGroup />
    </>
  );
};

export default AgroVest;
