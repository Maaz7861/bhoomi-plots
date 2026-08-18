import React from 'react';

export function SocialPopup() {
  return (
    <div className="social-popup-backdrop fixed inset-0 flex items-center justify-center opacity-0 pointer-events-none z-[1000] bg-[rgba(11,17,32,0.7)] backdrop-blur-[5px] transition-opacity duration-300 ease-out [&.active]:opacity-100 [&.active]:pointer-events-auto" id="socialPopbackdrop" aria-hidden="true">
      <div className="social-popup-panel relative w-[90%] max-w-[360px] rounded-[20px] text-center scale-95 bg-[var(--bg-dark)] border border-[rgba(0,194,255,0.15)] transition-transform duration-300 ease-out [.active_&]:scale-100" style={{ padding: 'clamp(24px, 4vw, 32px)', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)' }}>
        <button type="button" className="social-popup-close absolute top-3 right-4 bg-transparent border-none text-[1.6rem] cursor-pointer text-[var(--text-muted-light)] transition-colors duration-200 hover:text-[var(--accent-strong)]" id="socialPopClose" aria-label="Close">&times;</button>
        <h3 className="social-popup-title font-bold text-[1.4rem] mb-2 uppercase tracking-wide text-[var(--text-inverted)]">lets connect</h3>
        <p className="social-popup-subtitle text-[0.85rem] mb-6 text-[var(--text-muted-light)]">Follow Bhoomi Plots &amp; Land on social media</p>
        <div className="social-popup-icons flex justify-center gap-4">
          <a href="https://www.instagram.com/bhoomigroup15/" target="_blank" rel="noopener noreferrer" className="social-popup-icon w-12 h-12 rounded-full flex items-center justify-center text-[1.2rem] bg-[rgba(0,194,255,0.1)] text-[var(--accent-strong)] transition-all duration-200 ease-out hover:-translate-y-[3px] hover:bg-[var(--accent-strong)] hover:text-[var(--bg-dark)] hover:shadow-[0_8px_20px_rgba(0,194,255,0.3)]" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.facebook.com/bhoomiplots1" target="_blank" rel="noopener noreferrer" className="social-popup-icon w-12 h-12 rounded-full flex items-center justify-center text-[1.2rem] bg-[rgba(0,194,255,0.1)] text-[var(--accent-strong)] transition-all duration-200 ease-out hover:-translate-y-[3px] hover:bg-[var(--accent-strong)] hover:text-[var(--bg-dark)] hover:shadow-[0_8px_20px_rgba(0,194,255,0.3)]" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://x.com/bhoomiplots" target="_blank" rel="noopener noreferrer" className="social-popup-icon w-12 h-12 rounded-full flex items-center justify-center text-[1.2rem] bg-[rgba(0,194,255,0.1)] text-[var(--accent-strong)] transition-all duration-200 ease-out hover:-translate-y-[3px] hover:bg-[var(--accent-strong)] hover:text-[var(--bg-dark)] hover:shadow-[0_8px_20px_rgba(0,194,255,0.3)]" aria-label="X (Twitter)">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.youtube.com/@BhoomiGroup15" target="_blank" rel="noopener noreferrer" className="social-popup-icon w-12 h-12 rounded-full flex items-center justify-center text-[1.2rem] bg-[rgba(0,194,255,0.1)] text-[var(--accent-strong)] transition-all duration-200 ease-out hover:-translate-y-[3px] hover:bg-[var(--accent-strong)] hover:text-[var(--bg-dark)] hover:shadow-[0_8px_20px_rgba(0,194,255,0.3)]" aria-label="YouTube">
            <i className="fab fa-youtube"></i>
          </a>
          <a href="https://in.linkedin.com/company/bhoomigroup15" target="_blank" rel="noopener noreferrer" className="social-popup-icon w-12 h-12 rounded-full flex items-center justify-center text-[1.2rem] bg-[rgba(0,194,255,0.1)] text-[var(--accent-strong)] transition-all duration-200 ease-out hover:-translate-y-[3px] hover:bg-[var(--accent-strong)] hover:text-[var(--bg-dark)] hover:shadow-[0_8px_20px_rgba(0,194,255,0.3)]" aria-label="LinkedIn">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
