"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface ActiveBanner {
  _id?: string;
  imageUrl: string;
  ctaText?: string;
  link?: string;
  isActive: boolean;
}

export function BannerAd() {
  const [banner, setBanner] = useState<ActiveBanner | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchActiveBanner() {
      try {
        const res = await fetch('/api/banners/active', { cache: 'no-store' });
        const data = await res.json();
        if (data.success && data.data && data.data.imageUrl && data.data.isActive) {
          setBanner(data.data);
        } else {
          setBanner(null);
        }
      } catch {
        setBanner(null);
      } finally {
        setLoaded(true);
      }
    }
    fetchActiveBanner();
  }, []);

  // Do not render anything if not loaded yet or no active banner in DB
  if (!loaded || !banner) {
    return null;
  }

  const targetLink = banner.link || '/projects';
  const ctaLabel = banner.ctaText || 'Explore Now';

  return (
    <section className="banner-ad-section relative px-4 sm:px-6 lg:px-8 py-8 md:py-12 bg-[var(--bg-light)]">
      <div className="max-w-[1250px] mx-auto">
        <div className="relative rounded-[22px] overflow-hidden shadow-2xl border border-amber-500/30 group">
          {/* Background Banner Image */}
          <div 
            className="w-full min-h-[180px] sm:min-h-[240px] md:min-h-[300px] lg:min-h-[360px] bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ backgroundImage: `url("${banner.imageUrl}")` }}
          />

          {/* Subtle Bottom/Overlay Gradient for CTA visibility */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(15, 23, 42, 0.75) 0%, rgba(15, 23, 42, 0.2) 50%, transparent 100%)'
            }}
          />

          {/* Top Gold Border Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--primary)] via-[var(--accent-strong)] to-[var(--primary)]"></div>

          {/* Floating CTA Overlay if link or ctaText exists */}
          {(banner.ctaText || banner.link) && (
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10">
              <Link 
                href={targetLink}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold text-[0.88rem] sm:text-[0.95rem] text-slate-950 bg-gradient-to-r from-[#f5c54b] to-[#e39a2d] hover:from-[#e39a2d] hover:to-[#c58a23] shadow-lg shadow-amber-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-amber-500/50"
              >
                <span>{ctaLabel}</span>
                <i className="fas fa-arrow-right text-xs transition-transform duration-300 group-hover:translate-x-1"></i>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
