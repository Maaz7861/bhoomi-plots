import React from 'react';

export function Hero() {
  return (
    <header className="hero relative h-screen min-h-screen flex flex-col justify-center items-center text-center overflow-hidden pt-[150px] pb-[60px] px-[5%] max-[900px]:pt-[100px] max-[900px]:pb-[70px] max-[600px]:pt-[90px] max-[600px]:pb-[60px] before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:z-[1]" style={{ background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.956) 0%, rgb(0, 0, 0) 50%, rgba(5, 29, 52, 0.271) 100%)', backgroundSize: 'cover', backgroundPosition: 'center', boxSizing: 'border-box' }}>
      <video className="hero-video absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" autoPlay muted loop playsInline>
        <source src="assets/videos/bhoomi video Hero section.mp4" type="video/mp4" />
      </video>
      <h1 className="relative z-[2] mb-7 font-bold text-[var(--text-inverted)] tracking-[-0.02em] leading-[1.2] text-[clamp(2rem,4.5vw,3rem)] max-[900px]:text-[2.2rem] max-[900px]:px-5 max-[600px]:text-[1.8rem] max-[600px]:text-[#f8fafc]">
        Get Best Deals on <br /> <span className="text-[var(--accent-strong)] [text-shadow:0_0_30px_rgba(0,194,255,0.4)] max-[600px]:text-[var(--accent)]"> Land, Plots, Homes &amp; Profitable Investments</span> <br /> All in One Place.
      </h1>
      <a href="#success-section" className="hero-scroll-hint absolute bottom-6 left-1/2 w-11 h-11 rounded-full flex items-center justify-center text-base z-[2] -translate-x-1/2 bg-[rgba(0,194,255,0.25)] text-[var(--accent)] border border-[rgba(0,194,255,0.4)] transition-all duration-200 hover:-translate-x-1/2 hover:translate-y-1 hover:bg-[var(--accent)] hover:text-[var(--dark-bg)] max-[600px]:bottom-4 max-[600px]:w-10 max-[600px]:h-10 max-[600px]:text-[0.9rem]" style={{ animation: 'hero-scroll-bounce 2s ease-in-out infinite' }} aria-label="Scroll to next section">
        <i className="fas fa-chevron-down"></i>
      </a>
    </header>
  );
}
