import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AgrovestLandingPage.css"; // Ensure this CSS file exists
import Footer from "../components/Footer";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import FAQ from "../components/FAQ";
import SponsorSlider from "../components/SponsorSlider";
import { FaCommentDots } from "react-icons/fa"; // Import an icon from react-icons
import { motion } from "framer-motion";

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

const AgrovestLandingPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate(); // Add this line
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ 
    email: "", 
    phone: "", 
    name: "", 
    password: "", 
    referralCode: "" // <-- Added referralCode field
  });
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [submissionSuccess, setSubmissionSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isRegistering, setIsRegistering] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false); // Chatbot state

  //const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  //const [showLoginForm, setShowLoginForm] = useState(false);

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

  const toggleMobileNav = () => {
    setIsMobileNavOpen((prev) => !prev);
  };

  const toggleModal = () => setShowModal(!showModal);
  const switchForm = () => setIsRegistering(!isRegistering);


  const handleChange = (e) => {
    setUser(prev => {
      const updatedUser = { ...prev, [e.target.name]: e.target.value };
      console.log("Updated user state:", updatedUser); // Debugging
      return updatedUser;
    });
  };
  
  // Handle Login Input Change
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("User data being sent:", user); // Debugging
    try {
      console.log("Sending data:", user);
      const response = await axios.post("https://highbridgeapi-1.onrender.com/api/auth/register", user);
      setSubmissionSuccess(response.data.message);
      setUser({ email: "", phone: "", name: "", password: "", referralCode: "" }); // Reset fields
      
      // Switch to login form
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
      const response = await axios.post("http://localhost:5000/api/auth/login", loginData);
      console.log("Login response:", response.data); // Debugging
  
      const { token, user } = response.data;
  
      if (token && user) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user)); // Store user data
  
        const userRole = user.role; // Get user role from response
  
        // Redirect based on role
        if (userRole === "admin") {
          navigate("/admin/dashboard", { replace: true }); // Redirect admin
        } else {
          navigate(`/dashboard/${user.id}`, { replace: true }); // Redirect regular user
        }
      } else {
        console.log("No token or user received, possible error:", response.data);
        setSubmissionSuccess("Login failed. Invalid credentials.");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setSubmissionSuccess("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="landing-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div
          className="hero-background"
          style={{ backgroundImage: `url(${images[currentImage]})` }}
        />
        <div className="hero-content">
        <h1
  style={{
    color: "#fff",
  }}
>
  💰 Secure Your Future: Profitable Agricultural Investments in Nigeria! 🌾📈
</h1>
          <p></p>

          {/* Hero Links for Desktop */}
          <div className="hero-links">
  <Link to="/" className="transparent-btn1">
    Home
  </Link>
  <button className="transparent-btn1" onClick={scrollToAbout}>
    About Agrovest
  </button>
  <button className="transparent-btn1" onClick={scrollToGallery}>
    Gallery
  </button>
  <Link to="/payment" className="transparent-btn1">
    Payment Gateway
  </Link>
</div>

          {/* Transparent registration button centered */}
          {/* Register Button */}
          <div className="center-button-container">
            <button className="transparent-btn" onClick={toggleModal}>Register Now</button>
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
        <button onClick={() => { scrollToAbout(); toggleMobileNav(); }}>About Us</button>
        <button onClick={() => { scrollToGallery(); toggleMobileNav(); }}>Gallery</button>
        <Link to="/payment" onClick={toggleMobileNav}>paynow</Link>
      </div>

      <SponsorSlider />

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
    onClick={scrollToRegistration}
    style={{ backgroundColor: 'green', color: '#fff' }}
  >
    Register Now
  </button> and take the first step toward a prosperous future!
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




      {/* Features Section */}
      


      {/* Gallery Section */}
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


    {/* Modal for Registration/Login */}
    {showModal && (
        <div className="modal-overlay">
          <div className="modal">
          <button 
  style={{
    position: "absolute",
    top: "10px",
    right: "15px",
    fontSize: "20px",
    border: "none",
    background: "green", 
    color: "white",
    padding: "5px 10px",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "background 0.3s ease"
  }} 
  onClick={toggleModal}
>
  ×
</button>
            {isRegistering ? (
              <form onSubmit={handleSubmit} className="form-container">
                <h2 style={{ 
  textAlign: "center", 
  color: "black", 
  fontSize: "24px", 
  fontWeight: "bold", 
  marginBottom: "20px" 
}}>
  Register
</h2>
<input 
    type="text" 
    name="name" 
    value={user.name} 
    onChange={handleChange} 
    placeholder="Full Name" 
    required 
  />
  <input 
    type="email" 
    name="email" 
    value={user.email} 
    onChange={handleChange} 
    placeholder="Email" 
    required 
  />
  <input 
    type="text" 
    name="phone" 
    value={user.phone} 
    onChange={handleChange} 
    placeholder="Phone Number" 
    required 
  />
  <input 
    type="password" 
    name="password" 
    value={user.password} 
    onChange={handleChange} 
    placeholder="Password" 
    required 
  />
  <input 
    type="text" 
    name="referralCode" 
    value={user.referralCode} 
    onChange={handleChange} 
    placeholder="Referral Code (Optional)" 
  />
                <button type="submit" disabled={loading}>{loading ? "Processing..." : "Register"}</button>
                <p>Already have an account? <span onClick={switchForm} className="toggle-link">Login</span></p>
              </form>
            ) : (
              <form onSubmit={handleLoginSubmit} className="form-container">
                <h2 style={{ 
  textAlign: "center", 
  color: "black", 
  fontSize: "24px", 
  fontWeight: "bold", 
  marginBottom: "20px" 
}}>
  Login
</h2>
                <input type="email" name="email" placeholder="Email" value={loginData.email} onChange={handleLoginChange} required />
                <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} required />
                <button type="submit" disabled={loading}>{loading ? "Processing..." : "Login"}</button>
                <p>Don't have an account? <span onClick={switchForm} className="toggle-link">Register</span></p>
              </form>
            )}
          </div>
        </div>
      )}

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
      <Footer />
    </div>
  );
};

export default AgrovestLandingPage;


























