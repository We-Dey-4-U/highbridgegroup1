import React from 'react';
import { Link } from 'react-router-dom';
import './FeaturedAgrovest.css';

import House1 from '../../assets/buy2flipbanner.jpg';
import Bed1 from '../../assets/webpic23.jpg';
import Kitchen from '../../assets/buy2flipbanner.jpg';
import Bathroom from '../../assets/buy2flipflier2.jpg';
import LivingRoom from '../../assets/container.jpg';

const FeaturedBuy2Flip = () => {
    return (
        <div className='featured1'>
           <h1 className='featured-text'>Maximize Your Returns with Buy2Flip Investments!</h1>
           <p className='featured-text'>A high-yield investment scheme focusing on short-term asset flipping for rapid profit realization.</p>
            
            {/* Image Grid */}
            <div className='container'>
                <figure className='span-3 image-grid-row-2'>
                    <img src={House1} alt='Buy2Flip Investments' />
                    <figcaption style={{ color: 'white' }}>Short-Term Property Flipping</figcaption>
                </figure>
                <figure>
                    <img src={Bed1} alt='Luxury Items' />
                    <figcaption style={{ color: 'white' }}>Luxury Goods Resale</figcaption>
                </figure>
                <figure>
                    <img src={LivingRoom} alt='Tech Gadgets' />
                    <figcaption style={{ color: 'white' }}>High-Demand Tech</figcaption>
                </figure>
                <figure>
                    <img src={Kitchen} alt='Automobiles' />
                    <figcaption style={{ color: 'white' }}>Vehicle Trading</figcaption>
                </figure>
                <figure>
                    <img src={Bathroom} alt='Retail Assets' />
                    <figcaption style={{ color: 'white' }}>Wholesale Bulk Trading</figcaption>
                </figure>
            </div>

            {/* Buy2Flip Information */}
            <div className="buy2flip-info">
            <h2>Buy2Flip Investment Scheme</h2>
            <p>Buy2Flip is a short-term, high-liquidity investment model that allows investors to acquire valuable assets and sell them at a predetermined profit within a set period. This strategy ensures quick returns and reduces long-term capital lock-in.</p>

            <h3>Highbridge Gardens Estate – Ibeju-Lekki</h3>
            <p>Buy2Flip provides investment opportunities in Highbridge Gardens Estate, Ibeju-Lekki, where investors can purchase land and resell it at a guaranteed higher price after a specified period.</p>

            <h3>Investment Plans</h3>
            <ul>
            <li><strong>6-Month Plan:</strong> Minimum N2,000,000 for 50sqm with 20% ROI.</li>
             <li><strong>12-Month Plan:</strong> Minimum N2,000,000 for 50sqm with 40% ROI.</li>
           </ul>
            <p>Upon confirmation of payment, investors receive:</p>
            <ul>
                <li><strong>Payment Receipt</strong></li>
                <li><strong>Contract of Sale</strong></li>
                <li><strong>Post-Dated Cheque</strong> (for buy-back at the agreed price)</li>
            </ul>

            <h3>Investment Flexibility</h3>
            <ul>
                <li>Investors have the option to retain their purchased plots after the maturity period.</li>
                <li>Dividends apply only to those who sell back their plots, not those who retain them.</li>
                <li>Early termination incurs a 20% charge, and all accrued profits are forfeited.</li>
            </ul>

            <h3>Refund Process</h3>
            <ul>
                <li>A written or email notice is required to initiate a refund request.</li>
                <li>Refunds are processed within 30 days, with an additional 21 days if necessary.</li>
                <li>A 20% deduction is applied for administrative, logistics, and agency fees.</li>
            </ul>

            <h3>Flipping Opportunities</h3>
            <ul>
                <li><strong>Real Estate:</strong> High-value property investments with quick resale.</li>
                <li><strong>Luxury Goods:</strong> Flipping high-end watches, designer bags, and jewelry.</li>
                <li><strong>Automobiles:</strong> Buying and reselling high-demand cars and motorcycles.</li>
                <li><strong>Electronics & Gadgets:</strong> Fast-moving smartphones, laptops, and gaming consoles.</li>
                <li><strong>Retail Bulk Trading:</strong> Wholesaling consumer goods with rapid resale cycles.</li>
            </ul>

            <h3>Key Benefits</h3>
            <ul>
                <li><strong>Guaranteed Resale Price:</strong> Fixed buy-back pricing minimizes risk.</li>
                <li><strong>High Liquidity:</strong> Funds are not locked for extended periods.</li>
                <li><strong>Diverse Investment Options:</strong> Multiple asset categories beyond real estate.</li>
                <li><strong>Transparent Process:</strong> Investors receive full documentation, including contracts and post-dated cheques.</li>
            </ul>
        </div>
        </div>
    );
};

export default FeaturedBuy2Flip;