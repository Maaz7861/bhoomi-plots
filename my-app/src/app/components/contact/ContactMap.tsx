import React from 'react';

export function ContactMap() {
  return (
    <>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7283.18538469237!2d73.802847!3d20.009123!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x853487d93d9f99b1%3A0xb100d269bc985d00!2sBhoomi%20Group%20%231%20Real%20Estate%20%26%20land%20Developers%20Company%20in%20Nashik!5e1!3m2!1sen!2sin!4v1770633342200!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0, filter: 'contrast(1.02)' }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 w-full h-full"
      ></iframe>
      
      {/* Decorative floating badge on map */}
      <div className="absolute bottom-4 left-4 md:bottom-5 md:left-5 bg-white/95 backdrop-blur-md px-3 py-2.5 rounded-xl shadow border border-white flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0">
          <i className="fas fa-location-arrow text-sm"></i>
        </div>
        <div>
          <p className="font-bold text-[var(--text-dark-strong)] text-[0.8rem] leading-tight">Head Office</p>
          <p className="text-[0.65rem] font-semibold text-[var(--text-muted)] mt-0.5">Nashik</p>
        </div>
      </div>
    </>
  );
}
