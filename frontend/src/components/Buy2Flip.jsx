import React from "react";
import "./AgroVest.css"; // Import the CSS file for styling
import NavbarGroup from "./NavbarGroup"; // Import Navbar
import FeaturedBuy2Flip from "./featured/FeaturedBuy2Flip"; // Import FeaturedGroup
import SponsorSliderGroup from "./SponsorSliderGroup"; // Import Sponsor Slider
import FooterGroup from "./FooterGroup"; // Import Footer

const Buy2Flip = () => {
  return (
    <>
      {/* Navbar at the top */}
      <NavbarGroup />
      
      {/* Featured Group Section */}
      <FeaturedBuy2Flip />

      

      {/* Sponsor Slider before Footer */}
      <SponsorSliderGroup />

      {/* Footer at the bottom */}
      <FooterGroup />
    </>
  );
};

export default Buy2Flip;
