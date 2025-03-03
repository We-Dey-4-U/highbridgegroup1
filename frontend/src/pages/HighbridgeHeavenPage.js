import React, { useState } from "react";
import Navbar from "../components/Navbar"; // Adjust the path as per your folder structure
import Footer from "../components/Footer"; // Adjust the path as per your folder structure
import { FaMapMarkerAlt, FaShieldAlt, FaRoad, FaFaucet, FaLightbulb, FaUmbrellaBeach } from "react-icons/fa";

const HighbridgeHeavenPage = () => {
  const [mainImg, setMainImg] = useState(
    "/assets/images/haven/haven45.jpg"
  );

  const smallImages = [
    "/assets/images/highbridge-heaven-1.jpg",
    "/assets/images/highbridge-heaven-2.jpg",
    "/assets/images/highbridge-heaven-3.jpg",
    "/assets/images/highbridge-heaven-main.jpg",
  ];

  const handleImageClick = (img) => {
    setMainImg(img);
  };

  return (
    <>
      <Navbar />
      <section
        id="propertydetails"
        style={{
          display: "flex",
          flexWrap: "wrap",
          color: "#000",
          padding: "20px",
          gap: "20px",
        }}
      >
        {/* Main Image Preview */}
        <div
          className="single-pro-image"
          style={{
            flex: "1 1 400px",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          <img
            src={mainImg}
            alt="Main Preview"
            style={{
              width: "100%",
              maxHeight: "300px",  // Adjust the height as needed
              borderRadius: "8px",
              marginBottom: "10px",
            }}
          />

          {/* Small Image Thumbnails */}
          <div
            className="small-img-group"
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {smallImages.map((img, index) => (
              <div
                className="small-img-col"
                key={index}
                onClick={() => handleImageClick(img)}
                style={{
                  cursor: "pointer",
                  flex: "1 1 80px",
                  maxWidth: "80px",
                }}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index}`}
                  style={{
                    width: "100%",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Property Details */}
        <div
          className="single-pro-details"
          style={{
            flex: "1 1 300px",
            minWidth: "300px",
          }}
        >
          <h6>Highbridge Haven</h6>
          <h4>Prime Land Investment</h4>

          {/* Pre-launch Offer */}
  <p style={{
    color: "red", 
    fontWeight: "bold", 
    marginTop: "10px", 
    marginBottom: "20px",
  }}>
    Pre-launch Offer Available!
  </p>

          <div style={{ marginBottom: "10px" }}>
            <span style={{ fontWeight: "bold" }}>Location:</span>
            <span> Ketu-Omu, Epe Lagos</span>
          </div>

          <button
            onClick={() => (window.location.href = "/contact")}
            style={{
              padding: "10px 20px",
              background: "green", // Changed background color to green
              color: "#fff",
              border: "none",
              cursor: "pointer",
              borderRadius: "4px",
              width: "100%",
            }}
          >
            Contact Agent
          </button>

          <h4 style={{ marginTop: "20px" }}>Pricing</h4>
          <ul>
            <li>250sqm: ₦1,750,000</li>
            <li>350sqm: ₦2,450,000</li>
            <li>450sqm: ₦3,150,000</li>
            <li>550sqm: ₦3,850,000</li>
            <li>Commercial Plot 1000sqm: ₦13,500,000</li>
          </ul>
          <p>Payment Plan: Up to 12 months available</p>

          <h4 style={{ marginTop: "20px" }}>Landmarks</h4>
          <ul>
            <li>
              <FaMapMarkerAlt style={{ marginRight: "8px", color: "#FF6347" }} />
              Lagos State Food Security System
            </li>
            <li>
              <FaMapMarkerAlt style={{ marginRight: "8px", color: "#FF6347" }} />
              Lagos State Film City
            </li>
            <li>
              <FaMapMarkerAlt style={{ marginRight: "8px", color: "#FF6347" }} />
              Epe Resort and Spa
            </li>
            <li>
              <FaMapMarkerAlt style={{ marginRight: "8px", color: "#FF6347" }} />
              Grace Polytechnics
            </li>
          </ul>

          <h4 style={{ marginTop: "20px" }}>Features</h4>
          <ul>
            <li>
              <FaRoad style={{ marginRight: "8px", color: "#32CD32" }} />
              Motorable Road
            </li>
            <li>
              <FaShieldAlt style={{ marginRight: "8px", color: "#FFD700" }} />
              Security
            </li>
            <li>
              <FaFaucet style={{ marginRight: "8px", color: "#1E90FF" }} />
              Portable Water
            </li>
            <li>
              <FaLightbulb style={{ marginRight: "8px", color: "#FFA500" }} />
              Street Lights
            </li>
            <li>
              <FaUmbrellaBeach style={{ marginRight: "8px", color: "#87CEEB" }} />
              Good Drainage System
            </li>
            <li>
              <FaShieldAlt style={{ marginRight: "8px", color: "#FFD700" }} />
              Perimeter Fencing
            </li>
          </ul>

          <h4 style={{ marginTop: "20px" }}>Description</h4>
          <p>
            Highbridge Haven offers an exceptional opportunity to own prime land
            in the tranquil environment of Ketu-Omu, Epe Lagos. Surrounded by
            notable landmarks like Lagos State Food Security System and Epe
            Resort, this estate is ideal for residential and commercial
            purposes. Flexible payment plans up to 12 months make this a smart
            choice for investors and homeowners alike.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default HighbridgeHeavenPage;