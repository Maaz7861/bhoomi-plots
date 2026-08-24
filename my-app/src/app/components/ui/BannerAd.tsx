"use client";
import React from 'react';
import Link from 'next/link';

export interface BannerAdProps {
  imageUrl?: string;
  badgeText?: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  link?: string;
}

export function BannerAd({
  imageUrl = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&auto=format&fit=crop&q=80",
  badgeText = "Limited Period Pre-Launch Offer",
  title = "Explore Prime NA Plots with Lakefront & Hill Views",
  subtitle = "RERA-approved gated plotted developments with tar roads, water, electricity & modern clubhouse amenities near prime IT corridors.",
  ctaText = "Explore Premium Plots",
  link = "/projects?tab=plots",
}: BannerAdProps) {
  return (
    <section className="banner-ad-section relative px-4 sm:px-6 lg:px-8 py-10 md:py-14 bg-[var(--bg-light)]">
      <div className="max-w-[1250px] mx-auto">
        <div className="relative rounded-[22px] overflow-hidden shadow-2xl border border-amber-500/30 group">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ backgroundImage: `url("${imageUrl}")` }}
          />

          {/* Dark Glass & Gradient Overlay */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(105deg, rgba(10, 15, 29, 0.95) 0%, rgba(15, 23, 42, 0.88) 45%, rgba(15, 23, 42, 0.55) 100%)'
            }}
          />

          {/* Decorative Gold Accent Glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--primary)]/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-[var(--accent-strong)]/15 rounded-full blur-2xl pointer-events-none"></div>

          {/* Top Gold Border Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--primary)] via-[var(--accent-strong)] to-[var(--primary)]"></div>

          {/* Content Container */}
          <div className="relative z-10 p-6 sm:p-10 md:p-12 lg:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            
            {/* Left Column: Text Content */}
            <div className="max-w-2xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(197,138,35,0.2)] border border-[rgba(245,197,75,0.4)] text-[var(--accent-strong)] text-[0.72rem] md:text-[0.78rem] font-bold uppercase tracking-wider mb-4 shadow-sm backdrop-blur-md">
                <i className="fas fa-sparkles text-[0.7rem]"></i>
                <span>{badgeText}</span>
              </div>

              {/* Headline */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight mb-3">
                {title}
              </h2>

              {/* Subtitle */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-xl opacity-90">
                {subtitle}
              </p>

              {/* Highlights / Quick Perks */}
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-semibold text-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[0.65rem] border border-emerald-500/30">
                    <i className="fas fa-check"></i>
                  </span>
                  <span>100% Clear Title</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[0.65rem] border border-emerald-500/30">
                    <i className="fas fa-check"></i>
                  </span>
                  <span>Bank Loan Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[0.65rem] border border-emerald-500/30">
                    <i className="fas fa-check"></i>
                  </span>
                  <span>Immediate Registration</span>
                </div>
              </div>
            </div>

            {/* Right Column: Call to Action */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto shrink-0">
              <Link 
                href={link}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-[0.95rem] text-slate-950 bg-gradient-to-r from-[#f5c54b] to-[#e39a2d] hover:from-[#e39a2d] hover:to-[#c58a23] shadow-lg shadow-amber-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-amber-500/40"
              >
                <span>{ctaText}</span>
                <i className="fas fa-arrow-right text-xs transition-transform duration-300 group-hover:translate-x-1"></i>
              </Link>
              
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-[0.9rem] text-white bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-md transition-all duration-200"
              >
                <i className="fas fa-phone-volume text-xs text-[var(--accent-strong)]"></i>
                <span>Enquire Now</span>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
