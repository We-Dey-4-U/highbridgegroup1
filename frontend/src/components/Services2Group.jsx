import React from 'react';
import './Services2.css'; // Include the custom styles

const servicesList = [
  {
    icon: 'fas fa-pencil-ruler',
    title: 'Architectural Design',
    description: 'We create innovative and practical architectural designs tailored to meet your unique vision and needs.',
  },
  {
    icon: 'fas fa-hammer',
    title: 'Building Construction',
    description: 'From concept to completion, we deliver top-notch building construction services with quality and efficiency.',
  },
  {
    icon: 'fas fa-cogs',
    title: 'Facility Management',
    description: 'Ensure your property remains in peak condition with our comprehensive facility management solutions.',
  },
  {
    icon: 'fas fa-landmark',
    title: 'Land Banking',
    description: 'Secure your financial future with strategic land banking opportunities in prime locations.',
  },
  {
    icon: 'fas fa-building',
    title: 'Real Estate Development',
    description: 'We transform spaces with modern and sustainable real estate development projects.',
  },
  {
    icon: 'fas fa-comments',
    title: 'Real Estate Consultancy',
    description: 'Leverage our expertise to make informed decisions in buying, selling, and investing in real estate.',
  },
];

const Services2Group = () => {
  return (
    <div className="services">
      <h2 className="services-title">Our Services</h2>
      <div className="services-container">
        {servicesList.map((service, index) => (
          <div key={index} className="service-card">
            <i className={service.icon}></i>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <a href="/service-details" className="service-btn">View Full Details</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services2Group;