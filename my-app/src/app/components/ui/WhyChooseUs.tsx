import React from 'react';

export function WhyChooseUs() {
  return (
    <>
{/*  Why Choose Us Section  */}
    <section className="why-choose-section">
      <h2 className="why-choose-title">Why Choose Us?</h2>
      <div className="why-choose-inner">
        <div className="why-choose-card why-choose-left">
          <span className="why-choose-kicker">Sustainability</span>
          <h3 className="why-choose-heading">Helping People To Find Right Property</h3>
          <p className="why-choose-text">
            Your satisfaction is our top priority. We offer personalized services, from one-on-one consultations to tailored solutions that fit your specific needs. We're with you every step of the way, ensuring that your experience with us is seamless and fulfilling, even long after you've found the perfect property.
          </p>
          <a href="pages/contact.html" className="why-choose-btn">Get Enquiry</a>
        </div>
        <div className="why-choose-card why-choose-right">
          <h3 className="why-choose-heading why-choose-heading-dark">We Follow Best Practices.</h3>
          <p className="why-choose-text why-choose-text-dark">
            At Bhoomi Plots and Lands, we're committed to turning your real estate dreams into reality. Here's why we're the trusted choice for discerning buyers and investors.
          </p>
          <ul className="why-choose-list">
            <li>
              <i className="fas fa-search" aria-hidden="true"></i>
              <span>Transparency &amp; Satisfying Deals</span>
            </li>
            <li>
              <i className="fas fa-clipboard-list" aria-hidden="true"></i>
              <span>Accurate Guidance To Clients</span>
            </li>
            <li>
              <i className="fas fa-award" aria-hidden="true"></i>
              <span>Provides Best Quality</span>
            </li>
            <li>
              <i className="fas fa-lightbulb" aria-hidden="true"></i>
              <span>Better Options &amp; Solutions</span>
            </li>
          </ul>
          <div className="why-choose-actions">
            <a href="tel:+919876543210" className="why-choose-fab" aria-label="Call"><i className="fas fa-phone"></i></a>
            <a href="#" className="why-choose-fab why-choose-fab-up" aria-label="Back to top"><i className="fas fa-arrow-up"></i></a>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
