"use client";
import React, { useEffect } from 'react';

import { Navbar } from '../components/Navbar';
import { SocialPopup } from '../components/SocialPopup';
import { AuthModals } from '../components/AuthModals';
import { Footer } from '../components/Footer';

// Career Page Specific Components
import { CareerHero } from '../components/career/CareerHero';
import { CareerPerks } from '../components/career/CareerPerks';
import { CareerOpenings } from '../components/career/CareerOpenings';
import { CareerForm } from '../components/career/CareerForm';

export default function CareerPage() {
  useEffect(() => {
    // Load original script.js to preserve interactive behaviour
    const script = document.createElement('script');
    script.src = '/assets/js/script.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <Navbar />
      <SocialPopup />
      
      <main className="min-h-screen bg-slate-50 flex flex-col">
        <CareerHero />
        <CareerPerks />
        <CareerOpenings />
        <CareerForm />
      </main>

      <AuthModals />
      <Footer />
    </>
  );
}
