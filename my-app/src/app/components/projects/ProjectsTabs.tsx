"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProjectCard, Project } from './ProjectCard';
import { ProjectModal } from './ProjectModal';

type Tab = 'plots' | 'land' | 'residential' | 'commercial';

// India-specific and context-accurate images
const projectsData: Record<Tab, Project[]> = {
  plots: [
    {
      id: 'p1',
      image: '/projects/plot.jpg',
      gallery: [
        '/projects/plot.jpg'
      ],
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
    {
      id: 'p3',
      image: '/projects/plot.jpg',
      title: 'Green Meadows Plots',
      price: '₹ 28 Lakh',
      subPrice: 'Starting Price',
      features: '800 sq.ft • 1500 sq.ft • NA Plots',
      description: 'Budget-friendly clear-title NA plots with internal tar roads and electricity connections.',
      location: 'Shirwal, Pune',
      developer: 'Bhoomi Projects',
      developerVerified: true,
      status: 'New Launch',
      reraNumber: 'P52100055443',
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
    {
      id: 'l2',
      image: '/projects/land.jpg',
      title: 'Agro Estates',
      price: '₹ 1.2 Cr',
      subPrice: 'Per Acre',
      features: 'Agricultural • Water Access',
      description: 'Fertile agricultural land with water access, suitable for plantations and agro‑tourism concepts.',
      location: 'Satara',
      developer: 'Bhoomi Projects',
      developerVerified: true,
      status: 'Phase 1 Open',
      reraNumber: 'P52700011223',
    },
    {
      id: 'l3',
      image: '/projects/land.jpg',
      title: 'Coastal Reserves',
      price: '₹ 3.8 Cr',
      subPrice: 'Per Acre',
      features: 'Coastal Regulation Zone • Resort Potential',
      description: 'Prime land parcel near the konkan coast. Perfect for luxury resort development or private estates.',
      location: 'Alibaug, Maharashtra',
      developer: 'Bhoomi Projects',
      developerVerified: true,
      status: 'Exclusive Listing',
      reraNumber: 'P52000044556',
      isFeatured: true,
    }
  ],
  residential: [
    {
      id: 'r1',
      image: '/projects/residential.jpg',
      gallery: [
        '/projects/residential.jpg'
      ],
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
      hasVideo: true,
    },
    {
      id: 'r2',
      image: '/projects/residential.jpg',
      gallery: [
        '/projects/residential.jpg'
      ],
      title: 'Riverfront Residency',
      price: '₹ 92 Lakh',
      subPrice: '₹ 85 Lakh Approx',
      features: '2 Bds • 2 Ba • 910 sqft',
      description: 'Ready-to-move 2 BHK apartment in a gated society with clubhouse.',
      location: 'Baner, Pune',
      developer: 'Riverfront Residency',
      developerVerified: true,
      status: 'Ready to Move',
      reraNumber: 'P52100077889',
      isLiked: true,
    },
    {
      id: 'r3',
      image: '/projects/residential.jpg',
      title: 'Skyline Homes',
      price: '₹ 78 Lakh',
      subPrice: '₹ 72 Lakh Approx',
      features: '2 Bds • 2 Ba • 840 sqft',
      description: 'Compact and well-ventilated 2 BHK close to IT parks and malls.',
      location: 'Kharadi, Pune',
      developer: 'Skyline Homes',
      developerVerified: true,
      status: 'Under Construction',
      reraNumber: 'P52100066778',
      isLiked: true,
    },
  ],
  commercial: [
    {
      id: 'c1',
      image: '/projects/commercial.jpg',
      gallery: [
        '/projects/commercial.jpg'
      ],
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
    {
      id: 'c2',
      image: '/projects/commercial.jpg',
      title: 'Retail Hub',
      price: '₹ 1.8 Cr',
      subPrice: 'Starting Price',
      features: 'Shops • Showrooms • High Footfall',
      description: 'High footfall retail spaces in the fastest growing commercial corridor.',
      location: 'Hinjewadi Phase 1, Pune',
      developer: 'Bhoomi Commercials',
      developerVerified: true,
      status: 'Pre-launch Offers',
      reraNumber: 'P52100022334',
    },
    {
      id: 'c3',
      image: '/projects/commercial.jpg',
      title: 'Apex Business Center',
      price: '₹ 85 Lakh',
      subPrice: 'Starting Price',
      features: 'Boutique Offices • Co-working',
      description: 'Smart boutique offices tailored for startups and medium-sized enterprises.',
      location: 'Viman Nagar, Pune',
      developer: 'Bhoomi Commercials',
      developerVerified: true,
      status: 'Ready to Move',
      reraNumber: 'P52100011223',
    }
  ]
};

function ProjectsTabsContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');

  const [activeTab, setActiveTab] = useState<Tab>('plots');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (tabParam && ['plots', 'land', 'residential', 'commercial'].includes(tabParam)) {
      setActiveTab(tabParam as Tab);
    }
  }, [tabParam]);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'plots', label: 'Plots' },
    { id: 'land', label: 'Land' },
    { id: 'residential', label: 'Residentials' },
    { id: 'commercial', label: 'Commercials' },
  ];

  return (
    <>
      <section className="px-[5%] md:px-[8%] pb-20 pt-4 bg-transparent relative">
        <div className="w-full max-w-[1250px] mx-auto flex flex-col items-center">
          
          {/* Tab Buttons */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 w-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`px-8 py-3.5 rounded-full font-bold transition-all duration-300 tracking-wide text-[0.95rem] ${
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
            {projectsData[activeTab].map((project) => (
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
