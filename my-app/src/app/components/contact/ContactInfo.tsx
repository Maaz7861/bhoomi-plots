import React from 'react';

export function ContactInfo() {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold mb-1.5 text-[var(--text-dark-strong)] tracking-tight">Contact Details</h2>
      <p className="text-[var(--text-body-muted)] mb-4 text-[0.85rem] leading-relaxed">
        Reach out to us using any of the methods below.
      </p>

      <div className="flex flex-col gap-2.5">
        {/* Address */}
        <div className="group bg-[var(--bg-light)] px-4 py-3 rounded-xl border border-[var(--border-subtle-alt)] hover:shadow-sm transition-all hover:border-[var(--primary)]/30 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
            <i className="fas fa-map-marker-alt text-[var(--primary)] group-hover:text-white text-sm"></i>
          </div>
          <div>
            <h3 className="text-[0.65rem] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Address</h3>
            <p className="text-[var(--text-dark-strong)] text-[0.8rem] font-medium leading-snug">
              Shree Hari Krishna Complex, Shop 13 &amp; 14, Old Adgaon Naka, Panchavati, Nashik, MH 422009
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="group bg-[var(--bg-light)] px-4 py-3 rounded-xl border border-[var(--border-subtle-alt)] hover:shadow-sm transition-all hover:border-[var(--primary)]/30 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
            <i className="fas fa-phone-alt text-[var(--primary)] group-hover:text-white text-sm"></i>
          </div>
          <div>
            <h3 className="text-[0.65rem] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Phone</h3>
            <p className="text-[var(--text-dark-strong)] font-semibold text-[0.9rem]">
              <a href="tel:+917083909008" className="hover:text-[var(--primary)] transition-colors">+91 70839 09008</a>
            </p>
          </div>
        </div>
        
        {/* Email */}
        <div className="group bg-[var(--bg-light)] px-4 py-3 rounded-xl border border-[var(--border-subtle-alt)] hover:shadow-sm transition-all hover:border-[var(--primary)]/30 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
            <i className="fas fa-envelope text-[var(--primary)] group-hover:text-white text-sm"></i>
          </div>
          <div>
            <h3 className="text-[0.65rem] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Email</h3>
            <p className="text-[var(--text-dark-strong)] font-semibold text-[0.85rem] break-all">
              <a href="mailto:bhoomiplots1@gmail.com" className="hover:text-[var(--primary)] transition-colors">
                bhoomiplots1@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
