import React from "react";
import Navbar from "../components/Navbar";
import HeroPage from "../components/HeroPage";
import SponsorSlider from "../components/SponsorSlider";
import About from "../components/About";
import FeaturedPropertySection from "../components/featured/Featured";
import Services2 from "../components/Services2";
import Footer from "../components/Footer";
import ScrollElement from "../components/ScrollElement";
import CounterGrid from "../components/CounterGrid";
import FAQ from "../components/FAQ";
import ExecutiveTeam from "../components/ExecutiveTeam"; // Import the ExecutiveTeam component
import LatestNews from "../components/LatestNews"; // Import LatestNews Component

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroPage />
      <SponsorSlider />
      <CounterGrid />
      <ScrollElement>
        <About />
      </ScrollElement>
      <ScrollElement>
        <FeaturedPropertySection />
      </ScrollElement>
      <ScrollElement>
        <Services2 />
      </ScrollElement>
      <ScrollElement>
        <ExecutiveTeam /> {/* Add ExecutiveTeam component here */}
      </ScrollElement>
      <ScrollElement>
      <LatestNews />
      </ScrollElement>
      <Footer />
    </>
  );
};

export default Home;