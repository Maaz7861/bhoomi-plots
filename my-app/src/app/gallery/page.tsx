"use client";
import React, { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { GalleryHero } from '../components/gallery/GalleryHero';
import { GalleryGrid } from '../components/gallery/GalleryGrid';
import { ProjectsCTA } from '../components/projects/ProjectsCTA';
import { Footer } from '../components/Footer';

export default function GalleryPage() {
  useEffect(() => {
    // Inject legacy script for social popup handlers
    const script = document.createElement('script');
    script.src = '/assets/js/script.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex flex-col">
        <GalleryHero />
        <GalleryGrid />
      </div>

      <div className="bg-white">
        <ProjectsCTA />
      </div>

      <Footer />
    </main>
  );
}
