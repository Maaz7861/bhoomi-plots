"use client";
import React, { useEffect, useState } from 'react';

const PLACEHOLDER_IMAGE = '/projects/placeholder.svg';
const MAX_CARDS = 4;

interface WorkPlot {
  _id: string;
  title: string;
  category: string;
  location: string;
  imageUrl?: string;
  isFeatured?: boolean;
}

const CATEGORY_LABEL: Record<string, string> = {
  residential: 'Residential',
  commercial: 'Commercial',
  plots: 'Plots',
  land: 'Land',
};

/**
 * Which plots the "Our Latest Work" section shows (`plots` arrive newest first from the API):
 *  1. featured residential
 *  2. else featured commercial
 *  3. else residential, then commercial, then whatever the admin added
 */
export function pickLatestWork(plots: WorkPlot[]): WorkPlot[] {
  const ofCategory = (list: WorkPlot[], category: string) => list.filter((p) => p.category === category);
  const featured = plots.filter((p) => p.isFeatured);

  const picked =
    ofCategory(featured, 'residential').length > 0 ? ofCategory(featured, 'residential')
    : ofCategory(featured, 'commercial').length > 0 ? ofCategory(featured, 'commercial')
    : ofCategory(plots, 'residential').length > 0 ? ofCategory(plots, 'residential')
    : ofCategory(plots, 'commercial').length > 0 ? ofCategory(plots, 'commercial')
    : plots;

  return picked.slice(0, MAX_CARDS);
}

export function LatestWork() {
  const [items, setItems] = useState<WorkPlot[] | null>(null); // null = still loading

  useEffect(() => {
    let cancelled = false;
    fetch('/api/plots')
      .then((res) => res.json())
      .then((json) => {
        if (!cancelled) setItems(json?.success && Array.isArray(json.data) ? pickLatestWork(json.data) : []);
      })
      .catch(() => {
        if (!cancelled) setItems([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="latest-work-section py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--bg-light)]">
      <div className="text-center mb-10 md:mb-12">
        <h2 className="font-extrabold text-[#0f172a] text-3xl md:text-4xl mb-3">Our Work</h2>
        <p className="text-[0.95rem] md:text-base text-slate-500">Well-planned homes, plots and land, built on trust and transparency</p>
      </div>

      {items === null && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-[1200px] mx-auto" aria-hidden="true">
          {Array.from({ length: MAX_CARDS }).map((_, i) => (
            <div key={i} className="h-[320px] rounded-2xl bg-slate-200/70 animate-pulse" />
          ))}
        </div>
      )}

      {items !== null && items.length === 0 && (
        <p className="text-center text-lg font-semibold text-slate-500 py-10">
          Coming soon — our latest projects will be showcased here.
        </p>
      )}

      {items !== null && items.length > 0 && (
        <>
          <div className="flex flex-wrap justify-center gap-6 max-w-[1200px] mx-auto">
            {items.map((plot) => (
              <a key={plot._id} href="/projects" className="block w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md group">
                <div className="relative h-[220px] overflow-hidden">
                  <img
                    src={plot.imageUrl || PLACEHOLDER_IMAGE}
                    alt={plot.title}
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (!img.src.endsWith(PLACEHOLDER_IMAGE)) img.src = PLACEHOLDER_IMAGE;
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 text-[0.75rem] font-bold tracking-wide px-3 py-1.5 rounded-lg bg-[#22d3ee] text-[#0f172a] shadow-sm">
                    {CATEGORY_LABEL[plot.category] ?? plot.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold mb-1 text-[#0f172a]">{plot.title}</h3>
                  <p className="text-[0.85rem] text-slate-500">{plot.location}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <a href="/projects" className="inline-block px-8 py-3 rounded-lg font-bold text-[0.95rem] transition-all duration-300 ease-out bg-[#d97706] text-white hover:bg-[#b45309] hover:shadow-lg">
              View All Projects
            </a>
          </div>
        </>
      )}
    </section>
  );
}
