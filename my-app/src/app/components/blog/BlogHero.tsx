import React from 'react';

export function BlogHero() {
  return (
    <header className="relative px-[5%] md:px-[8%] pt-[100px] md:pt-[120px] pb-[40px] md:pb-[60px] overflow-visible text-[var(--text-dark)] bg-[var(--bg-page-gradient)]">
      <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-indigo-300/40 rounded-full blur-[100px] pointer-events-none z-0"></div>
      
      <div className="relative max-w-3xl z-[1] mx-auto text-center flex flex-col items-center">
        <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 shadow-sm backdrop-blur-sm">
          <span className="uppercase tracking-[0.2em] text-[0.65rem] md:text-[0.7rem] text-[var(--primary-hover)] font-black">
            Insights &amp; Updates
          </span>
        </div>
        
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold mb-5 text-[var(--text-dark-strong)] leading-[1.15] tracking-tight">
          Real estate stories, guides and <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-amber-600">Bhoomi updates</span>
        </h1>
        
        <p className="text-[0.95rem] md:text-[1.05rem] text-[var(--text-body-muted)] leading-relaxed max-w-[600px]">
          Stay updated with land investment tips, project launches and
          learnings from the Bhoomi Plots &amp; Land team.
        </p>
      </div>
    </header>
  );
}
