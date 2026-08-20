import React from 'react';

export function AboutExperts() {
  return (
    <section className="px-[5%] md:px-[8%] py-16 md:py-24 flex justify-center bg-transparent relative overflow-hidden">
      
      <div className="w-full max-w-[1100px] flex flex-col items-start gap-4 text-left relative z-[1] bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-slate-100 mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-1 text-[var(--text-dark-strong)]">
          Our Experts
        </h2>
        
        <div className="text-[0.95rem] leading-relaxed text-[var(--text-body-muted)] flex flex-col gap-4 w-full">
          <p>
            The team at Bhoomi Plots and Land strives to be the best agency out
            there—both in agent support and customer experience. Our experts stay
            on top of the latest regulations, RERA compliance and technology so
            that our clients can enjoy a smooth and confident buying journey.
          </p>
          <p>
            With the right training, tools and local market knowledge, our team
            is able to guide you from initial site visit to final registration and
            post‑sale assistance.
          </p>
        </div>
      </div>
    </section>
  );
}
