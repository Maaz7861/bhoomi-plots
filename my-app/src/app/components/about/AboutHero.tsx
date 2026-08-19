import React from 'react';

export function AboutHero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-white">
      {/* Background abstract elements */}
      <div className="absolute top-[20%] left-[5%] w-[300px] h-[300px] bg-[var(--primary-soft)] rounded-full blur-[120px] pointer-events-none opacity-40 z-0"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[250px] h-[250px] bg-teal-200/30 rounded-full blur-[100px] pointer-events-none z-0"></div>
      
      <div className="relative z-10 max-w-[1100px] mx-auto text-center flex flex-col items-center px-[5%]">
        <span className="text-[#cfa861] text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-4 inline-block">
          About Bhoomi Plots & Land
        </span>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight max-w-[900px] bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
          Assuring hope for a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cfa861] to-amber-700">better future</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-500 max-w-[700px] mx-auto leading-relaxed font-medium">
          We believe that investing in NA land and plots changes lives, turning
          dreams of a healthy and fulfilled life into reality for thousands of
          Indian families and investors.
        </p>
      </div>
    </section>
  );
}
