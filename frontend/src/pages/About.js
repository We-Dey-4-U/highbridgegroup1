import React from 'react';
import NavbarGroup from "../components/NavbarGroup";
import AboutUs from "../components/AboutUs";
import ExecutiveTeam from "../components/ExecutiveTeam"; // Import the ExecutiveTeam component

import FooterGroup from "../components/FooterGroup";// Import the Footer component
import SponsorSlider from "../components/SponsorSlider";

const About = () => {
  return (
    <>
      <NavbarGroup />
    
      <AboutUs />
      
      {/* Add ExecutiveTeam component here */}
      <ExecutiveTeam />
      
      <SponsorSlider />
      <FooterGroup /> {/* Invoke the Footer component */}
    </>
  );
};

export default About;