"use client";
import React, { useEffect } from 'react';

import { Navbar } from '../components/Navbar';
import { AuthModals } from '../components/AuthModals';
import { Footer } from '../components/Footer';

// Projects Page Specific Components
import { ProjectsHero } from '../components/projects/ProjectsHero';
import { ProjectsTabs } from '../components/projects/ProjectsTabs';
import { ProjectsCTA } from '../components/projects/ProjectsCTA';

export default function ProjectsPage() {
  useEffect(() => {
    // Load original script.js to preserve interactive behaviour
    const script = document.createElement('script');
    script.src = '/assets/js/script.js';
    script.async = true;
    document.body.appendChild(script);

    // Add page-specific body class
    document.body.classList.add('projects-page');

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      document.body.classList.remove('projects-page');
    };
  }, []);

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-slate-50 flex flex-col">
        <ProjectsHero />
        <ProjectsTabs />
        <ProjectsCTA />
      </main>

      <AuthModals />
      <Footer />
    </>
  );
}
