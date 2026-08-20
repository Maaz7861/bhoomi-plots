import React from 'react';

export function SuccessSection() {
  return (
    <section className="success-section relative overflow-hidden" id="success-section" style={{ padding: 'clamp(48px, 8vw, 80px) 5%', background: 'linear-gradient(135deg, #000000 0%, #111111 60%, #0a0a0a 100%)' }}>
      <div className="success-bg absolute inset-0 pointer-events-none">
        <div className="success-grid-overlay absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0, 194, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 194, 255, 0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="success-glow absolute rounded-full pointer-events-none" style={{ width: 'clamp(300px, 40vw, 600px)', height: 'clamp(300px, 40vw, 600px)', top: '-20%', right: '-10%', background: 'radial-gradient(circle, rgba(197, 138, 35, 0.15) 0%, transparent 65%)' }}></div>
      </div>
      <div className="success-inner relative z-[1] flex flex-wrap justify-between items-center" style={{ gap: 'clamp(28px, 5vw, 60px)' }}>
        <div className="success-content flex flex-col max-w-[420px]" style={{ flex: '1 1 320px' }}>
          <span className="success-kicker uppercase font-semibold mb-3 tracking-[0.12em] text-[0.78rem] text-[var(--accent-strong)]">Build Your Dream</span>
          <h2 className="success-headline font-bold leading-tight mb-4 text-[var(--text-inverted)]" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>3 Years Of<br />Undefeated Success</h2>
          <p className="success-desc text-[0.93rem] leading-relaxed text-[var(--text-muted-light)]">
            Our deep understanding of the local market means we can provide you with insights and
            opportunities that others might miss. We know the region&apos;s zoning laws, community
            plans, and market trends inside and out.
          </p>
        </div>
        <div className="success-stats grid gap-x-8 gap-y-6 grid-cols-2" style={{ flex: '1 1 320px' }}>
          <div className="success-stat flex flex-col rounded-[16px] bg-[rgba(255,255,255,0.05)] border border-[rgba(0,194,255,0.15)] backdrop-blur-[8px] transition-all duration-300 ease-out hover:border-[rgba(245,197,75,0.4)] hover:bg-[rgba(245,197,75,0.06)]" style={{ padding: 'clamp(14px, 2vw, 22px)' }}>
            <span className="success-stat-value font-bold leading-none mb-1 text-[var(--accent-strong)]" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }} data-value="10256">10,256</span>
            <span className="success-stat-label text-[0.82rem] font-medium uppercase tracking-wide text-[var(--text-muted-light)]">Property Buyer</span>
          </div>
          <div className="success-stat flex flex-col rounded-[16px] bg-[rgba(255,255,255,0.05)] border border-[rgba(0,194,255,0.15)] backdrop-blur-[8px] transition-all duration-300 ease-out hover:border-[rgba(245,197,75,0.4)] hover:bg-[rgba(245,197,75,0.06)]" style={{ padding: 'clamp(14px, 2vw, 22px)' }}>
            <span className="success-stat-value font-bold leading-none mb-1 text-[var(--accent-strong)]" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }} data-value="4102">4,102</span>
            <span className="success-stat-label text-[0.82rem] font-medium uppercase tracking-wide text-[var(--text-muted-light)]">Property Sold</span>
          </div>
          <div className="success-stat flex flex-col rounded-[16px] bg-[rgba(255,255,255,0.05)] border border-[rgba(0,194,255,0.15)] backdrop-blur-[8px] transition-all duration-300 ease-out hover:border-[rgba(245,197,75,0.4)] hover:bg-[rgba(245,197,75,0.06)]" style={{ padding: 'clamp(14px, 2vw, 22px)' }}>
            <span className="success-stat-value font-bold leading-none mb-1 text-[var(--accent-strong)]" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }} data-value="837">837</span>
            <span className="success-stat-label text-[0.82rem] font-medium uppercase tracking-wide text-[var(--text-muted-light)]">Happy Family</span>
          </div>
          <div className="success-stat flex flex-col rounded-[16px] bg-[rgba(255,255,255,0.05)] border border-[rgba(0,194,255,0.15)] backdrop-blur-[8px] transition-all duration-300 ease-out hover:border-[rgba(245,197,75,0.4)] hover:bg-[rgba(245,197,75,0.06)]" style={{ padding: 'clamp(14px, 2vw, 22px)' }}>
            <span className="success-stat-value font-bold leading-none mb-1 text-[var(--accent-strong)]" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }} data-value="15">15+</span>
            <span className="success-stat-label text-[0.82rem] font-medium uppercase tracking-wide text-[var(--text-muted-light)]">years of experience</span>
          </div>
        </div>
      </div>
    </section>
  );
}
