
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AgrovestLandingPage.css"; // Ensure this CSS file exists
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import FAQ from "../components/FAQ";
import { FaCommentDots } from "react-icons/fa"; // Import an icon from react-icons
import { motion } from "framer-motion";
import RegistrationModal from "../components/RegistrationModal";

const images = [
  "/assets/images/hero/landhero2.png",
  "/assets/images/hero/handhero.png",
  "/assets/images/hero/landhero3.png",
];

const investmentPlans = [
  { label: "25% ROI in 6 Months", value: "6m", minAmount: 500000 },
  { label: "30% ROI in 9 Months", value: "9m", minAmount: 500000 },
  { label: "50% ROI in 12 Months", value: "12m", minAmount: 500000 },
  { label: "75% ROI in 18 Months", value: "18m", minAmount: 500000 },
];

const AgrovestWebinarPage  = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const navigate = useNavigate(); // Add this line
    const [isOpen, setIsOpen] = useState(false);
    
  
    // Create refs for each section
    const aboutRef = useRef(null);
    const galleryRef = useRef(null);
    const registrationRef = useRef(null);
    const paynowRef = useRef(null);
  
    // Smooth scroll functions
      // Smooth scroll functions
      const scrollToAbout = () => {
        aboutRef.current.scrollIntoView({ behavior: "smooth" });
      };
    
      const scrollToGallery = () => {
        galleryRef.current.scrollIntoView({ behavior: "smooth" });
      };
    
      const scrollToRegistration = () => {
        registrationRef.current.scrollIntoView({ behavior: "smooth" });
      };
    
    
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 4000); // Slide every 4 seconds
  
      return () => clearInterval(interval);
    }, []);

    const webinarDate = "Feb 27, 2025"; 
    const webinarTime = "10 AM";
   
  

 return (
    <div className="landing-page">
    {/* Hero Section */}
    <div className="hero-section">
      <div
        className="hero-background"
        style={{ backgroundImage: `url(${images[currentImage]})` }}
      />
      <div className="hero-content">
        <h1 className="hero-title">
          💰 Secure Your Future: Profitable Agricultural Investments in Nigeria – Join Our Exclusive Webinar! 🌾📈
        </h1>
  
        <div className="center-button-container">
          <button 
            className="transparent"
            onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSeAcEPyjL1F391yAP9zcuxW7Jade3tBY4nhhnZhoxaNsj0FzA/viewform", "_blank", "noopener,noreferrer")}
          >
            Register Now
          </button>
  
          <p className="cta-text">
            Join Us for the Agrovest Webinar on  
            <span className="highlighted-text">{`${webinarDate} - ${webinarTime}!`}</span>
          </p>
        </div>
      </div>
    </div>
       
  
 {/* About Section */}
     <section ref={aboutRef} className="about">
         <div className="about-container">
         <h1 className="about-heading">Maximize Your Earnings with Agrovest</h1>
            <div className="about-content">
    <div className="about-text">
    <p>
    Join us for an exclusive <strong style={{ color: '#ff6347' }}>free</strong> <strong style={{ color: '#ff6347' }}>webinar</strong> on <strong>Highbridge Agrovest – Bokku Food Vol. 1</strong>, where we’ll share how you can invest in agriculture and earn impressive returns. Discover how our sustainable farming ventures in ginger, poultry, snails, and livestock can help grow your wealth.
  </p>
  <p>
    Don’t miss out on this opportunity to learn from industry experts and explore a secure, profitable investment model backed by <strong>Highbridge Farmcity Cooperative</strong>.
  </p>
  <p>
    <button
     className="transparent"
     onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSeAcEPyjL1F391yAP9zcuxW7Jade3tBY4nhhnZhoxaNsj0FzA/viewform", "_blank", "noopener,noreferrer")}
   >
     Register Now
    </button> Join Us for the Agrovest Webinar on  
    <span className="highlighted-text">{`${webinarDate} - ${webinarTime}!`}</span>
  </p>
  
  </div>
    <div className="about-video">
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/s6TiVRzH8CA"
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </section>
  
  
        {/* Gallery Section */}
        {/* Gallery Section */}
        <section ref={galleryRef} className="gallery">
        <h2>Discover Agrovest: Transforming Agriculture with Innovation</h2>
  
        {/* Image Gallery Carousel */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          className="gallery-carousel"
        >
          <SwiperSlide>
          <img src="/assets/images/hero/agrovestimage.jpg" alt="Gallery 1" />
          </SwiperSlide>
          <SwiperSlide>
          <img src="/assets/images/hero/agrovestimage2.jpg" alt="Gallery 2" />
          </SwiperSlide>
          <SwiperSlide>
          <img src="/assets/images/hero/heroimage4.jpg" alt="Gallery 2" />
          </SwiperSlide>
        </Swiper>
  
        {/* Video Gallery Carousel */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          className="video-carousel"
        >
          <SwiperSlide>
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/jCJY986HDdg"
              title="Video 1"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </SwiperSlide>
          <SwiperSlide>
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/A4PgGtixNaA"
              title="Video 2"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </SwiperSlide>
          <SwiperSlide>
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/P7gy4wKFRLA"
              title="Video 3"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </SwiperSlide>
  
          <SwiperSlide>
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/D1sgciXB79E"
              title="Video 3"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </SwiperSlide>
        </Swiper>
      </section>
        {/* Payment Section */}
    {/* Payment Section Banner */}
    <div className="payment-banner">
    <div className="payment-banner-overlay">
      <h2>Secure Your Investment Now!</h2>
      <p>Join thousands of investors making profitable returns in agriculture.</p>
      <Link to="/payment">
        <button className="payment-banner-btn">Get Started</button>
      </Link>.
  
    </div>
  </div>
   {/* FAQ Section */}
   <FAQ />

    {/* Footer Section */}
    <footer className="footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Agrovest. All rights reserved.</p>
          <ul className="footer-links">
            <li>
              <Link to="/terms">Terms & Conditions</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>
      </footer>
     </div>
    );
  };

export default AgrovestWebinarPage;