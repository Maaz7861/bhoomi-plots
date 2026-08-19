import React from 'react';

export function AboutOffer() {
  const offers = [
    {
      icon: "fas fa-user-tie",
      title: "Property Consultation",
      desc: "One‑to‑one guidance to identify the right land or project."
    },
    {
      icon: "fas fa-map-location-dot",
      title: "Plot Selection",
      desc: "Site visits, layout planning and vastu‑aligned plot options."
    },
    {
      icon: "fas fa-scale-balanced",
      title: "Legal Assistance",
      desc: "Title verification, documentation and registration support."
    },
    {
      icon: "fas fa-file-signature",
      title: "Financing & Loans",
      desc: "Assistance with bank tie‑ups and loan documentation."
    },
    {
      icon: "fas fa-headset",
      title: "After Sales Support",
      desc: "Post‑booking coordination, updates and on‑ground help."
    }
  ];

  return (
    <section className="px-[5%] md:px-[8%] pb-16 md:pb-24 pt-8 bg-transparent">
      <div className="w-full max-w-[1100px] mx-auto flex flex-col items-start">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[var(--text-dark-strong)]">
          What We Offer
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 w-full">
          {offers.map((offer, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 hover:border-[var(--primary-soft)] hover:shadow-[0_15px_35px_rgba(197,138,35,0.1)] hover:-translate-y-1.5 transition-all duration-500 ease-out flex flex-col items-start text-left w-full group relative overflow-hidden"
            >
              {/* Subtle hover gradient line at the bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent-strong)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 text-[var(--primary)] text-xl flex items-center justify-center mb-5 group-hover:bg-[var(--primary)] group-hover:border-[var(--primary)] group-hover:text-white group-hover:shadow-md transition-all duration-500">
                <i className={offer.icon}></i>
              </div>
              <h3 className="text-[1rem] md:text-[1.05rem] font-bold mb-2 text-[var(--text-dark-strong)] leading-snug group-hover:text-[var(--primary)] transition-colors duration-300">{offer.title}</h3>
              <p className="text-[0.85rem] text-[var(--text-body-muted)] leading-relaxed">
                {offer.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
