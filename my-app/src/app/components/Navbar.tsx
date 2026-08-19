"use client";
import React from 'react';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    if (path === '/' && pathname !== '/Home' && pathname !== '/') return false;
    if (path === '/' && (pathname === '/Home' || pathname === '/')) return true;
    return pathname?.startsWith(path);
  };
  
  return (
    <nav className="navbar fixed top-0 left-0 right-0 z-[100] bg-transparent py-4 transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-[5%] flex justify-between items-center w-full relative">
        <div>
          <img
            src="assets/images/bhoomi-logo-white-1-1536x526.png"
            alt="Bhoomi Plots and Land"
            style={{ height: '55px', width: 'auto', background: '#0f172add', borderRadius: '55px', padding: '0 12px' }}
          />
        </div>
        <button className="nav-toggle hidden max-[900px]:block bg-transparent border-none text-[1.4rem] cursor-pointer text-[var(--accent)]" id="navToggle" aria-label="Toggle menu" aria-expanded="false">
          <i className="fas fa-bars"></i>
        </button>
        <div className="nav-links flex items-center gap-[30px] rounded-full px-8 py-3 bg-[var(--bg-navbar)] shadow-lg border border-[rgba(255,255,255,0.08)] max-[900px]:hidden max-[900px]:absolute max-[900px]:left-0 max-[900px]:top-full max-[900px]:flex-col max-[900px]:bg-[rgba(15,23,42,0.98)] max-[900px]:px-[5%] max-[900px]:py-[10px] max-[900px]:w-full max-[900px]:gap-4">
        <a href="/" className={`text-[0.95rem] font-semibold whitespace-nowrap transition-colors duration-200 ${isActive('/') ? 'active text-[#cfa861]' : 'text-white hover:text-[#cfa861]'}`}>Home</a>
        <a href="/about" className={`text-[0.95rem] font-semibold whitespace-nowrap transition-colors duration-200 ${isActive('/about') ? 'active text-[#cfa861]' : 'text-white hover:text-[#cfa861]'}`}>About</a>

        <div className="nav-item relative group/dropdown">
          <a href="/services" className={`text-[0.95rem] font-semibold whitespace-nowrap inline-flex items-center gap-1.5 transition-colors duration-200 ${isActive('/services') ? 'active text-[#cfa861]' : 'text-white hover:text-[#cfa861]'}`}>
            Services
            <i className="fas fa-chevron-down nav-caret text-[0.6rem] mt-[2px]"></i>
          </a>
          <div className="nav-dropdown absolute top-full left-0 py-[10px] rounded-lg min-w-[200px] opacity-0 pointer-events-none bg-[rgba(15,23,42,0.98)] shadow-[0_12px_30px_rgba(0,0,0,0.35)] translate-y-[6px] transition-all duration-150 ease-out group-hover/dropdown:opacity-100 group-hover/dropdown:pointer-events-auto group-hover/dropdown:translate-y-0">
            <a href="/services?tab=sales" className="block px-4 py-2 text-[0.85rem] whitespace-nowrap text-[var(--text-soft)] hover:bg-[rgba(37,99,235,0.35)]">Sales</a>
            <a href="/services?tab=marketing" className="block px-4 py-2 text-[0.85rem] whitespace-nowrap text-[var(--text-soft)] hover:bg-[rgba(37,99,235,0.35)]">Marketing &amp; Branding</a>
            <a href="/services?tab=after" className="block px-4 py-2 text-[0.85rem] whitespace-nowrap text-[var(--text-soft)] hover:bg-[rgba(37,99,235,0.35)]">After Sales Services</a>
            <a href="/services?tab=analysis" className="block px-4 py-2 text-[0.85rem] whitespace-nowrap text-[var(--text-soft)] hover:bg-[rgba(37,99,235,0.35)]">Project Analysis</a>
          </div>
        </div>

        <div className="nav-item relative group/dropdown">
          <a href="/projects" className={`text-[0.95rem] font-semibold whitespace-nowrap inline-flex items-center gap-1.5 transition-colors duration-200 ${isActive('/projects') ? 'active text-[#cfa861]' : 'text-white hover:text-[#cfa861]'}`}>
            Projects
            <i className="fas fa-chevron-down nav-caret text-[0.6rem] mt-[2px]"></i>
          </a>
          <div className="nav-dropdown absolute top-full left-0 py-[10px] rounded-lg min-w-[200px] opacity-0 pointer-events-none bg-[rgba(15,23,42,0.98)] shadow-[0_12px_30px_rgba(0,0,0,0.35)] translate-y-[6px] transition-all duration-150 ease-out group-hover/dropdown:opacity-100 group-hover/dropdown:pointer-events-auto group-hover/dropdown:translate-y-0">
            <a href="/projects?tab=plots" className="block px-4 py-2 text-[0.85rem] whitespace-nowrap text-[var(--text-soft)] hover:bg-[rgba(37,99,235,0.35)]">Plots</a>
            <a href="/projects?tab=land" className="block px-4 py-2 text-[0.85rem] whitespace-nowrap text-[var(--text-soft)] hover:bg-[rgba(37,99,235,0.35)]">Land</a>
            <a href="/projects?tab=residential" className="block px-4 py-2 text-[0.85rem] whitespace-nowrap text-[var(--text-soft)] hover:bg-[rgba(37,99,235,0.35)]">Residentials</a>
            <a href="/projects?tab=commercial" className="block px-4 py-2 text-[0.85rem] whitespace-nowrap text-[var(--text-soft)] hover:bg-[rgba(37,99,235,0.35)]">Commercials</a>
          </div>
        </div>

        <a href="/gallery" className={`text-[0.95rem] font-semibold whitespace-nowrap transition-colors duration-200 ${isActive('/gallery') ? 'active text-[#cfa861]' : 'text-white hover:text-[#cfa861]'}`}>Gallery</a>
        <a href="/careers" className={`text-[0.95rem] font-semibold whitespace-nowrap transition-colors duration-200 ${isActive('/careers') ? 'active text-[#cfa861]' : 'text-white hover:text-[#cfa861]'}`}>Careers</a>
        <a href="/contact" className={`text-[0.95rem] font-semibold whitespace-nowrap transition-colors duration-200 ${isActive('/contact') ? 'active text-[#cfa861]' : 'text-white hover:text-[#cfa861]'}`}>Contact</a>
        <a href="/blog" className={`text-[0.95rem] font-semibold whitespace-nowrap transition-colors duration-200 ${isActive('/blog') ? 'active text-[#cfa861]' : 'text-white hover:text-[#cfa861]'}`}>Blog</a>
      </div>
      <div className="nav-actions nav-auth flex items-center gap-5 max-[900px]:hidden max-[900px]:absolute max-[900px]:right-[5%] max-[900px]:top-[calc(100%+200px)] max-[900px]:flex-col max-[900px]:gap-[10px]">
        <button type="button" className="btn-social-handlers inline-flex items-center gap-2 text-white px-[24px] py-[10px] rounded-full text-[0.95rem] font-semibold cursor-pointer bg-slate-800 border border-slate-600 transition-all duration-200 hover:-translate-y-[1px] hover:bg-[#cfa861] hover:text-white hover:border-[#cfa861] hover:shadow-[0_6px_20px_rgba(207,168,97,0.4)]" id="socialHandlersBtn" aria-label="Open social links">
          <i className="fas fa-share-nodes text-base"></i> Let's Connect
        </button>
      </div>
      </div>
    </nav>
  );
}
