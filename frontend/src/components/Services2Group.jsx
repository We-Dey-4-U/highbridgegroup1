import React from 'react';
import './Services2.css'; // Include the custom styles

const servicesList = [
  {
    icon: 'fas fa-home',
    title: 'Homes',
    description: 'Providing top-notch real estate solutions tailored to meet modern housing needs.',
    image: '/assets/images/hero/heroimage1.jpg', // Add appropriate image path
    link: '/HighbridgeHomes',
  },
  {
    icon: 'fas fa-seedling',
    title: 'Flipvest',
    description: 'Secure agricultural investments with high returns through sustainable farming with higbridge flipvest.',
    image: '/assets/images/hero/heroimage4.jpg',
    link: '/flipvest',
  },
  {
    icon: 'fas fa-bolt',
    title: 'Energy Solutions',
    description: 'Innovative renewable energy solutions for homes and businesses.',
    image: '/assets/images/hero/energy.jpg',
    link: 'http://www.highbridgeenergyltd.com', // External URL
  },
  {
    icon: 'fas fa-gem', // Luxury and exclusivity
    title: 'Luxury',
    description: 'Experience the pinnacle of elegance and comfort with our premium real estate solutions.',
    image: '/assets/images/hero/luxury2.jpg',
    link: 'https://highbridgeluxury.com/', // External URL
  },
 
];


const Services2Group = () => {
    return (
      <div className="services">
        <h2 className="services-title">Our Diverse Business Portfolio</h2>
        <div className="services-container">
          {servicesList.map((service, index) => (
            <div key={index} className="service-card">
              <img src={service.image} alt={service.title} className="service-image" />
              <i className={service.icon}></i>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href={service.link} className="service-btn">View Full Details</a>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Services2Group;