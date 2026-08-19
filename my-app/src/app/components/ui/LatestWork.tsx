import React from 'react';

export function LatestWork() {
  return (
    <section className="latest-work-section py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--bg-light)]">
      <div className="text-center mb-10 md:mb-12">
        <h2 className="font-extrabold text-[#0f172a] text-3xl md:text-4xl mb-3">Our Latest Work</h2>
        <p className="text-[0.95rem] md:text-base text-slate-500">Recent projects and properties we've delivered</p>
      </div>
      
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-[1200px] mx-auto">
        {/* Card 1 */}
        <a href="/projects" className="block rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md group">
          <div className="relative h-[220px] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" alt="Residential project" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <span className="absolute top-4 left-4 text-[0.75rem] font-bold tracking-wide px-3 py-1.5 rounded-lg bg-[#22d3ee] text-[#0f172a] shadow-sm">Residential</span>
          </div>
          <div className="p-5">
            <h3 className="text-base font-bold mb-1 text-[#0f172a]">West Pune Township</h3>
            <p className="text-[0.85rem] text-slate-500">Bavdhan, Pune</p>
          </div>
        </a>

        {/* Card 2 */}
        <a href="/projects" className="block rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md group">
          <div className="relative h-[220px] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80" alt="Apartment project" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <span className="absolute top-4 left-4 text-[0.75rem] font-bold tracking-wide px-3 py-1.5 rounded-lg bg-[#22d3ee] text-[#0f172a] shadow-sm">Apartments</span>
          </div>
          <div className="p-5">
            <h3 className="text-base font-bold mb-1 text-[#0f172a]">Kharadi Heights</h3>
            <p className="text-[0.85rem] text-slate-500">Kharadi, Pune</p>
          </div>
        </a>

        {/* Card 3 */}
        <a href="/projects" className="block rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md group">
          <div className="relative h-[220px] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80" alt="Villa project" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <span className="absolute top-4 left-4 text-[0.75rem] font-bold tracking-wide px-3 py-1.5 rounded-lg bg-[#22d3ee] text-[#0f172a] shadow-sm">Villas</span>
          </div>
          <div className="p-5">
            <h3 className="text-base font-bold mb-1 text-[#0f172a]">Riverside Villas</h3>
            <p className="text-[0.85rem] text-slate-500">Hinjewadi, Pune</p>
          </div>
        </a>

        {/* Card 4 */}
        <a href="/projects" className="block rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md group">
          <div className="relative h-[220px] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=600&q=80" alt="Plots project" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <span className="absolute top-4 left-4 text-[0.75rem] font-bold tracking-wide px-3 py-1.5 rounded-lg bg-[#22d3ee] text-[#0f172a] shadow-sm">Plots &amp; Land</span>
          </div>
          <div className="p-5">
            <h3 className="text-base font-bold mb-1 text-[#0f172a]">Green Valley Plots</h3>
            <p className="text-[0.85rem] text-slate-500">Wagholi, Pune</p>
          </div>
        </a>
      </div>

      <div className="flex justify-center mt-12">
        <a href="/projects" className="inline-block px-8 py-3 rounded-lg font-bold text-[0.95rem] transition-all duration-300 ease-out bg-[#d97706] text-white hover:bg-[#b45309] hover:shadow-lg">
          View All Projects
        </a>
      </div>
    </section>
  );
}
