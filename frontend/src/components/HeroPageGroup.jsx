import React, { useState, useEffect } from "react";
import { animated as a } from "@react-spring/web"; // Import animated as 'a'
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
  }, [images.length]);

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${images[currentImageIndex]})`,
      }}
    >
      <a.div className="hero-content"> {/* Animated div */}
        <h1 className="hero-title">
          <span className="green-text">Building Wealth</span>{" "}
          <span className="highlight">Empowering Futures</span>
        </h1>
        <p className="hero-subtext">
        Innovative, Sustainable <span className="highlight-alt">and High-Value Opportunities Across Real Estate,</span> 
          <span className="highlight">Energy, Agriculture </span>  Energy, Agriculture
          <span className="highlight-alt"> , and Investments</span>.
        </p>
      </a.div>
    </section>
  );
};

export default HeroPageGroup;