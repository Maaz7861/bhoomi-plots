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
    <nav className="navbar flex justify-between items-center px-[5%] py-2 md:py-3 bg-transparent fixed top-0 left-0 right-0 z-[100] max-[900px]:sticky max-[900px]:top-0 max-[900px]:z-[100] [&.nav-open_.nav-links]:max-[900px]:flex [&.nav-open_.nav-auth]:max-[900px]:flex">
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
      <div className="nav-links flex gap-[30px] rounded-full px-6 py-2 bg-[var(--bg-navbar)] border border-[rgba(255,255,255,0.08)] max-[900px]:hidden max-[900px]:absolute max-[900px]:left-0 max-[900px]:top-full max-[900px]:flex-col max-[900px]:bg-[rgba(15,23,42,0.98)] max-[900px]:px-[5%] max-[900px]:py-[10px] max-[900px]:w-full max-[900px]:gap-4">
        <a href="/" className={`text-base font-medium whitespace-nowrap ${isActive('/') ? 'active text-[var(--primary-soft)] border-b-2 border-[var(--primary-soft)] pb-1' : 'text-white'}`}>Home</a>
        <a href="/about" className={`text-base font-medium whitespace-nowrap ${isActive('/about') ? 'active text-[var(--primary-soft)] border-b-2 border-[var(--primary-soft)] pb-1' : 'text-white'}`}>About</a>

        <div className="nav-item relative group/dropdown">
          <a href="/services" className="text-base text-white font-medium whitespace-nowrap inline-flex items-center gap-1">
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
          <a href="/projects" className="text-base text-white font-medium whitespace-nowrap inline-flex items-center gap-1">
            Projects
            <i className="fas fa-chevron-down nav-caret text-[0.6rem] mt-[2px]"></i>
          </a>
          <div className="nav-dropdown absolute top-full left-0 py-[10px] rounded-lg min-w-[200px] opacity-0 pointer-events-none bg-[rgba(15,23,42,0.98)] shadow-[0_12px_30px_rgba(0,0,0,0.35)] translate-y-[6px] transition-all duration-150 ease-out group-hover/dropdown:opacity-100 group-hover/dropdown:pointer-events-auto group-hover/dropdown:translate-y-0">
            <a href="/projects/lands" className="block px-4 py-2 text-[0.85rem] whitespace-nowrap text-[var(--text-soft)] hover:bg-[rgba(37,99,235,0.35)]">Lands</a>
            <a href="/projects/plots" className="block px-4 py-2 text-[0.85rem] whitespace-nowrap text-[var(--text-soft)] hover:bg-[rgba(37,99,235,0.35)]">Plots</a>
            <a href="/projects/residential" className="block px-4 py-2 text-[0.85rem] whitespace-nowrap text-[var(--text-soft)] hover:bg-[rgba(37,99,235,0.35)]">Residential</a>
          </div>
        </div>

        <a href="/gallery" className="text-base text-white font-medium whitespace-nowrap">Gallery</a>
        <a href="/careers" className="text-base text-white font-medium whitespace-nowrap">Careers</a>
        <a href="/contact" className="text-base text-white font-medium whitespace-nowrap">Contact</a>
        <a href="/blog" className="text-base text-white font-medium whitespace-nowrap">Blog</a>
      </div>
      <div className="nav-actions nav-auth flex items-center gap-5 max-[900px]:hidden max-[900px]:absolute max-[900px]:right-[5%] max-[900px]:top-[calc(100%+200px)] max-[900px]:flex-col max-[900px]:gap-[10px]">
        <button type="button" className="btn-social-handlers inline-flex items-center gap-2 text-white px-[22px] py-[10px] rounded-full text-[0.95rem] font-semibold cursor-pointer bg-[var(--bg-navbar)] border border-[rgba(0,194,255,0.5)] transition-all duration-200 hover:-translate-y-[1px] hover:bg-[var(--accent-strong)] hover:text-[var(--bg-dark)] hover:shadow-[0_6px_20px_rgba(0,194,255,0.4)]" id="socialHandlersBtn" aria-label="Open social links">
          <i className="fas fa-share-nodes text-base"></i> lets connect
        </button>
      </div>
    </nav>
  );
}
