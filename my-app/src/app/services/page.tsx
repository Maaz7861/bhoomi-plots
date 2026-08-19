"use client";
import React, { useEffect } from 'react';

import { Navbar } from '../components/Navbar';
import { SocialPopup } from '../components/SocialPopup';
import { AuthModals } from '../components/AuthModals';
import { Footer } from '../components/Footer';

// Services Page Specific Components
import { ServicesHero } from '../components/services/ServicesHero';
import { ServicesTabs } from '../components/services/ServicesTabs';
import { ServicesProcess } from '../components/services/ServicesProcess';
import { ServicesCTA } from '../components/services/ServicesCTA';

export default function ServicesPage() {
  useEffect(() => {
    // Load original script.js to preserve interactive behaviour
    // like navbar toggle and social popup.
    const script = document.createElement('script');
    script.src = '/assets/js/script.js';
    script.async = true;
    document.body.appendChild(script);

    // Add page-specific body class for any remaining global styles
    document.body.classList.add('services-page');

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      document.body.classList.remove('services-page');
    };
  }, []);

  return (
    <>
      <Navbar />
      <SocialPopup />
      
      <main className="min-h-screen">
        <ServicesHero />
        <ServicesTabs />
        <ServicesProcess />
        <ServicesCTA />
      </main>

      <AuthModals />
      <Footer />
    </>
  );
}
