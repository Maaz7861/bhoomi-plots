"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '../components/Navbar';
import { SocialPopup } from '../components/SocialPopup';
import { Hero } from '../components/ui/Hero';
import { SuccessSection } from '../components/ui/SuccessSection';
import { WhyChooseUs } from '../components/ui/WhyChooseUs';
import { LatestWork } from '../components/ui/LatestWork';
import { Testimonials } from '../components/ui/Testimonials';
import { VideosFaq } from '../components/ui/VideosFaq';
import { AuthModals } from '../components/AuthModals';
import { Footer } from '../components/Footer';

export default function HomePage() {
  useEffect(() => {
    // We dynamically load the script logic here to preserve exact functionality
    const script = document.createElement("script");
    script.src = "/assets/js/script.js";
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
