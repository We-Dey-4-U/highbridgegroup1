import React from "react";
import { Link } from "react-router-dom";
import "./FeaturedPropertySection.css";

const FeaturedPropertySection2= () => {
  return (
    <section className="featured-properties">
      <h2>Our Selling Estates</h2>
      <div className="property-grid">
      <Link to="/heaven" className="property-card">
  <div className="property-inner">
    <div className="property-front" style={{ overflow: "hidden" }}>
      <img 
        src="/assets/images/haven/haven45.jpg" 
        alt="Highbridge Heaven" 
        style={{ 
          width: "100%", 
          height: "100%", 
          objectFit: "cover", 
          objectPosition: "center" 
        }} 
      />
    </div>
    <div className="property-back">
      <h3>HIGHBRIDGE Haven</h3> {/* Added "Hi" header */}
      <div className="property-description">
        <p>Experience the luxury of Highbridge Heaven with modern amenities and serene views.</p>
      </div>
      <p>View Full Details</p>
    </div>
  </div>
</Link>

       
        <Link to="/residence" className="property-card">
  <div className="property-inner">
    <div className="property-front">
      <img src="/assets/images/residences/residence.jpg" alt="Highbridge Residences" />
    </div>
    <div className="property-back">
      <h3>HIGHBRIDGE Residence ESTATE</h3> {/* Added "Hi" header */}
      <div className="property-description">
        <p>Highbridge Residences offer contemporary living spaces in a prime location.</p>
      </div>
      <p>View Full Details</p>
    </div>
  </div>
</Link>

        <Link to="/highbridge-county" className="property-card">
          <div className="property-inner">
            <div className="property-front">
              <img src="/assets/images/county/COUNTY.jpg" alt="Highbridge County" />
            </div>
            <div className="property-back">
            <h3>HIGHBRIDGE County ESTATE</h3> {/* Added "Hi" header */}
              <div className="property-description">
                <p>Discover Highbridge County, where elegance meets nature's tranquility.</p>
              </div>
              <p>View Full Details</p>
            </div>
          </div>
        </Link>

        <Link to="/highbridge-manor" className="property-card">
          <div className="property-inner">
            <div className="property-front">
              <img src="/assets/images/featured-property2.jpg" alt="HighBridge Manor" />
            </div>
            <div className="property-back">
            <h3>HIGHBRIDGE Manor ESTATE</h3> {/* Added "Hi" header */}
              <div className="property-description">
                <p>HighBridge Manor offers timeless charm and unmatched comfort.</p>
              </div>
              <p>View Full Details</p>
            </div>
          </div>
        </Link>

        <Link to="/magistic-lagos" className="property-card">
          <div className="property-inner">
            <div className="property-front">
              <img src="/assets/images/magestic/magestic.jpg" alt="Magestic Lagos" />
            </div>
            <div className="property-back">
            <h3> Magistic-lagos</h3> {/* Added "Hi" header */}
              <div className="property-description">
                <p>Experience vibrant living in Magistic Lagos, where city life meets serenity.</p>
              </div>
              <p>View Full Details</p>
            </div>
          </div>
        </Link>

        <Link to="/farmcity" className="property-card">
          <div className="property-inner">
            <div className="property-front">
              <img src="/assets/images/farmcity/farmcity.jpg" alt="Highbridge Farmcity" />
            </div>
            <div className="property-back">
            <h3>HIGHBRIDGE Farmcity</h3> {/* Added "Hi" header */}
              <div className="property-description">
                <p>Live in harmony with nature at Highbridge Farmcity, your escape to peace.</p>
              </div>
              <p>View Full Details</p>
            </div>
          </div>
        </Link>

        <Link to="/garden" className="property-card">
          <div className="property-inner">
            <div className="property-front">
              <img src="/assets/images/farmcity/farmcit.jpg" alt="Highbridge Garden" />
            </div>
            <div className="property-back">
            <h3> Garden ESTATE</h3> {/* Added "Hi" header */}
              <div className="property-description">
                <p>Relax and unwind in the lush greenery of Highbridge Garden.</p>
              </div>
              <p>View Full Details</p>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedPropertySection2;