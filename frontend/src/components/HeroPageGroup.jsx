import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HeroPage.css";

const HeroPageGroup = () => {
  const images = [
    "/assets/images/hero/landhero2.png",
    "/assets/images/hero/heroimageagric.jpg",
    "/assets/images/hero/energy.jpg",
    "/assets/images/hero/home.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-section">
      {/* Logo positioned to the left */}
      <img 
        src="/assets/images/logo/group.png" 
        alt="FlipVest Logo" 
        className="hero-logo" 
      />

      {/* Hero background */}
      <div
        className="hero-background"
        style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
      />

      {/* Hero content */}
      <div className="hero-content">
        <h1 style={{ color: "#fff" }}>
          💰 Building Wealth, Empowering Future: Your Path to Financial Freedom! 📈
        </h1>
        <p style={{ color: "white", fontWeight: "700", fontSize: "1.2rem", textAlign: "center" }}>
        Innovative, sustainable, and high-value opportunities across real estate, energy/tech, agriculture and investments.
        </p>
      </div>
    </div>
  );
};

export default HeroPageGroup;