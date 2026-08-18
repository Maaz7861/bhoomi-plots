import React from 'react';

export function VideosFaq() {
  return (
    <section className="videos-faq-section py-[clamp(40px,6vw,64px)] px-[5%] bg-[var(--bg-light)]">
      <div className="videos-faq-inner grid gap-8 max-w-[1100px] mx-auto items-start max-[900px]:grid-cols-1" style={{ gridTemplateColumns: '1fr 1.2fr' }}>
        <div className="videos-column relative flex flex-col gap-4">
          <div className="videos-column-bg absolute inset-0 rounded-[24px] -z-[1] opacity-30" style={{ background: 'linear-gradient(135deg, var(--bg-light-soft), var(--bg-page-alt))' }}></div>
          <a href="https://youtu.be/RZm4x16zZF8?si=9tGPpaP46EYo5U7o" target="_blank" rel="noopener noreferrer" className="video-card block rounded-[14px] overflow-hidden bg-[#fff] group/card transition-all duration-300 ease-out hover:-translate-y-[4px]" style={{ boxShadow: '0 4px 16px rgba(0, 0, 0, 0.07)' }}>
            <div className="video-thumb-wrap relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <img src="https://img.youtube.com/vi/RZm4x16zZF8/hqdefault.jpg" alt="NA plots at Ambe Dindori (Ozar)" className="w-full h-full object-cover transition-transform duration-400 ease-out group-hover/card:scale-105" />
              <span className="video-play-btn absolute inset-0 flex items-center justify-center text-white text-[1.5rem] bg-[rgba(0,0,0,0.3)] transition-colors duration-200" aria-hidden="true"><i className="fas fa-play w-12 h-12 rounded-full flex items-center justify-center pl-[2px] bg-[rgba(197,138,35,0.9)] transition-transform duration-200 ease-out group-hover/card:scale-110"></i></span>
            </div>
            <p className="video-caption text-[0.85rem] font-semibold px-4 py-3 text-[var(--text-dark-strong)]">NA plots at Ambe Dindori (Ozar)</p>
          </a>
          <a href="https://youtu.be/3vsJ5EGVzf4?si=dGpRa3vEYbvy0BvR" target="_blank" rel="noopener noreferrer" className="video-card block rounded-[14px] overflow-hidden bg-[#fff] group/card transition-all duration-300 ease-out hover:-translate-y-[4px]" style={{ boxShadow: '0 4px 16px rgba(0, 0, 0, 0.07)' }}>
            <div className="video-thumb-wrap relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <img src="https://img.youtube.com/vi/3vsJ5EGVzf4/hqdefault.jpg" alt="HEAVEN OF NASHIK 01" className="w-full h-full object-cover transition-transform duration-400 ease-out group-hover/card:scale-105" />
              <span className="video-play-btn absolute inset-0 flex items-center justify-center text-white text-[1.5rem] bg-[rgba(0,0,0,0.3)] transition-colors duration-200" aria-hidden="true"><i className="fas fa-play w-12 h-12 rounded-full flex items-center justify-center pl-[2px] bg-[rgba(197,138,35,0.9)] transition-transform duration-200 ease-out group-hover/card:scale-110"></i></span>
            </div>
            <p className="video-caption text-[0.85rem] font-semibold px-4 py-3 text-[var(--text-dark-strong)]">HEAVEN OF NASHIK 01</p>
          </a>
        </div>
        <div className="faq-column flex flex-col">
          <span className="faq-kicker uppercase text-[0.72rem] tracking-[0.14em] font-semibold mb-2 text-[var(--primary)]">Learn More From</span>
          <h2 className="faq-title font-bold mb-6 text-[var(--text-dark-strong)]" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)' }}>Frequently Asked Questions</h2>
          <div className="faq-accordion flex flex-col gap-3">
            <div className="faq-item is-open rounded-[12px] overflow-hidden border border-[var(--border-subtle)] bg-[#fff] [&.is-open_.faq-question]:text-[var(--primary)] [&.is-open_.faq-icon-plus]:opacity-0 [&.is-open_.faq-answer]:block">
              <button type="button" className="faq-question w-full flex justify-between items-center text-left px-5 py-4 font-semibold text-[0.9rem] bg-transparent border-none cursor-pointer gap-4 text-[var(--text-dark-strong)] transition-colors duration-200 hover:bg-[var(--bg-light)]" aria-expanded="true" aria-controls="faq-1" id="faq-q1">
                What types of properties does Bhoomi Plots and Lands offer?
                <span className="faq-icon-wrap relative flex-shrink-0 w-4 h-4">
                  <i className="fas fa-minus faq-icon absolute inset-0 opacity-100 transition-opacity duration-200"></i>
                  <i className="fas fa-plus faq-icon faq-icon-plus absolute inset-0 opacity-100 transition-opacity duration-200"></i>
                </span>
              </button>
              <div className="faq-answer hidden px-5 pb-4 text-[0.87rem] leading-relaxed text-[var(--text-body)]" id="faq-1" role="region" aria-labelledby="faq-q1">
                <p>We specialize in offering a variety of land plots, including residential, agricultural, and commercial plots, in well-selected and rapidly developing areas. Each plot is carefully vetted to ensure it meets our standards for quality, location, and future value.</p>
              </div>
            </div>
            <div className="faq-item rounded-[12px] overflow-hidden border border-[var(--border-subtle)] bg-[#fff] [&.is-open_.faq-question]:text-[var(--primary)] [&.is-open_.faq-icon-plus]:opacity-0 [&.is-open_.faq-answer]:block">
              <button type="button" className="faq-question w-full flex justify-between items-center text-left px-5 py-4 font-semibold text-[0.9rem] bg-transparent border-none cursor-pointer gap-4 text-[var(--text-dark-strong)] transition-colors duration-200 hover:bg-[var(--bg-light)]" aria-expanded="false" aria-controls="faq-2" id="faq-q2">
                How do I know if a plot is suitable for my needs?
                <span className="faq-icon-wrap relative flex-shrink-0 w-4 h-4">
                  <i className="fas fa-minus faq-icon absolute inset-0 opacity-100 transition-opacity duration-200"></i>
                  <i className="fas fa-plus faq-icon faq-icon-plus absolute inset-0 opacity-100 transition-opacity duration-200"></i>
                </span>
              </button>
              <div className="faq-answer hidden px-5 pb-4 text-[0.87rem] leading-relaxed text-[var(--text-body)]" id="faq-2" role="region" aria-labelledby="faq-q2">
                <p>Our team provides detailed plot reports, site visits, and one-on-one consultations. We assess your requirements—budget, purpose (residential/commercial/agricultural), location preference, and legal clarity—and shortlist plots that match. You can also review RERA status, zoning, and connectivity before deciding.</p>
              </div>
            </div>
            <div className="faq-item rounded-[12px] overflow-hidden border border-[var(--border-subtle)] bg-[#fff] [&.is-open_.faq-question]:text-[var(--primary)] [&.is-open_.faq-icon-plus]:opacity-0 [&.is-open_.faq-answer]:block">
              <button type="button" className="faq-question w-full flex justify-between items-center text-left px-5 py-4 font-semibold text-[0.9rem] bg-transparent border-none cursor-pointer gap-4 text-[var(--text-dark-strong)] transition-colors duration-200 hover:bg-[var(--bg-light)]" aria-expanded="false" aria-controls="faq-3" id="faq-q3">
                What is the process of purchasing a plot?
                <span className="faq-icon-wrap relative flex-shrink-0 w-4 h-4">
                  <i className="fas fa-minus faq-icon absolute inset-0 opacity-100 transition-opacity duration-200"></i>
                  <i className="fas fa-plus faq-icon faq-icon-plus absolute inset-0 opacity-100 transition-opacity duration-200"></i>
                </span>
              </button>
              <div className="faq-answer hidden px-5 pb-4 text-[0.87rem] leading-relaxed text-[var(--text-body)]" id="faq-3" role="region" aria-labelledby="faq-q3">
                <p>The process typically includes: (1) Enquiry and shortlisting, (2) Site visit and verification, (3) Legal and document checks, (4) Negotiation and agreement, (5) Payment as per schedule, and (6) Registration and handover. We guide you at every step and ensure transparency.</p>
              </div>
            </div>
            <div className="faq-item rounded-[12px] overflow-hidden border border-[var(--border-subtle)] bg-[#fff] [&.is-open_.faq-question]:text-[var(--primary)] [&.is-open_.faq-icon-plus]:opacity-0 [&.is-open_.faq-answer]:block">
              <button type="button" className="faq-question w-full flex justify-between items-center text-left px-5 py-4 font-semibold text-[0.9rem] bg-transparent border-none cursor-pointer gap-4 text-[var(--text-dark-strong)] transition-colors duration-200 hover:bg-[var(--bg-light)]" aria-expanded="false" aria-controls="faq-4" id="faq-q4">
                Are there any financing options available?
                <span className="faq-icon-wrap relative flex-shrink-0 w-4 h-4">
                  <i className="fas fa-minus faq-icon absolute inset-0 opacity-100 transition-opacity duration-200"></i>
                  <i className="fas fa-plus faq-icon faq-icon-plus absolute inset-0 opacity-100 transition-opacity duration-200"></i>
                </span>
              </button>
              <div className="faq-answer hidden px-5 pb-4 text-[0.87rem] leading-relaxed text-[var(--text-body)]" id="faq-4" role="region" aria-labelledby="faq-q4">
                <p>Yes. We can connect you with partner banks and NBFCs for plot loans. We also support flexible payment plans on select projects. Share your budget and timeline, and our team will suggest suitable financing options.</p>
              </div>
            </div>
            <div className="faq-item rounded-[12px] overflow-hidden border border-[var(--border-subtle)] bg-[#fff] [&.is-open_.faq-question]:text-[var(--primary)] [&.is-open_.faq-icon-plus]:opacity-0 [&.is-open_.faq-answer]:block">
              <button type="button" className="faq-question w-full flex justify-between items-center text-left px-5 py-4 font-semibold text-[0.9rem] bg-transparent border-none cursor-pointer gap-4 text-[var(--text-dark-strong)] transition-colors duration-200 hover:bg-[var(--bg-light)]" aria-expanded="false" aria-controls="faq-5" id="faq-q5">
                What kind of support do you provide after the purchase?
                <span className="faq-icon-wrap relative flex-shrink-0 w-4 h-4">
                  <i className="fas fa-minus faq-icon absolute inset-0 opacity-100 transition-opacity duration-200"></i>
                  <i className="fas fa-plus faq-icon faq-icon-plus absolute inset-0 opacity-100 transition-opacity duration-200"></i>
                </span>
              </button>
              <div className="faq-answer hidden px-5 pb-4 text-[0.87rem] leading-relaxed text-[var(--text-body)]" id="faq-5" role="region" aria-labelledby="faq-q5">
                <p>We provide post-purchase support including documentation assistance, mutation guidance, and help with any queries related to your plot. Our relationship doesn&apos;t end at registration—we&apos;re here for clarifications and future needs.</p>
              </div>
            </div>
            <div className="faq-item rounded-[12px] overflow-hidden border border-[var(--border-subtle)] bg-[#fff] [&.is-open_.faq-question]:text-[var(--primary)] [&.is-open_.faq-icon-plus]:opacity-0 [&.is-open_.faq-answer]:block">
              <button type="button" className="faq-question w-full flex justify-between items-center text-left px-5 py-4 font-semibold text-[0.9rem] bg-transparent border-none cursor-pointer gap-4 text-[var(--text-dark-strong)] transition-colors duration-200 hover:bg-[var(--bg-light)]" aria-expanded="false" aria-controls="faq-6" id="faq-q6">
                Is the land legally verified?
                <span className="faq-icon-wrap relative flex-shrink-0 w-4 h-4">
                  <i className="fas fa-minus faq-icon absolute inset-0 opacity-100 transition-opacity duration-200"></i>
                  <i className="fas fa-plus faq-icon faq-icon-plus absolute inset-0 opacity-100 transition-opacity duration-200"></i>
                </span>
              </button>
              <div className="faq-answer hidden px-5 pb-4 text-[0.87rem] leading-relaxed text-[var(--text-body)]" id="faq-6" role="region" aria-labelledby="faq-q6">
                <p>Yes. We conduct due diligence on title, encumbrances, and local laws. Where applicable, we ensure RERA compliance. You receive clear documentation and we recommend independent legal verification before registration for your peace of mind.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
