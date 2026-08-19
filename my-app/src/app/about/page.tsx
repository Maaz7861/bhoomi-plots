"use client";
import React, { useEffect } from 'react';

import { Navbar } from '../components/Navbar';
import { AuthModals } from '../components/AuthModals';
import { Footer } from '../components/Footer';

// About Page Specific Components
import { AboutHero } from '../components/about/AboutHero';
import { AboutIntro } from '../components/about/AboutIntro';
import { AboutVisionMission } from '../components/about/AboutVisionMission';
import { AboutExperts } from '../components/about/AboutExperts';
import { AboutOffer } from '../components/about/AboutOffer';

export default function AboutPage() {
  useEffect(() => {
    // Load original script.js to preserve interactive behaviour
    // like navbar toggle and social popup.
    const script = document.createElement('script');
    script.src = '/assets/js/script.js';
    script.async = true;
    document.body.appendChild(script);

    // Add page-specific body class for any remaining global styles
    document.body.classList.add('about-page');

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      document.body.classList.remove('about-page');
    };
  }, []);

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-slate-50 flex flex-col">
        <AboutHero />
        <AboutIntro />
        <AboutVisionMission />
        <AboutExperts />
        <AboutOffer />
      </main>

      <AuthModals />
      <Footer />
    </>
  );
}
