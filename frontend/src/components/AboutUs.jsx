import React from 'react';
import { AiOutlineStar } from 'react-icons/ai'; // Importing a bold star icon
import './AboutUs.css';

const AboutUs = () => {
  return (
    <section className="about-us">
      <div className="container">
        <div className="about-us-content">
          <div className="text-content">
            <h1>About Us</h1>
            <p>
           Welcome to  Highbridge Group  a leading Nigerian conglomerate dedicated to connecting local and
             global clients with high-value opportunities across real estate, energy, agriculture,
              and investments. Committed to innovation, sustainability, and excellence, we empower 
              individuals and businesses with technology-driven solutions that foster economic growth 
              and long-term value creation. Guided by integrity, expertise, and a client-first approach,
               we set industry benchmarks while driving development and wealth creation for Nigerians and 
               global investors. Through our subsidiaries, we leverage synergy, strategic partnerships,
                and cutting-edge technology to shape a better future.
            </p>

            <div className="iframe-container">
              <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/vkF__wRUFKA" 
                title="Highbridge Homes Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
              </iframe>
            </div>

            <div className="our-values">
              <h2>Our Vision At Highbridge groups Limited</h2>
              <p>
              To be the foremost Nigerian conglomerate, connecting local and global clients with 
              innovative, sustainable, and high-value opportunities in real estate, energy, agriculture, 
              and investments.
              </p>
              <h2>Our Mission</h2>
              <p>
              We empower individuals and businesses by delivering exceptional, technology-driven solutions 
              across our industries. With integrity, expertise, and a client-first approach, we create wealth, 
              drive economic growth, and build lasting value for Nigerians at home, abroad, and global 
              investors.  
              </p>

              {/* Our Objectives Section */}
              <h2>Our Objectives</h2>
              <p>
              At Highbridge Group, we are committed to achieving key objectives that drive excellence
               across our diverse business sectors. From luxury real estate and sustainable energy 
               solutions to agricultural investments and strategic business ventures, our mission is
                to provide innovative solutions and exceptional service. These objectives reinforce our
                 vision of being a trusted leader in multiple industries while ensuring we meet the unique 
                 needs of every client
              </p>
              <ul className="objectives-list">
                <li><AiOutlineStar className="objective-icon" /> To provide exceptional customer service with a focus on personalized attention.</li>
                <li><AiOutlineStar className="objective-icon" /> To build homes that promote sustainable living, reducing environmental impact.</li>
                <li><AiOutlineStar className="objective-icon" /> To create innovative designs that combine modern living with comfort and luxury.</li>
                <li><AiOutlineStar className="objective-icon" /> To continuously improve our processes to deliver homes faster and more efficiently.</li>
                <li><AiOutlineStar className="objective-icon" /> To foster strong relationships with clients and partners, based on trust and transparency.</li>
                <li><AiOutlineStar className="objective-icon" /> To contribute positively to the communities we serve through corporate social responsibility initiatives.</li>
              </ul>

              {/* Our Awards Section */}
              <h2>Our Awards</h2>
              <p>
                Over the years, Highbridge Homes has received several prestigious awards for our dedication to excellence, 
                innovation, and commitment to the real estate sector. Here are some of the awards we've proudly received:
              </p>

              {/* Image after the Awards Section */}
              <div className="image-after-awards">
                <img src="/assets/images/award/awardpics.jpg" alt="Highbridge Homes" />
              </div>
              <ul className="awards-list">
                <li><AiOutlineStar className="award-icon" /> <span className="award-year">2016</span> - Youngest Developer Award</li>
                <li><AiOutlineStar className="award-icon" /> <span className="award-year">2019</span> - National Outstanding Leadership</li>
                <li><AiOutlineStar className="award-icon" /> <span className="award-year">2020</span> - Excellence Icony Award</li>
                <li><AiOutlineStar className="award-icon" /> <span className="award-year">2021</span> - Affordable Real Estate Promoter of the Year Award</li>
                <li><AiOutlineStar className="award-icon" /> <span className="award-year">2022</span> - Fastest Growing Real Estate of the Year Award</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;