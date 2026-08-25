"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProjectCard, Project } from './ProjectCard';
import { ProjectModal } from './ProjectModal';

type Tab = 'plots' | 'land' | 'residential' | 'commercial';

// Fallback initial data if database is empty or offline
const fallbackProjectsData: Record<Tab, Project[]> = {
  plots: [
    {
      id: 'p1',
      image: '/projects/plot.jpg',
      gallery: ['/projects/plot.jpg'],
      title: 'Lakeview Township',
      price: '₹ 45 Lakh',
      subPrice: 'Starting Price',
      features: '1200 sq.ft • 3000 sq.ft • Lake Front',
      description: 'Plotted development with central park, lake promenade and clubhouse, near key IT corridors.',
      location: 'Near Hinjewadi, Pune',
      developer: 'Bhoomi Projects',
      developerVerified: true,
      status: 'Fast Selling',
      reraNumber: 'P52100012345',
      isFeatured: true,
      hasVideo: true,
      isLiked: true,
    },
    {
      id: 'p2',
      image: '/projects/plot.jpg',
      title: 'Expressway Enclave',
      price: '₹ 60 Lakh',
      subPrice: 'Starting Price',
      features: '2000 sq.ft • 5000 sq.ft • Highway Touch',
      description: 'Road‑touch plots just off the expressway, ideal for commercial and mixed‑use developments.',
      location: 'Pune–Mumbai Expressway',
      developer: 'Bhoomi Projects',
      developerVerified: true,
      status: 'Limited Inventory',
      reraNumber: 'P52100067890',
    },
  ],
  land: [
    {
      id: 'l1',
      image: '/projects/land.jpg',
      title: 'Bhoomi Hills',
      price: '₹ 2.5 Cr',
      subPrice: 'Per Acre',
      features: 'NA Land • Clear Title • Hill View',
      description: 'Scenic NA land parcels overlooking hills, ideal for long‑term investment and future farm houses.',
      location: 'Nashik Road, Nashik',
      developer: 'Bhoomi Projects',
      developerVerified: true,
      status: 'High Appreciation',
      reraNumber: 'P51600022334',
      isFeatured: true,
    },
  ],
  residential: [
    {
      id: 'r1',
      image: '/projects/residential.jpg',
      gallery: ['/projects/residential.jpg'],
      title: 'Premium Bungalow',
      price: '₹ 1.27 Cr',
      subPrice: '₹ 1.15 Cr Approx',
      features: '3 Bds • 3 Ba • 1,250 sqft',
      description: 'Premium 3 BHK bungalow with private sit-out in the heart of Camp.',
      location: '500 MG Road, Camp, Pune',
      developer: 'Bhoomi Prime',
      developerVerified: true,
      status: 'RERA Approved',
      reraNumber: 'P52100088990',
      isFeatured: true,
    },
  ],
  commercial: [
    {
      id: 'c1',
      image: '/projects/commercial.jpg',
      gallery: ['/projects/commercial.jpg'],
      title: 'Horizon IT Park',
      price: '₹ 3.5 Cr',
      subPrice: 'Starting Price',
      features: 'Grade A • Office Spaces • Food Court',
      description: 'Premium office spaces designed for modern IT and multinational companies.',
      location: 'Baner, Pune',
      developer: 'Bhoomi Commercials',
      developerVerified: true,
      status: 'Under Construction',
      reraNumber: 'P52100033445',
      isFeatured: true,
    },
  ],
};

function ProjectsTabsContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');

  const [activeTab, setActiveTab] = useState<Tab>('plots');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [livePlots, setLivePlots] = useState<Record<Tab, Project[]>>(fallbackProjectsData);

  useEffect(() => {
    if (tabParam && ['plots', 'land', 'residential', 'commercial'].includes(tabParam)) {
      setActiveTab(tabParam as Tab);
    }
  }, [tabParam]);

  useEffect(() => {
    async function fetchLivePlots() {
      try {
        const res = await fetch('/api/plots', { cache: 'no-store' });
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const categorized: Record<Tab, Project[]> = {
            plots: [],
            land: [],
            residential: [],
            commercial: [],
          };

          data.data.forEach((item: any) => {
            const cat = item.category as Tab;
            if (categorized[cat]) {
              categorized[cat].push({
                id: item._id,
                title: item.title,
                image: item.imageUrl || `/projects/${cat === 'residential' ? 'residential' : cat === 'commercial' ? 'commercial' : cat === 'land' ? 'land' : 'plot'}.jpg`,
                gallery: [item.imageUrl || '/projects/plot.jpg'],
                price: item.price,
                priceRange: item.priceRange || '',
                bhk: item.bhk || '',
                subPrice: 'Starting Price',
                features: item.features || '',
                description: item.description || '',
                location: item.location || '',
                developer: item.developer || 'Bhoomi Projects',
                developerVerified: true,
                status: item.status || 'Verified',
                reraNumber: item.reraNumber || '',
                isFeatured: !!item.isFeatured,
              });
            }
          });

          // Only override categories that have items in DB, otherwise retain fallback
          setLivePlots((prev) => ({
            plots: categorized.plots.length > 0 ? categorized.plots : prev.plots,
            land: categorized.land.length > 0 ? categorized.land : prev.land,
            residential: categorized.residential.length > 0 ? categorized.residential : prev.residential,
            commercial: categorized.commercial.length > 0 ? categorized.commercial : prev.commercial,
          }));
        }
      } catch {
        // Fallback gracefully to static data
      }
    }
    fetchLivePlots();
  }, []);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'plots', label: 'Plots' },
    { id: 'land', label: 'Land' },
    { id: 'residential', label: 'Residentials' },
    { id: 'commercial', label: 'Commercials' },
  ];

  const currentProjects = livePlots[activeTab] || [];

  return (
    <>
      <section className="px-[5%] md:px-[8%] pb-20 pt-4 bg-transparent relative">
        <div className="w-full max-w-[1250px] mx-auto flex flex-col items-center">
          
          {/* Tab Buttons */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 w-full max-[900px]:flex-nowrap max-[900px]:justify-start max-[900px]:overflow-x-auto max-[900px]:pb-4 max-[900px]:pt-2 max-[900px]:snap-x max-[900px]:snap-mandatory scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`px-8 py-3.5 max-[900px]:shrink-0 max-[900px]:snap-center rounded-full font-bold transition-all duration-300 tracking-wide text-[0.95rem] ${
                  activeTab === tab.id 
                    ? 'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/30 -translate-y-1' 
                    : 'bg-white text-[var(--text-body)] border border-slate-200 hover:border-[var(--primary-soft)] hover:text-[var(--primary)] hover:shadow-md'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {currentProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onViewClick={(p) => setSelectedProject(p)}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Render Modal if a project is selected */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </>
  );
}

export function ProjectsTabs() {
  return (
    <Suspense fallback={<div className="h-[600px] flex items-center justify-center"><div className="w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div></div>}>
      <ProjectsTabsContent />
    </Suspense>
  );
}
