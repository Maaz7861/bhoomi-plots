import React from 'react';

export function LatestWork() {
  return (
    <section className="latest-work-section py-[clamp(40px,6vw,64px)] px-[5%] bg-[var(--bg-light-soft)]">
      <h2 className="latest-work-title text-center font-bold mb-2 text-[var(--text-dark-strong)]" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)' }}>Our Latest Work</h2>
      <p className="latest-work-subtitle text-center text-[0.9rem] mb-8 text-[var(--text-muted)]">Recent projects and properties we&apos;ve delivered</p>
      <div className="latest-work-grid grid gap-6 max-w-[1100px] mx-auto" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
        <a href="/projects" className="latest-work-card block rounded-[16px] overflow-hidden bg-[#fff] transition-all duration-300 ease-out hover:-translate-y-[6px] group/card" style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}>
          <div className="latest-work-img-wrap relative overflow-hidden h-[200px]">
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" alt="Residential project" className="w-full h-full object-cover transition-transform duration-400 ease-out group-hover/card:scale-105" />
            <span className="latest-work-tag absolute top-3 left-3 text-[0.72rem] font-bold uppercase tracking-wide px-2 py-1 rounded-md bg-[var(--primary)] text-[#fff]">Residential</span>
          </div>
          <div className="latest-work-body px-5 py-4">
            <h3 className="text-[1rem] font-bold mb-1 text-[var(--text-dark-strong)]">West Pune Township</h3>
            <p className="text-[0.83rem] text-[var(--text-muted)]">Bavdhan, Pune</p>
          </div>
        </a>
        <a href="/projects" className="latest-work-card block rounded-[16px] overflow-hidden bg-[#fff] transition-all duration-300 ease-out hover:-translate-y-[6px] group/card" style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}>
          <div className="latest-work-img-wrap relative overflow-hidden h-[200px]">
            <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80" alt="Apartment project" className="w-full h-full object-cover transition-transform duration-400 ease-out group-hover/card:scale-105" />
            <span className="latest-work-tag absolute top-3 left-3 text-[0.72rem] font-bold uppercase tracking-wide px-2 py-1 rounded-md bg-[var(--primary)] text-[#fff]">Apartments</span>
          </div>
          <div className="latest-work-body px-5 py-4">
            <h3 className="text-[1rem] font-bold mb-1 text-[var(--text-dark-strong)]">Kharadi Heights</h3>
            <p className="text-[0.83rem] text-[var(--text-muted)]">Kharadi, Pune</p>
          </div>
        </a>
        <a href="/projects" className="latest-work-card block rounded-[16px] overflow-hidden bg-[#fff] transition-all duration-300 ease-out hover:-translate-y-[6px] group/card" style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}>
          <div className="latest-work-img-wrap relative overflow-hidden h-[200px]">
            <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80" alt="Villa project" className="w-full h-full object-cover transition-transform duration-400 ease-out group-hover/card:scale-105" />
            <span className="latest-work-tag absolute top-3 left-3 text-[0.72rem] font-bold uppercase tracking-wide px-2 py-1 rounded-md bg-[var(--primary)] text-[#fff]">Villas</span>
          </div>
          <div className="latest-work-body px-5 py-4">
            <h3 className="text-[1rem] font-bold mb-1 text-[var(--text-dark-strong)]">Riverside Villas</h3>
            <p className="text-[0.83rem] text-[var(--text-muted)]">Hinjewadi, Pune</p>
          </div>
        </a>
        <a href="/projects" className="latest-work-card block rounded-[16px] overflow-hidden bg-[#fff] transition-all duration-300 ease-out hover:-translate-y-[6px] group/card" style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}>
          <div className="latest-work-img-wrap relative overflow-hidden h-[200px]">
            <img src="https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=600&q=80" alt="Plots project" className="w-full h-full object-cover transition-transform duration-400 ease-out group-hover/card:scale-105" />
            <span className="latest-work-tag absolute top-3 left-3 text-[0.72rem] font-bold uppercase tracking-wide px-2 py-1 rounded-md bg-[var(--primary)] text-[#fff]">Plots &amp; Land</span>
          </div>
          <div className="latest-work-body px-5 py-4">
            <h3 className="text-[1rem] font-bold mb-1 text-[var(--text-dark-strong)]">Green Valley Plots</h3>
            <p className="text-[0.83rem] text-[var(--text-muted)]">Wagholi, Pune</p>
          </div>
        </a>
      </div>
      <div className="latest-work-cta flex justify-center mt-8">
        <a href="/projects" className="btn-primary inline-block px-5 py-[10px] rounded-[6px] font-semibold text-[0.9rem] transition-all duration-300 ease-out bg-[var(--primary)] text-[var(--accent)] hover:bg-[var(--primary-hover)]">View All Projects</a>
      </div>
    </section>
  );
}
