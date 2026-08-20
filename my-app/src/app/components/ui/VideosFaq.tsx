"use client";
import React, { useState } from 'react';

export function VideosFaq() {
  const [openFaq, setOpenFaq] = useState<number | null>(1); // FAQ 1 open by default

  const faqs = [
    {
      id: 1,
      question: "What types of properties does Bhoomi Group offer?",
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
    <section className="videos-faq-section py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--bg-light)] overflow-hidden">
      <div className="videos-faq-inner grid gap-8 lg:gap-12 max-w-[1200px] mx-auto items-start grid-cols-1 lg:grid-cols-[1fr_1.2fr]">
        
        {/* Featured Video Column */}
        <div className="videos-column relative w-full h-fit">
          {/* Decorative Background Elements */}
          <div className="absolute -inset-4 bg-gradient-to-br from-[var(--primary)]/10 to-transparent rounded-[32px] blur-2xl -z-10"></div>
          
          <a 
            href="https://youtu.be/RZm4x16zZF8?si=9tGPpaP46EYo5U7o" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="video-card relative block w-full rounded-[24px] overflow-hidden bg-black group/card transition-transform duration-500 hover:-translate-y-1 shadow-xl hover:shadow-2xl ring-1 ring-white/10"
          >
            <div className="video-thumb-wrap relative overflow-hidden bg-black/50 aspect-video">
              <img 
                src="https://img.youtube.com/vi/RZm4x16zZF8/maxresdefault.jpg" 
                alt="NA plots at Ambe Dindori (Ozar)" 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105 opacity-90 group-hover/card:opacity-100" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80"></div>
              
              {/* Refined Play Button */}
              <div className="absolute inset-0 flex items-center justify-center transition-all duration-300">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-[0_0_30px_rgba(0,0,0,0.3)] transition-all duration-500 ease-out group-hover/card:scale-110 group-hover/card:bg-[var(--primary)] group-hover/card:border-[var(--primary)] group-hover/card:shadow-[0_0_40px_var(--primary)]">
                  <i className="fas fa-play text-white text-xl md:text-2xl ml-1 md:ml-2 drop-shadow-md"></i>
                </div>
              </div>
            </div>
            
            <div className="p-6 md:p-8 relative z-10">
              <div className="flex items-center mb-4">
                <span className="px-3 py-1 text-[0.7rem] font-bold uppercase tracking-widest rounded-full bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20">Featured Project</span>
              </div>
              <h3 className="video-caption text-xl md:text-2xl font-bold text-white leading-tight group-hover/card:text-[var(--primary)] transition-colors duration-300">
                NA plots at Ambe Dindori (Ozar)
              </h3>
              <p className="text-sm md:text-base text-slate-300 mt-2 line-clamp-2">
                Watch our detailed site visit and project overview video to learn more about the location and amenities.
              </p>
            </div>
          </a>
        </div>

        {/* FAQ Column - White Card Design as per Image */}
        <div className="faq-column flex flex-col bg-white rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-sm border border-black/[0.03] w-full">
          <div className="mb-8 md:mb-10">
            <span className="faq-kicker block uppercase text-[0.8rem] md:text-[0.85rem] tracking-[0.15em] font-bold mb-3 text-[#f5b041]">
              Learn More From
            </span>
            <h2 className="faq-title font-extrabold text-[#0f172a] leading-tight text-3xl md:text-[2.2rem]">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="faq-accordion flex flex-col">
            {faqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="faq-item border-b border-slate-200 last:border-none"
                >
                  <button 
                    type="button" 
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex justify-between items-center text-left py-5 md:py-6 cursor-pointer gap-6 bg-transparent"
                    aria-expanded={isOpen} 
                    aria-controls={`faq-${faq.id}`}
                    id={`faq-q${faq.id}`}
                  >
                    <span className="font-semibold text-base md:text-[1.1rem] leading-snug text-[#0f172a]">
                      {faq.question}
                    </span>
                    <span className="flex-shrink-0 text-2xl font-light text-[#0ea5e9] flex items-center justify-center w-6 h-6">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  
                  {/* CSS Grid approach for smooth height animation */}
                  <div 
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100 mb-6' : 'grid-rows-[0fr] opacity-0'
                    }`} 
                    id={`faq-${faq.id}`} 
                    role="region" 
                    aria-labelledby={`faq-q${faq.id}`}
                  >
                    <div className="overflow-hidden">
                      <div className="text-[0.95rem] md:text-base leading-relaxed text-slate-500 pr-4 md:pr-12">
                        {faq.answer}
                      </div>
                    </div>
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

