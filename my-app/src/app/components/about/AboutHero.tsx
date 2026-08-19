import React from 'react';

export function AboutHero() {
  return (
    <header className="relative px-[5%] md:px-[8%] pt-[100px] md:pt-[120px] pb-[60px] md:pb-[70px] overflow-visible text-[var(--text-dark)]">
      {/* Decorative background orbs */}
      <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-indigo-300/40 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute top-[10%] right-[10%] w-[250px] h-[250px] bg-cyan-200/40 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="relative max-w-[800px] z-[1] mx-auto text-center flex flex-col items-center">
        <p className="uppercase tracking-[0.16em] text-[0.8rem] text-[var(--brand-indigo)] mb-4 font-bold">
          About Bhoomi Plots &amp; Land
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[var(--text-dark-strong)] leading-tight">
          Assuring hope for a better future
        </h1>
        <p className="text-lg md:text-[1.1rem] text-[var(--text-body-muted)] leading-relaxed max-w-[700px]">
          We believe that investing in NA land and plots changes lives, turning
          dreams of a healthy and fulfilled life into reality for thousands of
          Indian families and investors.
        </p>
      </div>
    </header>
  );
}
