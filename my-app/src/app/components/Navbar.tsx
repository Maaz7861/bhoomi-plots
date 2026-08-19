"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SocialPopup } from './SocialPopup';

export function Navbar() {
  const pathname = usePathname();
  const [isSocialOpen, setIsSocialOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Auto-close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    if (path === '/' && pathname !== '/Home' && pathname !== '/') return false;
    if (path === '/' && (pathname === '/Home' || pathname === '/')) return true;
    return pathname?.startsWith(path);
  };

  return (
    <nav className={`navbar fixed top-0 left-0 right-0 z-[100] bg-transparent py-4 transition-all duration-300 max-[900px]:bg-[rgba(15,23,42,0.98)] max-[900px]:py-3 ${isMobileMenuOpen ? 'max-[900px]:shadow-none' : 'max-[900px]:shadow-lg'}`}>
      <div className="max-w-[1400px] mx-auto px-[5%] flex justify-between items-center w-full relative">
        
        <div>
          <img
            src="assets/images/bhoomi-logo-white-1-1536x526.png"
            alt="Bhoomi Plots and Land"
            style={{ height: '55px', width: 'auto', background: '#0f172add', borderRadius: '55px', padding: '0 12px' }}
          />
        </div>
        
        {/* Mobile menu toggle button managed by React */}
        <button 
          className="nav-toggle hidden max-[900px]:block bg-transparent border-none text-[1.4rem] cursor-pointer text-white" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          id="navToggle" 
          aria-label="Toggle menu" 
          aria-expanded={isMobileMenuOpen}
        >
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>

        <div className={`nav-links flex items-center gap-[30px] rounded-full max-[900px]:rounded-none px-8 py-3 bg-[var(--bg-navbar)] shadow-lg border border-[rgba(255,255,255,0.08)] max-[900px]:hidden max-[900px]:absolute max-[900px]:left-0 max-[900px]:top-full max-[900px]:flex-col max-[900px]:bg-[rgba(15,23,42,0.98)] max-[900px]:px-[5%] max-[900px]:py-[20px] max-[900px]:w-full max-[900px]:gap-4 ${isMobileMenuOpen ? 'max-[900px]:!flex' : ''}`}>
          <a href="/" className={`text-[0.95rem] font-semibold whitespace-nowrap transition-colors duration-200 ${isActive('/') ? 'active text-[#cfa861]' : 'text-white hover:text-[#cfa861]'}`}>Home</a>
          <a href="/about" className={`text-[0.95rem] font-semibold whitespace-nowrap transition-colors duration-200 ${isActive('/about') ? 'active text-[#cfa861]' : 'text-white hover:text-[#cfa861]'}`}>About</a>

          {/* Services Dropdown */}
          <div className="nav-item relative group/dropdown max-[900px]:w-full max-[900px]:flex max-[900px]:flex-col max-[900px]:items-center">
            <div className="flex items-center justify-center gap-1">
              <a href="/services" className={`text-[0.95rem] font-semibold whitespace-nowrap transition-colors duration-200 ${isActive('/services') ? 'active text-[#cfa861]' : 'text-white hover:text-[#cfa861]'}`}>
                Services
              </a>
              <i className="fas fa-chevron-down nav-caret text-[0.6rem] mt-[2px] max-[900px]:!hidden text-white group-hover/dropdown:text-[#cfa861] transition-colors ml-1"></i>
              <button 
                className="hidden max-[900px]:flex items-center justify-center p-2 text-white/70 hover:text-white"
                onClick={(e) => { e.preventDefault(); setOpenDropdown(openDropdown === 'services' ? null : 'services'); }}
                aria-label="Toggle Services menu"
              >
                <i className={`fas fa-chevron-down transition-transform duration-300 ${openDropdown === 'services' ? 'rotate-180 text-[#cfa861]' : ''}`}></i>
              </button>
            </div>
            
            <div className={`nav-dropdown absolute top-full left-0 py-[10px] rounded-lg min-w-[200px] opacity-0 pointer-events-none bg-[rgba(15,23,42,0.98)] shadow-[0_12px_30px_rgba(0,0,0,0.35)] translate-y-[6px] transition-all duration-150 ease-out group-hover/dropdown:opacity-100 group-hover/dropdown:pointer-events-auto group-hover/dropdown:translate-y-0 max-[900px]:static max-[900px]:shadow-none max-[900px]:bg-transparent max-[900px]:py-2 max-[900px]:overflow-hidden max-[900px]:transition-all max-[900px]:duration-300 ${openDropdown === 'services' ? 'max-[900px]:max-h-[300px] max-[900px]:opacity-100 max-[900px]:pointer-events-auto max-[900px]:mt-2' : 'max-[900px]:max-h-0 max-[900px]:opacity-0 max-[900px]:pointer-events-none max-[900px]:m-0 max-[900px]:p-0'}`}>
              <a href="/services?tab=sales" className="block px-4 py-2 text-[0.85rem] whitespace-nowrap text-[var(--text-soft)] hover:bg-[rgba(37,99,235,0.35)] max-[900px]:text-base max-[900px]:text-gray-300 max-[900px]:py-2 max-[900px]:hover:text-white max-[900px]:hover:bg-transparent max-[900px]:text-center">Sales</a>
              <a href="/services?tab=marketing" className="block px-4 py-2 text-[0.85rem] whitespace-nowrap text-[var(--text-soft)] hover:bg-[rgba(37,99,235,0.35)] max-[900px]:text-base max-[900px]:text-gray-300 max-[900px]:py-2 max-[900px]:hover:text-white max-[900px]:hover:bg-transparent max-[900px]:text-center">Marketing &amp; Branding</a>
              <a href="/services?tab=after" className="block px-4 py-2 text-[0.85rem] whitespace-nowrap text-[var(--text-soft)] hover:bg-[rgba(37,99,235,0.35)] max-[900px]:text-base max-[900px]:text-gray-300 max-[900px]:py-2 max-[900px]:hover:text-white max-[900px]:hover:bg-transparent max-[900px]:text-center">After Sales Services</a>
              <a href="/services?tab=analysis" className="block px-4 py-2 text-[0.85rem] whitespace-nowrap text-[var(--text-soft)] hover:bg-[rgba(37,99,235,0.35)] max-[900px]:text-base max-[900px]:text-gray-300 max-[900px]:py-2 max-[900px]:hover:text-white max-[900px]:hover:bg-transparent max-[900px]:text-center">Project Analysis</a>
            </div>
          </div>

          {/* Projects Dropdown */}
          <div className="nav-item relative group/dropdown max-[900px]:w-full max-[900px]:flex max-[900px]:flex-col max-[900px]:items-center">
            <div className="flex items-center justify-center gap-1">
              <a href="/projects" className={`text-[0.95rem] font-semibold whitespace-nowrap transition-colors duration-200 ${isActive('/projects') ? 'active text-[#cfa861]' : 'text-white hover:text-[#cfa861]'}`}>
                Projects
              </a>
              <i className="fas fa-chevron-down nav-caret text-[0.6rem] mt-[2px] max-[900px]:!hidden text-white group-hover/dropdown:text-[#cfa861] transition-colors ml-1"></i>
              <button 
                className="hidden max-[900px]:flex items-center justify-center p-2 text-white/70 hover:text-white"
                onClick={(e) => { e.preventDefault(); setOpenDropdown(openDropdown === 'projects' ? null : 'projects'); }}
                aria-label="Toggle Projects menu"
              >
                <i className={`fas fa-chevron-down transition-transform duration-300 ${openDropdown === 'projects' ? 'rotate-180 text-[#cfa861]' : ''}`}></i>
              </button>
            </div>
            
            <div className={`nav-dropdown absolute top-full left-0 py-[10px] rounded-lg min-w-[200px] opacity-0 pointer-events-none bg-[rgba(15,23,42,0.98)] shadow-[0_12px_30px_rgba(0,0,0,0.35)] translate-y-[6px] transition-all duration-150 ease-out group-hover/dropdown:opacity-100 group-hover/dropdown:pointer-events-auto group-hover/dropdown:translate-y-0 max-[900px]:static max-[900px]:shadow-none max-[900px]:bg-transparent max-[900px]:py-2 max-[900px]:overflow-hidden max-[900px]:transition-all max-[900px]:duration-300 ${openDropdown === 'projects' ? 'max-[900px]:max-h-[300px] max-[900px]:opacity-100 max-[900px]:pointer-events-auto max-[900px]:mt-2' : 'max-[900px]:max-h-0 max-[900px]:opacity-0 max-[900px]:pointer-events-none max-[900px]:m-0 max-[900px]:p-0'}`}>
              <a href="/projects?tab=plots" className="block px-4 py-2 text-[0.85rem] whitespace-nowrap text-[var(--text-soft)] hover:bg-[rgba(37,99,235,0.35)] max-[900px]:text-base max-[900px]:text-gray-300 max-[900px]:py-2 max-[900px]:hover:text-white max-[900px]:hover:bg-transparent max-[900px]:text-center">Plots</a>
              <a href="/projects?tab=land" className="block px-4 py-2 text-[0.85rem] whitespace-nowrap text-[var(--text-soft)] hover:bg-[rgba(37,99,235,0.35)] max-[900px]:text-base max-[900px]:text-gray-300 max-[900px]:py-2 max-[900px]:hover:text-white max-[900px]:hover:bg-transparent max-[900px]:text-center">Land</a>
              <a href="/projects?tab=residential" className="block px-4 py-2 text-[0.85rem] whitespace-nowrap text-[var(--text-soft)] hover:bg-[rgba(37,99,235,0.35)] max-[900px]:text-base max-[900px]:text-gray-300 max-[900px]:py-2 max-[900px]:hover:text-white max-[900px]:hover:bg-transparent max-[900px]:text-center">Residentials</a>
              <a href="/projects?tab=commercial" className="block px-4 py-2 text-[0.85rem] whitespace-nowrap text-[var(--text-soft)] hover:bg-[rgba(37,99,235,0.35)] max-[900px]:text-base max-[900px]:text-gray-300 max-[900px]:py-2 max-[900px]:hover:text-white max-[900px]:hover:bg-transparent max-[900px]:text-center">Commercials</a>
            </div>
          </div>

          <a href="/gallery" className={`text-[0.95rem] font-semibold whitespace-nowrap transition-colors duration-200 ${isActive('/gallery') ? 'active text-[#cfa861]' : 'text-white hover:text-[#cfa861]'}`}>Gallery</a>
          <a href="/careers" className={`text-[0.95rem] font-semibold whitespace-nowrap transition-colors duration-200 ${isActive('/careers') ? 'active text-[#cfa861]' : 'text-white hover:text-[#cfa861]'}`}>Careers</a>
          <a href="/contact" className={`text-[0.95rem] font-semibold whitespace-nowrap transition-colors duration-200 ${isActive('/contact') ? 'active text-[#cfa861]' : 'text-white hover:text-[#cfa861]'}`}>Contact</a>
          <a href="/blog" className={`text-[0.95rem] font-semibold whitespace-nowrap transition-colors duration-200 ${isActive('/blog') ? 'active text-[#cfa861]' : 'text-white hover:text-[#cfa861]'}`}>Blog</a>
          
          {/* Let's Connect button for Mobile only */}
          <div className="hidden max-[900px]:flex mt-4 w-full justify-center">
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSocialOpen(true);
              }} 
              type="button" 
              className="inline-flex items-center justify-center gap-2 text-white px-[24px] py-[10px] rounded-full text-[0.95rem] font-semibold cursor-pointer bg-slate-800 border border-slate-600 transition-all duration-200 hover:bg-[#cfa861] hover:text-white hover:border-[#cfa861] w-full max-w-[250px]"
            >
              <i className="fas fa-share-nodes text-base"></i> Let's Connect
            </button>
          </div>
        </div>

        <div className="nav-actions nav-auth flex items-center gap-5 max-[900px]:hidden max-[900px]:absolute max-[900px]:right-[5%] max-[900px]:top-[calc(100%+200px)] max-[900px]:flex-col max-[900px]:gap-[10px]">
          <button 
            onClick={() => setIsSocialOpen(true)} 
            type="button" 
            className="btn-social-handlers inline-flex items-center gap-2 text-white px-[24px] py-[10px] rounded-full text-[0.95rem] font-semibold cursor-pointer bg-slate-800 border border-slate-600 transition-all duration-200 hover:-translate-y-[1px] hover:bg-[#cfa861] hover:text-white hover:border-[#cfa861] hover:shadow-[0_6px_20px_rgba(207,168,97,0.4)]" 
            id="socialHandlersBtn" 
            aria-label="Open social links"
          >
            <i className="fas fa-share-nodes text-base"></i> Let's Connect
          </button>
        </div>
      </div>
      
      {/* Social Handlers Popup */}
      <SocialPopup isOpen={isSocialOpen} onClose={() => setIsSocialOpen(false)} />
    </nav>
  );
}
