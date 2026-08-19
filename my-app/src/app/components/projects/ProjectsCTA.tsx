import React from 'react';

export function ProjectsCTA() {
  return (
    <section className="px-[5%] md:px-[8%] py-12 md:py-20 bg-transparent">
      <div className="w-full max-w-[1100px] mx-auto bg-[var(--bg-dark)] rounded-3xl p-10 md:p-16 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        
        {/* Background glow effects */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-[var(--primary)]/20 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-teal-500/20 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="relative z-10 max-w-[650px]">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white leading-tight">
            Looking for something specific?
          </h2>
          <p className="text-[1rem] md:text-[1.1rem] text-slate-300 leading-relaxed">
            Tell us your preferred city, budget and asset type – our team will share a curated list of matching projects tailored to your goals.
          </p>
        </div>

        <div className="relative z-10 shrink-0">
          <button className="px-8 py-4 bg-[var(--primary)] text-white font-bold rounded-full text-[1.05rem] shadow-[0_10px_20px_rgba(197,138,35,0.3)] hover:shadow-[0_15px_30px_rgba(197,138,35,0.4)] hover:-translate-y-1 transition-all duration-300">
            Share Requirements
          </button>
        </div>

      </div>
    </section>
  );
}
