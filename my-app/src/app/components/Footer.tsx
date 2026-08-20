import React from 'react';

export function Footer() {
  return (
    <footer className="footer mt-10 pt-9 px-[5%] pb-[18px] bg-[var(--bg-dark)] text-[var(--text-soft)]">
      <div className="footer-inner grid grid-cols-4 gap-x-6 gap-y-8 pb-5 border-b border-[rgba(148,163,184,0.35)] max-[900px]:grid-cols-2 max-[600px]:grid-cols-1 max-[600px]:gap-6">
        <div className="footer-col flex flex-col">
          <h4 className="text-[0.95rem] font-bold mb-3 text-[var(--accent)]">Address</h4>
          <p className="footer-address text-[0.85rem] m-0 leading-[1.65] text-[var(--text-muted-softer)]">
            Shree Hari Krushna Complex, Shop<br />
            Number 13 &amp; 14, Old Adgoan Naka,<br />
            Panchavati, Nashik, Maharashtra<br />
            422003
          </p>
          <p className="footer-hours mt-3 pt-[10px] text-[0.85rem] leading-[1.65] text-[var(--text-muted-softer)] border-t border-[rgba(148,163,184,0.2)]">
            Thu - Tue 10.00 AM - 07.00 PM<br />
            Wednesday - Closed
          </p>
        </div>
        <div className="footer-col flex flex-col">
          <h4 className="text-[0.95rem] font-bold mb-3 text-[var(--accent)]">Our Services</h4>
          <ul className="text-[0.85rem] m-0 leading-relaxed list-none p-0 text-[var(--text-muted-softer)] flex flex-col gap-[6px]">
            <li><a href="/services" className="text-[var(--text-muted-softer)] transition-colors duration-200 hover:text-[var(--accent-cyan)]">Farm House Plots</a></li>
            <li><a href="/services" className="text-[var(--text-muted-softer)] transition-colors duration-200 hover:text-[var(--accent-cyan)]">Industrial Plots</a></li>
            <li><a href="/services" className="text-[var(--text-muted-softer)] transition-colors duration-200 hover:text-[var(--accent-cyan)]">NA Plots</a></li>
            <li><a href="/services" className="text-[var(--text-muted-softer)] transition-colors duration-200 hover:text-[var(--accent-cyan)]">Residential Plots</a></li>
            <li><a href="/services" className="text-[var(--text-muted-softer)] transition-colors duration-200 hover:text-[var(--accent-cyan)]">Development Plots</a></li>
          </ul>
        </div>
        <div className="footer-col flex flex-col">
          <h4 className="text-[0.95rem] font-bold mb-3 text-[var(--accent)]">Contact Us</h4>
          <p className="text-[0.85rem] m-0 leading-relaxed text-[var(--text-muted-softer)] mb-[10px]"><a href="tel:+917083909008" className="text-[var(--text-muted-softer)] transition-colors duration-200 hover:text-[var(--accent-cyan)]">7083909008</a></p>
          <p className="text-[0.85rem] m-0 leading-relaxed text-[var(--text-muted-softer)]"><a href="mailto:bhoomiplots1@gmail.com" className="text-[var(--text-muted-softer)] transition-colors duration-200 hover:text-[var(--accent-cyan)]">bhoomiplots1@gmail.com</a></p>
          <div className="footer-social flex gap-3 mt-[14px]">
            <a href="https://www.instagram.com/bhoomigroup15/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full flex items-center justify-center text-base bg-[rgba(0,194,255,0.2)] text-[var(--accent-strong)] transition-all duration-200 hover:-translate-y-[2px] hover:bg-[var(--accent-strong)] hover:text-[var(--bg-dark)]">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.facebook.com/bhoomiplots1" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full flex items-center justify-center text-base bg-[rgba(0,194,255,0.2)] text-[var(--accent-strong)] transition-all duration-200 hover:-translate-y-[2px] hover:bg-[var(--accent-strong)] hover:text-[var(--bg-dark)]">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://x.com/bhoomiplots" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="w-9 h-9 rounded-full flex items-center justify-center text-base bg-[rgba(0,194,255,0.2)] text-[var(--accent-strong)] transition-all duration-200 hover:-translate-y-[2px] hover:bg-[var(--accent-strong)] hover:text-[var(--bg-dark)]">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.youtube.com/@BhoomiGroup15" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-9 h-9 rounded-full flex items-center justify-center text-base bg-[rgba(0,194,255,0.2)] text-[var(--accent-strong)] transition-all duration-200 hover:-translate-y-[2px] hover:bg-[var(--accent-strong)] hover:text-[var(--bg-dark)]">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="https://in.linkedin.com/company/bhoomigroup15" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-full flex items-center justify-center text-base bg-[rgba(0,194,255,0.2)] text-[var(--accent-strong)] transition-all duration-200 hover:-translate-y-[2px] hover:bg-[var(--accent-strong)] hover:text-[var(--bg-dark)]">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
        <div className="footer-col flex flex-col">
          <h4 className="text-[0.95rem] font-bold mb-3 text-[var(--accent)]">Career</h4>
          <p className="text-[0.85rem] m-0 leading-relaxed text-[var(--text-muted-softer)]"><a href="/careers" className="text-[var(--text-muted-softer)] transition-colors duration-200 hover:text-[var(--accent-cyan)]">Join our team</a></p>
        </div>
      </div>
      <div className="footer-bottom flex flex-wrap gap-[10px] justify-between pt-[14px] text-[0.78rem] text-[var(--text-muted)]">
        <span>&copy; 2025 Bhoomi Group. All rights reserved.</span>
        <span>Made with care for Indian real estate buyers.</span>
      </div>
    </footer>
  );
}
