import React from 'react';
import { Link } from 'react-router-dom';
import './Featured.css';



import House1 from '../../assets/hand.jpg';
import Bed1 from '../../assets/energy.jpg';
import Kitchen from '../../assets/sweethouse.jpg';
import Bathroom from '../../assets/bath1.jpg';
import LivingRoom from '../../assets/subscrptionimage.jpg';

const FeaturedGroup = () => {
    return (
        <div className='featured'>
            <h1 className='featured-text'>Highbridge Group Featured Products</h1>
            <p className='featured-text'>Showcasing premium investment opportunities across real estate, agriculture, energy, and technology.</p>
            <div className='container'>
                <img className='span-3 image-grid-row-2' src={House1} alt='Featured Property' />
                <img src={Bed1} alt='Bedroom' />
                <img src={LivingRoom} alt='Living Room' />
                <img src={Kitchen} alt='Kitchen' />
                <img src={Bathroom} alt='Bathroom' />
                <div className='span-3 img-details'>
                    
                    <div className='info-grid'>
                    </div>
                </div>
                <div className='span-2 right-img-details'>
                <p style={{ color: 'white' }}>
                  Highbridge Group offers top-tier investment opportunities, including premium residential developments, cutting-edge agribusiness ventures, and innovative energy solutions. Our commitment to quality, sustainability, and strategic growth ensures long-term value for investors.
                 </p>
                    <a href="/flipvest" className="btn" style={{
                        display: 'inline-block',
                        padding: '10px 20px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        textAlign: 'center',
                        textDecoration: 'none',
                        borderRadius: '5px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease'
                    }} onMouseEnter={(e) => e.target.style.backgroundColor = '#218838'} onMouseLeave={(e) => e.target.style.backgroundColor = '#28a745'}>
                        View More Opportunities
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FeaturedGroup;