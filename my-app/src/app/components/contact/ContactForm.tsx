"use client";

import React from 'react';

export function ContactForm() {
  return (
    <div>
      <h3 className="text-lg font-bold mb-1.5 text-[var(--text-dark-strong)] tracking-tight">Write to us</h3>
      <p className="text-[var(--text-body-muted)] mb-4 text-[0.8rem]">
        Share a few basic details and our team will get back to you shortly.
      </p>

      <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[0.75rem] font-semibold text-[var(--text-stronger)]">Full Name</label>
            <input 
              type="text" 
              placeholder="Enter your name" 
              className="w-full px-3 py-2 rounded-lg border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--primary)] transition-all bg-white text-[var(--text-dark)] text-[0.85rem]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[0.75rem] font-semibold text-[var(--text-stronger)]">Mobile Number</label>
            <input 
              type="tel" 
              placeholder="+91-" 
              className="w-full px-3 py-2 rounded-lg border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--primary)] transition-all bg-white text-[var(--text-dark)] text-[0.85rem]"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[0.75rem] font-semibold text-[var(--text-stronger)]">Email</label>
            <input 
              type="email" 
              placeholder="name@email.com" 
              className="w-full px-3 py-2 rounded-lg border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--primary)] transition-all bg-white text-[var(--text-dark)] text-[0.85rem]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[0.75rem] font-semibold text-[var(--text-stronger)]">Looking for</label>
            <input
              type="text"
              placeholder="Plots, residential..." 
              className="w-full px-3 py-2 rounded-lg border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--primary)] transition-all bg-white text-[var(--text-dark)] text-[0.85rem]"
            />
          </div>
        </div>
        
        <div className="flex flex-col gap-1">
          <label className="text-[0.75rem] font-semibold text-[var(--text-stronger)]">Message</label>
          <textarea
            rows={2}
            placeholder="Tell us briefly what you are looking for"
            className="w-full px-3 py-2 rounded-lg border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--primary)] transition-all bg-white text-[var(--text-dark)] resize-none text-[0.85rem]"
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          className="mt-1 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold py-2 px-5 rounded-lg transition-all shadow hover:-translate-y-px w-full sm:w-auto self-start flex items-center justify-center gap-2 text-[0.85rem]"
        >
          <span>Submit Enquiry</span>
          <i className="fas fa-paper-plane text-[0.75rem]"></i>
        </button>
      </form>
    </div>
  );
}
