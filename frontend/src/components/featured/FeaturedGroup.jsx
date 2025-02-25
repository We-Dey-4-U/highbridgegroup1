import React from 'react';
import { Link } from 'react-router-dom'; // Add this import

import './Featured.css';

import House1 from '../../assets/house1.jpg';
import AboutImage from '../../assets/about-us.jpg';
import Bed1 from '../../assets/bed1.jpg';
import Kitchen from '../../assets/kitchen.jpg';
import Bathroom from '../../assets/bath1.jpg';
import LivingRoom from '../../assets/living-room.jpg';

const FeaturedGroup = () => {
    return (
        <div className='featured'>
            <h1 className='featured-text'>Top Featured Listings</h1>
            <p className='featured-text'>Selected listings by City, State, & Zip based on views.</p>
            <div className='container'>
                <img className='span-3 image-grid-row-2' src={House1} alt='' />
                <img src={Bed1} alt='' />
                <img src={LivingRoom} alt='' />
                <img src={Kitchen} alt='' />
                <img src={Bathroom} alt='' />
                <div className='span-3 img-details'>
                <div className='top'>
  <h2 style={{ color: 'black' }}>Abijo G.R.A, Ibeju-Lekki, Lagos State</h2>
  <p>Outright Payment Only</p>
  <p className='price'>₦70,000,000</p>
</div>
                    <div className='info-grid'>
                        <div>
                            <div className='info'>
                                <p className='bold'>2-Bedroom Terrace Duplex + BQ:</p><p></p>
                            </div>
                            <div className='info'>
                                <p className='bold'> </p><p></p>
                            </div>
                        </div>
                        <div>
                            <div className='info'>
                                <p className='bold'>Est Payment:</p><p>₦70,000,000</p>
                            </div>
                            <div className='info'>
                                <p className='bold'>Est Payment:</p><p>₦80,000,000</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='span-2 right-img-details'>
                    <p>Highbridge Residence offers luxury and comfort with premium terrace duplex apartments, located in a strategic area. Features include perimeter fencing, motorable roads, 24/7 security surveillance, and a nearby beach in the estate.</p>
                    <a href="/residence" className="btn" style={{
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
    View Full Details
</a>
                </div>
            </div>
        </div>
    );
};

export default FeaturedGroup;