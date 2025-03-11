import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AgrovestLandingPage2.css"; // Ensure this CSS file exists
import FlipvestFooter from "../components/FlipvestFooter";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SponsorSliderGroup from "../components/SponsorSliderGroup";
import { FaCommentDots } from "react-icons/fa"; // Import an icon from react-icons


const images = [
  "/assets/images/hero/webpic23.jpg",
  "/assets/images/hero/webpic23.jpg",
  "/assets/images/hero/landhero3.png",
];

const investmentPlans = [
  { label: "25% ROI in 6 Months", value: "6m", minAmount: 500000 },
  { label: "30% ROI in 9 Months", value: "9m", minAmount: 500000 },
  { label: "50% ROI in 12 Months", value: "12m", minAmount: 500000 },
  { label: "75% ROI in 18 Months", value: "18m", minAmount: 500000 },
];

const AgrovestLandingPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate(); // Add this line
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); // Chatbot state

  // Create refs for each section
  const aboutRef = useRef(null);
  

  // Smooth scroll functions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000); // Slide every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const toggleMobileNav = () => {
    setIsMobileNavOpen((prev) => !prev);
  };



  return (
    <div className="landing-page">
      {/* Hero Section */}
 <div className="hero-section">
 <img 
  src="/assets/images/logo/flipvestlogo.png" 
  alt="FlipVest Logo" 
  className="hero-logo" 
/>

  <div
    className="hero-background"
    style={{ backgroundImage: `url(${images[currentImage]})` }}
  />
  <div
    className="hero-background"
    style={{ backgroundImage: `url(${images[currentImage]})` }}
  />
  <div className="hero-content">
    <h1 style={{ color: "#fff" }}>
      💰 Invest Today, Secure Tomorrow: Your Path to Financial Freedom! 📈
    </h1>
    <p></p>

    {/* Hero Links for Desktop */}
    <div className="hero-links">
      <Link to="/" className="transparent-btn1">
        Home
      </Link>
      <Link to="/agrovest" className="transparent-btn1">
        Agrovest
      </Link>
      <Link to="/buy2flip" className="transparent-btn1">
        Buy2Flip
      </Link>
     </div>
  </div>
 </div>





      {/* Hamburger Menu */}
      <div className="hamburger-menu" onClick={toggleMobileNav}>
        <div className="hamburger-icon"></div>
        <div className="hamburger-icon"></div>
        <div className="hamburger-icon"></div>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${isMobileNavOpen ? "open" : ""}`}>
        <Link to="/" onClick={toggleMobileNav}>Home</Link>
        <Link to="/agrovest" onClick={toggleMobileNav}>Agrovest</Link>
        <Link to="/buy2flip" onClick={toggleMobileNav}>Buy2Flip</Link>
      </div>

      <SponsorSliderGroup />

      {/* About Section */}
      <section ref={aboutRef} className="about">
        <div className="about-container">
          <h1 className="about-heading">Maximize Your Earnings with Highbridge Flipvest</h1>
          <div className="about-content">


  <div className="about-text">
  <p>
  <strong style={{ color: '#000' }}>About HighBridge FlipVest</strong> <br />  
  HighBridge FlipVest is an investment brand under the HighBridge Group umbrella. It specializes in real estate and agricultural investment opportunities, offering unique strategies for property flipping and agricultural investment plans, maximizing returns through careful property management and investment analysis.
</p>
  <p>
  As part of its commitment to wealth creation, HighBridge FlipVest offers two key investment solutions—profitable agricultural ventures and strategic buy2flip models—ensuring attractive returns for investors.
  </p>
  <p>
    <strong style={{ color: '#ff6347' }}>HighBridge AgroVest</strong> — An investment initiative under HighBridge FlipVest, focused on agro-allied industries, covering both crop and livestock ventures.
  </p>
  <p>
  <Link to="/Agrovest" style={{ textDecoration: 'none' }}>
  <button
    className="transparent"
    style={{
      backgroundColor: 'green',
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      cursor: 'pointer',
    }}
  >
    Learn More About AgroVest
  </button>
</Link>
  </p>
  <p>
    <strong style={{ color: '#ff6347' }}>HighBridge Buy2flip</strong> — Its A short-term investment scheme focusing on purchasing assets to later sell for profit, ensuring fast and efficient returns.
  </p>
  <p>
  <Link to="/buy2flip" style={{ textDecoration: 'none' }}>
  <button
    className="transparent"
    style={{
      backgroundColor: 'green',
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      cursor: 'pointer',
    }}
  >
    Learn More About Buy2Flip
  </button>
</Link>
  </p>

     </div>
         <div className="about-video">
              <iframe
                width="100%"
                height="315"
                 src="https://www.youtube.com/embed/A4PgGtixNaA"
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

 {/* Chatbot Toggle Button */}
       <button className="chatbot-toggle" onClick={() => setIsChatOpen(!isChatOpen)}>
         <FaCommentDots />
       </button>
 
       {/* Chatbot Section */}
       <div className={`chatbot-container ${isChatOpen ? "active" : ""}`}>
         <iframe
           src="https://www.chatbase.co/chatbot-iframe/wOczlmU3QE474j24ndAVh"
           width="100%"
           style={{ height: "100%", minHeight: "700px", border: "none" }}
           frameBorder="0"
         ></iframe>
       </div>
      {/* Replace the old footer with the imported Footer component */}
      <FlipvestFooter />
    </div>
  );
};

export default AgrovestLandingPage;


























