import React, { useState } from "react";
import "./FAQ.css"; // Import the CSS file for styling

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="container">
        <div className="faq-header">
          <h5 className="subtitle">FAQ</h5>
          <h2 className="title">Frequently Asked Questions</h2>
        </div>
        <div className="faq-list">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
            >
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <span>{faq.question}</span>
                <button className="toggle-btn">
                  {activeIndex === index ? "-" : "+"}
                </button>
              </div>
              {activeIndex === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const faqData = [
  { question: "What is FLIPVEST Ltd?", answer: "FLIPVEST LTD is a subsidiary of HIGHBRIDGE GROUP, while AGROVEST represents its agricultural investment product." },
  { question: "What is AGROVEST?", answer: "AGROVEST is an agricultural investment offering individuals and organizations the opportunity to invest in sustainable agricultural projects in Nigeria. It is a partnership between Highbridge FLIPVEST Ltd and the Ministry of Agriculture." },
  { question: "Which estate is involved in AGROVEST?", answer: "Farmcity Cooperatives Estate, Ishiwo." },
  { 
    question: "What are the investment options and their respective ROIs?", 
    answer: `We offer:
      - 6-Month Plan: Minimum N500,000 with 25% ROI.
      - 9-Month Plan: Minimum N500,000 with 30% ROI.
      - 12-Month Plan: Minimum N500,000 with 50% ROI.
      - 18-Month Plan: Minimum N500,000 with an ROI of 75%.`  
  },
  { question: "What is the maximum amount required to invest?", answer: "The maximum for the 6-month plan is N10,000,000, while there is no maximum for 9, 12, and 18-month plans." },
  { question: "What do I get after payment?", answer: "Once payment is confirmed, you will receive a Payment Receipt, Deed of Contract, and a Post-dated Cheque." },
  { question: "How will the returns be paid out?", answer: "Returns are paid at the end of the investment period via bank transfer or cheque issuance." },
  { question: "What types of agriculture projects are involved?", answer: "Projects include crop farming (vegetables, fruits, grains), livestock farming, aquaculture, and agro-processing, managed in collaboration with the Ministry of Agriculture." },
  { question: "How is my investment secured?", answer: "Investments are secured through experienced project management, government collaboration, and a strong risk management framework." },
  { question: "Can I withdraw my investment before the end of the term?", answer: "Early withdrawal is generally not permitted, but exceptional cases may be reviewed by the investment management team." },
  { question: "Are there any additional fees or charges?", answer: "No hidden fees. The ROI quoted is the net return on your investment." },
  { question: "What happens if the project does not meet the projected ROI?", answer: "AGROVEST, in collaboration with the Ministry of Agriculture, will work with investors to find a satisfactory resolution in case of unforeseen challenges." },
  { question: "How do I get started with the investment plan?", answer: "Contact Highbridge FLIPVEST Ltd or visit our Lagos office. Our team will assist you in selecting and completing your investment plan." },
  { question: "Is this investment plan available to individuals outside of Nigeria?", answer: "Yes, both local and international investors can participate in this agricultural investment opportunity in Lagos, Nigeria." },
  {
    question: "How do I register and invest in Agrovest?",
    answer: `To register and invest in Agrovest, follow these steps:
      1. Visit our official website and click on the "Register Now" button.
      2. Fill in your details, including full name, email, phone number, and password.
      3. Verify your email by clicking the confirmation link sent to your inbox.
      4. Log in to your account using your registered email and password.
      5. Complete your KYC verification by submitting your required documents.
      6. Navigate to your personalized dashboard and select an investment plan.
      7. Make your payment securely through the provided payment options.
      8. Once confirmed, you will receive a Payment Receipt, Deed of Contract, and a Post-dated Cheque.
      9. Monitor your investment performance from your dashboard.
      10. At the end of the investment period, your returns will be paid directly to your bank account.`
  }
];

export default FAQ;
