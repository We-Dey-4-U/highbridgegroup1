import React, { useState, useEffect } from "react";
import { animated as a } from "@react-spring/web";  // Import animated as 'a'
import "./HeroPage.css";

const HeroPageGroup = () => {
  const images = [
    "/assets/images/hero/landhero2.png",
    "/assets/images/hero/handhero.png",
    "/assets/images/hero/heroimage4.jpg",
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
      <a.div className="hero-content">  {/* Use 'a.div' for animated div */}
       
        <a href="/properties" className="btn-primary">
          Explore Properties
        </a>
      </a.div>
    </section>
  );
};

export default HeroPageGroup;