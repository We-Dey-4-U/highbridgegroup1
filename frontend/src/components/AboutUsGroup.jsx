import React, { useState } from "react";
import "./AboutUsGroup.css"; 
import { AiOutlineStar } from "react-icons/ai"; 
import awardImg from "../assets/award.jpg";
import NavbarGroup from "./NavbarGroup"; // Import NavbarGroup
import FooterGroup from "./FooterGroup"; // Import FooterGroup
import SponsorSliderGroup from "./SponsorSliderGroup"; // Import SponsorSliderGroup

const aboutUsData = [
  {
    id: 2,
    title: "Our Vision",
    content:
      "To be the foremost Nigerian conglomerate, connecting local and global clients with innovative, sustainable, and high-value opportunities in real estate, energy, agriculture, and investments",
  },
  {
    id: 1,
    title: "Our Mission",
    content:
      "We empower individuals and businesses by delivering exceptional, technology-driven solutions across our industries. With integrity, expertise, and a client-first approach, we create wealth, drive economic growth, and build lasting value for Nigerians at home, abroad, and global investors",
  },
  {
    id: 3,
    title: "Our Objectives",
    content: [
      "Deliver Excellence: provide best in class services that set industry benchmarks.",
      "Empower Clients: Offer seamless investment and business opportunities tailored for Nigerians.",
      "Drive Innovation: Leverage cutting-edge technology to enhance efficiency, scalability, and sustainability.",
      "Foster Economic Growth: Create jobs, support communities, and contribute to national and global development.",
      "Maximize Synergy: Align all Highbridge subsidiaries for efficiency, growth, and long-term value creation.",
    ],
  },
  {
    id: 4,
    title: "Our Core Values",
    content: [
      "Integrity: We uphold the highest ethical standards, ensuring trust, transparency, and accountability in all our dealings.",
      "Innovation: We embrace creativity and technology to drive excellence, efficiency, and continuous improvement across all sectors we operate in.",
      "Intelligence: We apply strategic thinking, data-driven insights, and expertise to deliver exceptional solutions that meet global standards.",
      "Customer-Centricity: Our clients are at the heart of everything we do. We are committed to understanding their needs and exceeding expectations.",
      "Sustainability: We prioritize responsible and sustainable practices, ensuring long-term value for our stakeholders and the environment.",
      "Collaboration: We believe in teamwork, partnerships, and shared success, working with employees, clients, and stakeholders to achieve collective goals.",
      "Excellence: We set high standards and strive for exceptional quality in our services, products, and overall business operations.",
    ],
  },
  {
    id: 5,
    title: "Our Awards & Recognitions",
    image: awardImg,
    content: [
      "2016: Youngest Developer Award.",
      "2019: National Outstanding Leadership.",
      "2020: Excellence Icon Award.",
      "2021: Affordable Real Estate Promoter of the Year Award.",
      "2022: Fastest Growing Real Estate of the Year Award.",
    ],
    isAward: true,
  },
  {
    id: 6,
    title: "Award Video",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
    content: "Watch our awards video to see our achievements and recognitions.",
  },
];

const AboutUsGroup = () => {
  const [selectedTab, setSelectedTab] = useState("All");

  const filteredContent =
    selectedTab === "All"
      ? aboutUsData
      : aboutUsData.filter((section) => section.title === selectedTab);

  return (
    <>
      {/* Navbar at the top */}
      <NavbarGroup />

      <div className="about-container1">
        <h2 className="about-title">About Us - Highbridge Group</h2>

        <div className="about-tabs1">
          <button
            className={selectedTab === "All" ? "active" : ""}
            onClick={() => setSelectedTab("All")}
          >
            All
          </button>
          {aboutUsData.map(({ title, id }) => (
            <button
              key={id}
              className={selectedTab === title ? "active" : ""}
              onClick={() => setSelectedTab(title)}
            >
              {title}
            </button>
          ))}
        </div>

        <div className="about-sections1">
          {filteredContent.map(({ id, title, image, content, videoUrl, isAward }) => (
            <div key={id} className="about-section1">
              <h3 className="about-heading1">{title}</h3>

              {image && <img src={image} alt={title} className="about-image1" />}

              {videoUrl && (
                <div className="video-container">
                  <iframe
                    width="100%"
                    height="315"
                    src={videoUrl}
                    title="YouTube video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              {Array.isArray(content) ? (
                <ul className="about-list">
                  {content.map((item, index) => {
                    if (isAward) {
                      return (
                        <li key={index} className="about-text">
                          <AiOutlineStar className="award-star" /> {item}
                        </li>
                      );
                    } else if (item.includes(":")) {
                      const words = item.split(":");
                      return (
                        <li key={index} className="about-text">
                          <span className="highlight1">{words[0]}:</span> {words.slice(1).join(":")}
                        </li>
                      );
                    } else {
                      return <li key={index} className="about-text">{item}</li>;
                    }
                  })}
                </ul>
              ) : (
                <p className="about-text1">{content}</p>
              )}
            </div>
          ))}
        </div>
      </div>
       {/* Sponsor Slider before Footer */}
       <SponsorSliderGroup />

      {/* Footer at the bottom */}
      <FooterGroup />
    </>
  );
};

export default AboutUsGroup;