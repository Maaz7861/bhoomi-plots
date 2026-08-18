import React from 'react';

export function SuccessSection() {
  return (
    <>
{/*  Success / Stats Section (futuristic)  */}
    <section className="success-section" id="success-section">
      <div className="success-bg">
        <div className="success-grid-overlay"></div>
        <div className="success-glow"></div>
      </div>
      <div className="success-inner">
        <div className="success-content">
          <span className="success-kicker">Build Your Dream</span>
          <h2 className="success-headline">3 Years Of<br />Undefeated Success</h2>
          <p className="success-desc">
            Our deep understanding of the local market means we can provide you with insights and opportunities that others might miss. We know the region's zoning laws, community plans, and market trends inside and out.
          </p>
        </div>
        <div className="success-stats">
          <div className="success-stat">
            <span className="success-stat-value" data-value="8076">8,076</span>
            <span className="success-stat-label">Property Buyer</span>
          </div>
          <div className="success-stat">
            <span className="success-stat-value" data-value="4102">4,102</span>
            <span className="success-stat-label">Property Sold</span>
          </div>
          <div className="success-stat">
            <span className="success-stat-value" data-value="837">837</span>
            <span className="success-stat-label">Happy Family</span>
          </div>
          <div className="success-stat">
            <span className="success-stat-value" data-value="15">15+</span>
            <span className="success-stat-label">years of experience</span>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
