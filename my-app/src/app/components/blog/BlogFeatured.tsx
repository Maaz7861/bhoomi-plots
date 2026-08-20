import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function BlogFeatured() {
  return (
    <section className="h-full flex flex-col">
      <div className="flex items-center gap-4 mb-6 shrink-0">
        <h2 className="text-2xl font-bold text-[var(--text-dark-strong)] tracking-tight">Featured Article</h2>
        <div className="flex-1 h-px bg-[var(--border-subtle)]"></div>
      </div>
      
      <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_25px_50px_-12px_rgba(197,138,35,0.25)] hover:-translate-y-2 transition-all duration-500 border border-[var(--border-subtle-alt)] hover:border-[var(--primary)]/30 flex flex-col relative flex-1">
        
        {/* Featured Image Area */}
        <div className="w-full aspect-[2/1] md:aspect-[21/9] bg-slate-100 relative overflow-hidden shrink-0 border-b border-[var(--border-subtle-alt)]">
          <Image 
            src="/projects/land.jpg" 
            alt="How to evaluate NA plots" 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur text-[var(--primary)] text-xs font-bold uppercase tracking-wider rounded shadow-sm">
              Guide
            </span>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="p-6 md:p-8 flex flex-col flex-1 bg-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-3 text-[var(--text-dark-strong)] group-hover:text-[var(--primary)] transition-colors leading-tight">
            How to evaluate NA plots before you invest
          </h3>
          <p className="text-[var(--text-body-muted)] mb-8 text-[0.95rem] md:text-base leading-relaxed max-w-3xl">
            A step‑by‑step checklist on location, title, approvals and on‑site
            checks before finalising your plot. Learn how to protect your investment with ease.
          </p>
          
          <div className="flex items-center justify-between border-t border-[var(--border-subtle-alt)] pt-5 mt-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--bg-light)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-stronger)] font-bold text-sm">
                BT
              </div>
              <div className="flex flex-col">
                <span className="text-[0.85rem] font-bold text-[var(--text-dark-strong)]">Bhoomi Team</span>
                <span className="text-[0.75rem] font-medium text-[var(--text-muted)]">5 min read</span>
              </div>
            </div>
            
            <span className="text-[var(--primary)] text-sm font-bold flex items-center gap-1 group-hover:underline">
              Read Article <i className="fas fa-arrow-right text-xs ml-1"></i>
            </span>
          </div>
        </div>
        
        <Link href="#" className="absolute inset-0 z-10" aria-label="Read featured article"></Link>
      </article>
    </section>
  );
}
