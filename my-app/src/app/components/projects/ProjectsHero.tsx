import React from 'react';

export function ProjectsHero() {
  return (
    <header className="relative px-[5%] md:px-[8%] pt-[100px] md:pt-[120px] pb-[30px] md:pb-[40px] overflow-visible text-[var(--text-dark)]">
      {/* Decorative background orbs */}
      <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-emerald-300/30 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute top-[10%] right-[10%] w-[250px] h-[250px] bg-teal-200/40 rounded-full blur-[100px] pointer-events-none z-0"></div>
      
      <div className="relative z-10 max-w-[1100px] mx-auto text-center flex flex-col items-center">
        <span className="text-[var(--primary)] text-sm md:text-base font-bold tracking-[0.15em] uppercase mb-6 inline-block">
          Bhoomi Plots & Land Services
        </span>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-[1.15] text-[var(--text-dark-strong)] max-w-[900px]">
          Curated lands, plots and <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent-strong)]">residential communities</span>
        </h1>
        
        <p className="text-lg md:text-xl text-[var(--text-body)] max-w-[700px] leading-relaxed">
          Explore our current and flagship projects across Maharashtra – from NA plots and farm lands to gated townships and commercial spaces.
        </p>
      </div>
    </header>
  );
}
