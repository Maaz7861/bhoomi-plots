import React from 'react';

export function VideosFaq() {
  return (
    <>
{/*  Videos & FAQ Section  */}
    <section className="videos-faq-section">
      <div className="videos-faq-inner">
        <div className="videos-column">
          <div className="videos-column-bg"></div>
          <a href="https://youtu.be/RZm4x16zZF8?si=9tGPpaP46EYo5U7o" target="_blank" rel="noopener noreferrer" className="video-card">
            <div className="video-thumb-wrap">
              <img src="https://img.youtube.com/vi/RZm4x16zZF8/hqdefault.jpg" alt="NA plots at Ambe Dindori (Ozar)" />
              <span className="video-play-btn" aria-hidden="true"><i className="fas fa-play"></i></span>
            </div>
            <p className="video-caption">NA plots at Ambe Dindori (Ozar)</p>
          </a>
          <a href="https://youtu.be/3vsJ5EGVzf4?si=dGpRa3vEYbvy0BvR" target="_blank" rel="noopener noreferrer" className="video-card">
            <div className="video-thumb-wrap">
              <img src="https://img.youtube.com/vi/3vsJ5EGVzf4/hqdefault.jpg" alt="HEAVEN OF NASHIK 01" />
              <span className="video-play-btn" aria-hidden="true"><i className="fas fa-play"></i></span>
            </div>
            <p className="video-caption">HEAVEN OF NASHIK 01</p>
          </a>
        </div>
        <div className="faq-column">
          <span className="faq-kicker">Learn More From</span>
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <div className="faq-accordion">
            <div className="faq-item is-open">
              <button type="button" className="faq-question" aria-expanded="true" aria-controls="faq-1" id="faq-q1">
                What types of properties does Bhoomi Plots and Lands offer?
                <span className="faq-icon-wrap"><i className="fas fa-minus faq-icon"></i><i className="fas fa-plus faq-icon faq-icon-plus"></i></span>
              </button>
              <div className="faq-answer" id="faq-1" role="region" aria-labelledby="faq-q1">
                <p>We specialize in offering a variety of land plots, including residential, agricultural, and commercial plots, in well-selected and rapidly developing areas. Each plot is carefully vetted to ensure it meets our standards for quality, location, and future value.</p>
              </div>
            </div>
            <div className="faq-item">
              <button type="button" className="faq-question" aria-expanded="false" aria-controls="faq-2" id="faq-q2">
                How do I know if a plot is suitable for my needs?
                <span className="faq-icon-wrap"><i className="fas fa-minus faq-icon"></i><i className="fas fa-plus faq-icon faq-icon-plus"></i></span>
              </button>
              <div className="faq-answer" id="faq-2" role="region" aria-labelledby="faq-q2">
                <p>Our team provides detailed plot reports, site visits, and one-on-one consultations. We assess your requirements—budget, purpose (residential/commercial/agricultural), location preference, and legal clarity—and shortlist plots that match. You can also review RERA status, zoning, and connectivity before deciding.</p>
              </div>
            </div>
            <div className="faq-item">
              <button type="button" className="faq-question" aria-expanded="false" aria-controls="faq-3" id="faq-q3">
                What is the process of purchasing a plot?
                <span className="faq-icon-wrap"><i className="fas fa-minus faq-icon"></i><i className="fas fa-plus faq-icon faq-icon-plus"></i></span>
              </button>
              <div className="faq-answer" id="faq-3" role="region" aria-labelledby="faq-q3">
                <p>The process typically includes: (1) Enquiry and shortlisting, (2) Site visit and verification, (3) Legal and document checks, (4) Negotiation and agreement, (5) Payment as per schedule, and (6) Registration and handover. We guide you at every step and ensure transparency.</p>
              </div>
            </div>
            <div className="faq-item">
              <button type="button" className="faq-question" aria-expanded="false" aria-controls="faq-4" id="faq-q4">
                Are there any financing options available?
                <span className="faq-icon-wrap"><i className="fas fa-minus faq-icon"></i><i className="fas fa-plus faq-icon faq-icon-plus"></i></span>
              </button>
              <div className="faq-answer" id="faq-4" role="region" aria-labelledby="faq-q4">
                <p>Yes. We can connect you with partner banks and NBFCs for plot loans. We also support flexible payment plans on select projects. Share your budget and timeline, and our team will suggest suitable financing options.</p>
              </div>
            </div>
            <div className="faq-item">
              <button type="button" className="faq-question" aria-expanded="false" aria-controls="faq-5" id="faq-q5">
                What kind of support do you provide after the purchase?
                <span className="faq-icon-wrap"><i className="fas fa-minus faq-icon"></i><i className="fas fa-plus faq-icon faq-icon-plus"></i></span>
              </button>
              <div className="faq-answer" id="faq-5" role="region" aria-labelledby="faq-q5">
                <p>We provide post-purchase support including documentation assistance, mutation guidance, and help with any queries related to your plot. Our relationship doesn't end at registration—we're here for clarifications and future needs.</p>
              </div>
            </div>
            <div className="faq-item">
              <button type="button" className="faq-question" aria-expanded="false" aria-controls="faq-6" id="faq-q6">
                Is the land legally verified?
                <span className="faq-icon-wrap"><i className="fas fa-minus faq-icon"></i><i className="fas fa-plus faq-icon faq-icon-plus"></i></span>
              </button>
              <div className="faq-answer" id="faq-6" role="region" aria-labelledby="faq-q6">
                <p>Yes. We conduct due diligence on title, encumbrances, and local laws. Where applicable, we ensure RERA compliance. You receive clear documentation and we recommend independent legal verification before registration for your peace of mind.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
