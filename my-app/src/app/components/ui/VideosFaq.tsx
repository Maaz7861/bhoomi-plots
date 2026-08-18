"use client";
import React, { useState } from 'react';

export function VideosFaq() {
  const [openFaq, setOpenFaq] = useState<number | null>(1); // FAQ 1 open by default

  const faqs = [
    {
      id: 1,
      question: "What types of properties does Bhoomi Plots and Lands offer?",
      answer: "We specialize in offering a variety of land plots, including residential, agricultural, and commercial plots, in well-selected and rapidly developing areas. Each plot is carefully vetted to ensure it meets our standards for quality, location, and future value."
    },
    {
      id: 2,
      question: "How do I know if a plot is suitable for my needs?",
      answer: "Our team provides detailed plot reports, site visits, and one-on-one consultations. We assess your requirements—budget, purpose (residential/commercial/agricultural), location preference, and legal clarity—and shortlist plots that match. You can also review RERA status, zoning, and connectivity before deciding."
    },
    {
      id: 3,
      question: "What is the process of purchasing a plot?",
      answer: "The process typically includes: (1) Enquiry and shortlisting, (2) Site visit and verification, (3) Legal and document checks, (4) Negotiation and agreement, (5) Payment as per schedule, and (6) Registration and handover. We guide you at every step and ensure transparency."
    },
    {
      id: 4,
      question: "Are there any financing options available?",
      answer: "Yes. We can connect you with partner banks and NBFCs for plot loans. We also support flexible payment plans on select projects. Share your budget and timeline, and our team will suggest suitable financing options."
    },
    {
      id: 5,
      question: "What kind of support do you provide after the purchase?",
      answer: "We provide post-purchase support including documentation assistance, mutation guidance, and help with any queries related to your plot. Our relationship doesn't end at registration—we're here for clarifications and future needs."
    },
    {
      id: 6,
      question: "Is the land legally verified?",
      answer: "Yes. We conduct due diligence on title, encumbrances, and local laws. Where applicable, we ensure RERA compliance. You receive clear documentation and we recommend independent legal verification before registration for your peace of mind."
    }
  ];

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section className="videos-faq-section py-[clamp(40px,5vw,64px)] px-[5%] bg-[var(--bg-light)]">
      <div className="videos-faq-inner grid gap-8 max-w-[1100px] mx-auto items-start max-[900px]:grid-cols-1" style={{ gridTemplateColumns: '1fr 1.3fr' }}>
        
        {/* Featured Video Column */}
        <div className="videos-column relative flex flex-col items-center justify-center h-full min-h-[350px]">
          {/* Decorative Background Blob */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-soft)] to-transparent opacity-20 rounded-[24px] blur-xl -z-10 transform -rotate-3 scale-105"></div>
          <div className="videos-column-bg absolute inset-0 rounded-[24px] -z-[1] opacity-80" style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}></div>
          
          <a href="https://youtu.be/RZm4x16zZF8?si=9tGPpaP46EYo5U7o" target="_blank" rel="noopener noreferrer" className="video-card block w-[90%] my-auto rounded-[16px] overflow-hidden bg-[var(--bg-dark)] border border-[rgba(255,255,255,0.1)] group/card transition-all duration-400 ease-out hover:-translate-y-2" style={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)' }}>
            <div className="video-thumb-wrap relative overflow-hidden bg-black/50" style={{ aspectRatio: '16/9' }}>
              <img src="https://img.youtube.com/vi/RZm4x16zZF8/maxresdefault.jpg" alt="NA plots at Ambe Dindori (Ozar)" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105 opacity-90 group-hover/card:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-60"></div>
              
              <span className="video-play-btn absolute inset-0 flex items-center justify-center text-white text-[1.8rem] transition-colors duration-300" aria-hidden="true">
                <span className="relative flex h-14 w-14 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-40"></span>
                  <i className="fas fa-play relative w-14 h-14 rounded-full flex items-center justify-center pl-[4px] bg-[rgba(197,138,35,0.95)] backdrop-blur-sm transition-transform duration-300 ease-out group-hover/card:scale-110 shadow-[0_0_20px_rgba(197,138,35,0.5)] text-white"></i>
                </span>
              </span>
            </div>
            <div className="p-5 relative z-10 bg-gradient-to-b from-[#0f172a] to-[#0b1120]">
              <span className="inline-block px-2 py-1 mb-2 text-[0.65rem] font-bold uppercase tracking-wider rounded-md bg-[rgba(197,138,35,0.15)] text-[var(--accent-strong)] border border-[rgba(197,138,35,0.3)]">Featured Project</span>
              <h3 className="video-caption text-[1rem] font-bold text-[#fff] leading-snug group-hover/card:text-[var(--accent-strong)] transition-colors duration-300">NA plots at Ambe Dindori (Ozar)</h3>
              <p className="text-[0.8rem] text-[var(--text-muted-light)] mt-2">Watch our detailed site visit and project overview video to learn more about the location and amenities.</p>
            </div>
          </a>
        </div>

        {/* FAQ Column */}
        <div className="faq-column flex flex-col">
          <div className="mb-6">
            <span className="faq-kicker inline-block px-3 py-1 rounded-full bg-[rgba(197,138,35,0.1)] uppercase text-[0.7rem] tracking-[0.1em] font-bold mb-3 text-[var(--primary)] border border-[rgba(197,138,35,0.2)]">Learn More From</span>
            <h2 className="faq-title font-extrabold text-[var(--text-dark-strong)] leading-tight mb-2" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}>Frequently Asked Questions</h2>
            <p className="text-[var(--text-body)] text-[0.9rem]">Have questions before investing? Find all the answers you need about our properties and buying process below.</p>
          </div>
          
          <div className="faq-accordion flex flex-col gap-3">
            {faqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div 
                  key={faq.id}
                  className={`faq-item rounded-[12px] overflow-hidden bg-white border shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-300 ease-out hover:shadow-[0_4px_15px_rgba(0,0,0,0.05)] ${isOpen ? 'is-open border-l-[3px] border-l-[var(--primary)] border-y-[rgba(0,0,0,0.05)] border-r-[rgba(0,0,0,0.05)] shadow-[0_6px_20px_rgba(0,0,0,0.06)]' : 'border-transparent'}`}
                >
                  <button 
                    type="button" 
                    onClick={() => toggleFaq(faq.id)}
                    className={`faq-question w-full flex justify-between items-center text-left px-5 py-4 font-bold text-[0.9rem] bg-transparent border-none cursor-pointer gap-4 transition-all duration-200 hover:bg-[var(--bg-light)] ${isOpen ? 'text-[var(--primary)]' : 'text-[var(--text-dark-strong)]'}`}
                    aria-expanded={isOpen} 
                    aria-controls={`faq-${faq.id}`}
                    id={`faq-q${faq.id}`}
                  >
                    {faq.question}
                    <span className={`faq-icon-wrap relative flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ease-out ${isOpen ? 'bg-[var(--primary)] text-white' : 'bg-[rgba(197,138,35,0.1)] text-[var(--primary)]'}`}>
                      <i className={`fas fa-minus faq-icon absolute transition-all duration-300 ${isOpen ? 'opacity-100 rotate-180 scale-100' : 'opacity-0 scale-75'}`}></i>
                      <i className={`fas fa-plus faq-icon absolute transition-all duration-300 ${isOpen ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}></i>
                    </span>
                  </button>
                  <div 
                    className={`faq-answer px-5 pb-5 pt-0 text-[0.85rem] leading-relaxed text-[var(--text-body)] transition-all duration-300 origin-top ${isOpen ? 'block opacity-100 scale-y-100' : 'hidden opacity-0 scale-y-95'}`} 
                    id={`faq-${faq.id}`} 
                    role="region" 
                    aria-labelledby={`faq-q${faq.id}`}
                  >
                    <p>{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
