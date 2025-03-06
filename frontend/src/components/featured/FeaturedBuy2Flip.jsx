import React from 'react';
import { Link } from 'react-router-dom';
import './FeaturedAgrovest.css';

import House1 from '../../assets/subscrptionimage.jpg';
import Bed1 from '../../assets/process.jpg';
import Kitchen from '../../assets/fruits.jpg';
import Bathroom from '../../assets/farm.jpg';
import LivingRoom from '../../assets/container.jpg';

const FeaturedBuy2Flip = () => {
    return (
        <div className='featured1'>
           <h1 className='featured-text'>Secure Your Future: Profitable Agricultural Investments in Nigeria!</h1>
           <p className='featured-text'>A dedicated investment scheme for agro-allied industries, including both crop and livestock investments.</p>
            
            {/* Image Grid */}
            {/* Image Grid */}
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

            {/* AgroVest Information */}
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

                <h3>Crop Investment Opportunities</h3>
                <ul>
                    <li><strong>Vegetables:</strong> Includes tomatoes, peppers, and onions, which are in constant demand.</li>
                    <li><strong>Grains:</strong> Covers maize, millet, sorghum, and other staple crops.</li>
                    <li><strong>Fruits & Others:</strong> A diverse range of crops with seasonal return potential.</li>
                </ul>
            </div>
        </div>
    );
};

export default FeaturedBuy2Flip;