import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import HeroSection from "./HeroSection"; // Import HeroSection
import './FeaturedAgrovest.css';
import { FaCommentDots } from "react-icons/fa"; // Import an icon from react-icons
import { motion } from "framer-motion";
import FAQ from "../FAQ";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import House1 from '../../assets/subscrptionimage.jpg';
import Bed1 from '../../assets/process.jpg';
import Kitchen from '../../assets/fruits.jpg';
import Bathroom from '../../assets/farm.jpg';
import LivingRoom from '../../assets/container.jpg';


const FeaturedAgrovest = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRegistering, setIsRegistering] = useState(true);
    const [loading, setLoading] = useState(false);
    const [submissionSuccess, setSubmissionSuccess] = useState(null);
    const [user, setUser] = useState({ email: "", phone: "", name: "", password: "", referralCode: "" });
    const [loginData, setLoginData] = useState({ email: "", password: "" });
     const [isChatOpen, setIsChatOpen] = useState(false); // Chatbot state
    const navigate = useNavigate();
     const [activeIndex, setActiveIndex] = useState(null);

      // Create refs for each section
       const aboutRef = useRef(null);
       const galleryRef = useRef(null);
       const registrationRef = useRef(null);
       const paynowRef = useRef(null);
    
      const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
      };
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", user);
            setSubmissionSuccess(response.data.message);
            setUser({ email: "", phone: "", name: "", password: "", referralCode: "" });
            setIsRegistering(false);
        } catch (error) {
            setSubmissionSuccess("Registration failed. Please try again.");
        }
        setLoading(false);
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("https://highbridge-api-12.onrender.com/api/auth/login", loginData);
            const { token, user } = response.data;
            if (token && user) {
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                navigate(user.role === "admin" ? "/admin/dashboard" : `/dashboard/${user.id}`, { replace: true });
            } else {
                setSubmissionSuccess("Login failed. Invalid credentials.");
            }
        } catch (error) {
            setSubmissionSuccess("Login failed. Please check your credentials.");
        }
        setLoading(false);
    };

    return (
        <div>
            {/* Add HeroSection here */}
            <HeroSection />

            <div className='featured1'>
                <h1 className='featured-text'>Secure Your Future: Profitable Agricultural Investments in Nigeria!</h1>
                <p className='featured-text'>A dedicated investment scheme for agro-allied industries, including both crop and livestock investments.</p>

                {isModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <button className="close-modal" onClick={() => setIsModalOpen(false)}>&times;</button>
                            <h2>{isRegistering ? "Register" : "Login"}</h2>
                            {submissionSuccess && <p className="message">{submissionSuccess}</p>}
                            <form onSubmit={isRegistering ? handleSubmit : handleLoginSubmit}>
                                {isRegistering ? (
                                    <>
                                        <input type="text" placeholder="Name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} required />
                                        <input type="email" placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required />
                                        <input type="text" placeholder="Phone" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} required />
                                        <input type="password" placeholder="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} required />
                                        <input type="text" placeholder="Referral Code (Optional)" value={user.referralCode} onChange={(e) => setUser({ ...user, referralCode: e.target.value })} />
                                    </>
                                ) : (
                                    <>
                                        <input type="email" placeholder="Email" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} required />
                                        <input type="password" placeholder="Password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} required />
                                    </>
                                )}
                                <button type="submit" disabled={loading}>{loading ? "Processing..." : isRegistering ? "Register" : "Login"}</button>
                            </form>
                            <p onClick={() => setIsRegistering(!isRegistering)} className="toggle-link">
                                {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
                            </p>
                        </div>
                    </div>
                )}

                <div className='container'>
                    <figure className='span-3 image-grid-row-2'>
                        <img src={House1} alt='Featured Property' />
                        <figcaption style={{ color: 'white' }}>Agro-Allied Investments</figcaption>
                    </figure>
                    <figure>
                        <img src={Bed1} alt='Energy Investments' />
                        <figcaption style={{ color: 'white' }}>Renewable Energy</figcaption>
                    </figure>
                    <figure>
                        <img src={LivingRoom} alt='Living Room' />
                        <figcaption style={{ color: 'white' }}>Real Estate Opportunities</figcaption>
                    </figure>
                    <figure>
                        <img src={Kitchen} alt='Kitchen' />
                        <figcaption style={{ color: 'white' }}>Smart Agriculture</figcaption>
                    </figure>
                    <figure>
                        <img src={Bathroom} alt='Bathroom' />
                        <figcaption style={{ color: 'white' }}>Subscription-Based Models</figcaption>
                    </figure>
                </div>

                <div className="agrovest-info">
                    <h2>AgroVest Investment Opportunities</h2>
                    <p>AgroVest is a strategic investment opportunity focused on agro-allied industries, encompassing both livestock and crop investments. It provides investors with an opportunity to earn attractive returns by funding profitable agricultural ventures.</p>

                    <h3>Why Invest in HighBridge AgroVest?</h3>
                    <p>With HighBridge AgroVest, you can invest in sustainable agriculture, supporting food production while securing financial growth.</p>

                    <h3>Investment Plans</h3>
                    <ul>
                        <li><strong>6-Month Plan:</strong> Minimum N500,000 with 25% ROI (Maximum: N10,000,000).</li>
                        <li><strong>9-Month Plan:</strong> Minimum N500,000 with 30% ROI (No maximum limit).</li>
                        <li><strong>12-Month Plan:</strong> Minimum N500,000 with 50% ROI (No maximum limit).</li>
                        <li><strong>18-Month Plan:</strong> Minimum N500,000 with 75% ROI (No maximum limit).</li>
                    </ul>
                    <p>Once payment is confirmed, you will receive a Payment Receipt, Deed of Contract, and a Post-dated Cheque.</p>

                    <h3>Livestock Investment Opportunities</h3>
                    <ul>
                        <li><strong>Snail Farming:</strong> Low maintenance with high-profit potential and minimal startup costs.</li>
                        <li><strong>Piggery:</strong> Profitable venture focusing on breeding and rearing pigs, offering scalable income.</li>
                        <li><strong>Fishery:</strong> Investment in fish farming, including tilapia, catfish, and other high-demand species.</li>
                    </ul>
                </div>
            </div>

          {/* Payment Section Banner (Moved Below Agrovest Info) */}
          {/* Payment Section Banner (Moved Below Agrovest Info) */}
<div className="payment-banner">
    <div className="payment-banner-overlay">
        <h2>Secure Your Investment Now!</h2>
        <p>Join thousands of investors making profitable returns in agriculture.</p>
        <button className="payment-banner-btn" onClick={() => setIsModalOpen(true)}>Get Started</button>
    </div>
</div>


                {/* Gallery Section */}
      <section ref={galleryRef} className="gallery">
      <h2>Gallery</h2>

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

      {/* FAQ Section Before Chatbot */}
                <div className="faq-section">
               <FAQ />
               </div>

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

        </div>
    );
};

export default FeaturedAgrovest;