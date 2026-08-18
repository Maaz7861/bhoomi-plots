import React from 'react';

export function Hero() {
  return (
    <>
<header className="hero">
      <video className="hero-video" autoPlay muted={true} loop playsInline>
        <source src="/assets/videos/bhoomi video Hero section.mp4" type="video/mp4" />
      </video>
      <h1>
        Get Best Deals on <br /> <span> Land, Plots, Homes & Profitable Investments</span> <br /> All in One Place.
      </h1>

      <a href="#success-section" className="hero-scroll-hint" aria-label="Scroll to next section">
        <i className="fas fa-chevron-down"></i>
      </a>
    </header>
    </>
  );
}
