import React, { useState } from "react";
import "./LatestNews.css"; // Import CSS file

const newsData = [
  {
    id: 1,
    title: "Highbridge Group Expands Real Estate Portfolio",
    category: "Real Estate",
    image: "/assets/images/hero/heroimage1.jpg",
    shortDescription: "Highbridge Group announces a new luxury residential project...",
    fullArticle: [
      "Highbridge Group is expanding its real estate portfolio with a new luxury residential project in the heart of the city.",
      "This initiative aims to provide affordable yet modern living spaces, equipped with eco-friendly technology.",
      "With the growing demand for sustainable housing, Highbridge is committed to delivering energy-efficient homes that blend comfort and innovation.",
      "The project is expected to be completed by mid-2026, offering a mix of residential and commercial spaces."
    ],
    date: "March 1, 2025",
  },
  {
    id: 2,
    title: "FlipVest Launches New Agro-Investment Plans",
    category: "Agriculture",
    image: "/assets/images/hero/heroimage4.jpg",
    shortDescription: "FlipVest introduces investment options for sustainable farming...",
    fullArticle: [
      "FlipVest, a subsidiary of Highbridge Group, has officially launched Agrovest, an innovative agricultural investment program designed to provide individuals and organizations with high-return opportunities in Nigeria’s agricultural sector. This initiative, developed in partnership with the Ministry of Agriculture, focuses on sustainable farming practices while offering lucrative investment plans.",
      "What is Agrovest?",
      "Agrovest is a strategic investment platform that enables investors to fund large-scale agricultural projects, ensuring guaranteed returns while supporting national food security and economic growth. The investment initiative operates in Farmcity Cooperatives Estate, Ishiwo, and encompasses multiple agricultural sectors, including crop farming, livestock farming, aquaculture, and agro-processing.",
      "Investment Plans & Returns",
      "FlipVest offers four structured investment plans, each providing competitive returns on investment (ROI):",
      ". 6-Month Plan: Minimum investment of ₦500,000, ROI 25% (Maximum investment: ₦10 million)",
      ". 9-Month Plan: Minimum investment of ₦500,000, ROI 30%",
      ". 12-Month Plan: Minimum investment of ₦500,000, ROI 50%",
      ". 18-Month Plan: Minimum investment of ₦500,000, ROI 75%",

      "There is no maximum investment limit for the 9-month, 12-month, and 18-month plans.",
      "How Secure is the Investment?",
      "To ensure transparency, security, and profitability, Agrovest operates under a strong risk management framework, with government backing from the Ministry of Agriculture. Every investment is professionally managed with high productivity standards to minimize risks and maximize returns.",
      "What You Receive After Investment?",
      "Once payment is confirmed, investors receive:",
      "1 Payment Receipt – Confirmation of your investment.",
      "2 Deed of Investment – A legally binding document securing your investment.",
      "3 Post-Dated Cheque – Guaranteeing your ROI upon maturity.",
      "How Are Returns Paid Out?",
      "Investors will receive full returns at the end of their selected investment period via bank transfer or cheque issuance.",
      "Can You Withdraw Before the Investment Term Ends?",
      "Early withdrawals are generally not allowed to maintain project stability. However, in exceptional cases, the investment management team can review withdrawal requests.",
      "No Hidden Fees or Charges",
      "This move by FlipVest aligns with Highbridge Group’s mission to revolutionize the agricultural sector through modern investment strategies and sustainable farming practices. Don't miss out on this opportunity to grow your wealth while contributing to food security and economic development!"
    ],
    date: "February 28, 2025",
  },
  {
    id: 3,
    title: "Highbridge Energy & Tech Advances Solar Solutions",
    category: "Solar Energy",
    image: "/assets/images/hero/energy.jpg",
    shortDescription: "New solar technology developed by Highbridge Energy & Tech...",
    "fullArticle": [
    "In a bold step towards a more sustainable future, Highbridge Energy & Tech, a subsidiary of Highbridge Group, has unveiled its latest innovation in solar power technology. This breakthrough aims to revolutionize renewable energy solutions, making solar power more efficient, affordable, and accessible for both residential and commercial use.",
    "As the global demand for clean and sustainable energy grows, Highbridge Energy & Tech has introduced cutting-edge solar panels designed to maximize energy absorption while minimizing energy loss. By integrating advanced nanotechnology, the new solar panels boast higher efficiency rates, allowing for increased electricity generation even in low-light conditions.",
    "With rising energy costs and the growing impact of climate change, solar energy offers a viable alternative to fossil fuels. Unlike traditional energy sources, solar power is clean, renewable, and cost-effective over time. Highbridge Energy & Tech is committed to empowering homes and businesses by reducing dependence on expensive, non-renewable energy sources.",
    "Key Benefits of Highbridge’s Solar Technology:",
    "- Higher Efficiency: Nanotechnology-enhanced solar panels significantly increase absorption rates, ensuring optimal power generation.",
    "- Cost Savings: Businesses and homeowners can reduce their electricity bills while benefiting from government incentives for renewable energy adoption.",
    "- Sustainable and Eco-Friendly: Solar energy eliminates carbon emissions, contributing to a healthier planet and helping reduce the effects of global warming.",
    "- Reliable Power Supply: With an efficient solar energy system, homes and businesses can maintain uninterrupted power, even in remote locations.",
    "Highbridge Energy & Tech is actively working to make solar energy more accessible across Nigeria and beyond. By partnering with local governments and private sector stakeholders, the company is helping to implement solar energy projects that provide affordable and clean electricity to underserved communities.",
    "Additionally, Highbridge is investing in solar storage solutions, ensuring that solar power remains available even at night or during cloudy days. Their next-generation battery storage technology improves energy retention, allowing users to store excess power for later use.",
    "Nigeria, like many developing nations, faces energy shortages and unreliable power supply. With abundant sunlight available year-round, solar power presents an ideal solution for energy challenges in both urban and rural areas. Highbridge Energy & Tech’s solar innovations can help reduce dependency on generators, lower electricity costs, and support national efforts toward renewable energy adoption.",
    "Highbridge Energy & Tech is not just providing solar panels—it’s pioneering a renewable energy revolution. By investing in research, development, and large-scale solar projects, the company aims to drive long-term sustainability and create a future where clean energy is the norm, not the exception.",
    "For homeowners, businesses, and communities looking for reliable, cost-effective, and environmentally friendly energy solutions, Highbridge’s latest solar technology offers a powerful step forward.",
    "Join the solar revolution today—power your future with Highbridge Energy & Tech!"
  ],
    date: "February 27, 2025",
  },
];

const LatestNews = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedArticle, setExpandedArticle] = useState(null);

  const filteredNews =
    selectedCategory === "All"
      ? newsData
      : newsData.filter((news) => news.category === selectedCategory);

  const toggleReadMore = (id) => {
    setExpandedArticle(expandedArticle === id ? null : id);
  };

  return (
    <div className="news-container">
      <h2 className="news-title">Latest News & Updates - Highbridge Group</h2>

      <div className="news-tabs">
        <button className={selectedCategory === "All" ? "active" : ""} onClick={() => setSelectedCategory("All")}>All</button>
        <button className={selectedCategory === "Real Estate" ? "active" : ""} onClick={() => setSelectedCategory("Real Estate")}>Real Estate</button>
        <button className={selectedCategory === "Agriculture" ? "active" : ""} onClick={() => setSelectedCategory("Agriculture")}>Agriculture</button>
        <button className={selectedCategory === "Solar Energy" ? "active" : ""} onClick={() => setSelectedCategory("Solar Energy")}>Solar Energy</button>
      </div>

      <div className="news-list">
        {filteredNews.map(({ id, title, image, shortDescription, fullArticle, date }) => (
          <div key={id} className="news-card">
            <img src={image} alt={title} className="news-image" />
            <h3 className="news-heading">{title}</h3>
            <p className="news-date">{date}</p>
            
            {expandedArticle === id ? (
              <div className="news-full-article">
                {fullArticle.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            ) : (
              <p className="news-description">{shortDescription}</p>
            )}

            <button className="read-more-btn" onClick={() => toggleReadMore(id)}>
              {expandedArticle === id ? "Read Less" : "Read More"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;