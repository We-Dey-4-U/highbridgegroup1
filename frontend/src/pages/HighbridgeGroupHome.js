import React from "react";
import NavbarGroup from "../components/NavbarGroup";
import HeroPageGroup from "../components/HeroPageGroup";
import SponsorSliderGroup from "../components/SponsorSliderGroup";
import AboutGroup from "../components/AboutGroup";
import FeaturedPropertySectionGroup from "../components/featured/FeaturedGroup";
import Services2Group from "../components/Services2Group";
import FooterGroup from "../components/FooterGroup";
import ScrollElementGroup from "../components/ScrollElementGroup";
import CounterGridGroup from "../components/CounterGridGroup";
import ContactUs from "../components/ContactUs"; // Import ContactUs component
import ExecutiveTeamGroup from "../components/ExecutiveTeamGroup"; // Import the ExecutiveTeamGroup component
import LatestNews from "../components/LatestNews"; // Import LatestNews Component

const HighBridgeGroupHome = () => {
  return (
    <>
      <NavbarGroup />
      <HeroPageGroup />
      <SponsorSliderGroup />
      <CounterGridGroup />
      <ScrollElementGroup>
        <AboutGroup />
      </ScrollElementGroup>
      <ScrollElementGroup>
        <FeaturedPropertySectionGroup />
      </ScrollElementGroup>
      <ScrollElementGroup>
        <Services2Group />
      </ScrollElementGroup>
      <ScrollElementGroup>
        <ExecutiveTeamGroup /> {/* Add ExecutiveTeamGroup component here */}
      </ScrollElementGroup>
       {/* New LatestNews Section for Real-Time Updates */}
       <ScrollElementGroup>
        <LatestNews />
      </ScrollElementGroup>
      <ScrollElementGroup>
      <ContactUs /> {/* Replace FAQGroup with ContactUs */}
      </ScrollElementGroup>
      <FooterGroup />
    </>
  );
};

export default HighBridgeGroupHome;