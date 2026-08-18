"use client";
import React, { useEffect } from 'react';

import { Navbar } from '../components/Navbar';
import { SocialPopup } from '../components/SocialPopup';
import { AuthModals } from '../components/AuthModals';
import { Footer } from '../components/Footer';
import { Hero } from '../components/ui/Hero';
import { SuccessSection } from '../components/ui/SuccessSection';
import { WhyChooseUs } from '../components/ui/WhyChooseUs';
import { LatestWork } from '../components/ui/LatestWork';
import { Testimonials } from '../components/ui/Testimonials';
import { VideosFaq } from '../components/ui/VideosFaq';

export default function HomePage() {
  useEffect(() => {
    // Load original script.js to preserve all interactive behaviour
    // (navbar toggle, FAQ accordion, testimonials carousel, social popup, etc.)
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
      <Hero />
      <SuccessSection />
      <WhyChooseUs />
      <LatestWork />
      <Testimonials />
      <VideosFaq />
      <AuthModals />
      <Footer />
    </>
  );
}