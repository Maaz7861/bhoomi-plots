import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ContactHero } from '../components/contact/ContactHero';
import { ContactInfo } from '../components/contact/ContactInfo';
import { ContactForm } from '../components/contact/ContactForm';
import { ContactMap } from '../components/contact/ContactMap';
import { ContactCTA } from '../components/contact/ContactCTA';

export const metadata = {
  title: 'Contact – Bhoomi Plots & Land',
  description: 'Reach out to Bhoomi Plots & Land for site visits, project details or investment guidance.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-light)]">
      <Navbar />
      
      <ContactHero />
      
      {/* Detached Left/Right Layout (Compact Version) */}
      <section className="px-[5%] md:px-[8%] py-10 md:py-16 max-w-[1500px] mx-auto relative z-10 -mt-10 md:-mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Left Block: Contact Info & Form */}
          <div className="lg:col-span-7 xl:col-span-6 bg-white rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-[var(--border-subtle-alt)] p-6 md:p-8 flex flex-col h-full">
            <ContactInfo />
            
            <div className="w-full h-px bg-gradient-to-r from-[var(--border-subtle-alt)] via-[var(--border-subtle)] to-[var(--border-subtle-alt)] my-5"></div>
            
            <div className="flex-1">
              <ContactForm />
            </div>
          </div>
          
          {/* Right Block: Map */}
          <div className="lg:col-span-5 xl:col-span-6 bg-white rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-[var(--border-subtle-alt)] p-6 md:p-8 flex flex-col h-full">
            <div className="mb-5 text-center lg:text-left">
              <div className="inline-flex items-center justify-center px-3 py-1 mb-3 rounded-full bg-[var(--primary)]/10 text-[var(--primary-hover)] text-[0.7rem] font-bold uppercase tracking-wider">
                Our Location
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-[var(--text-dark-strong)] mb-2">Visit Our Office</h2>
              <p className="text-[var(--text-body-muted)] text-[0.85rem] md:text-sm leading-relaxed">
                Conveniently located in the heart of Nashik. Drop by for a cup of coffee and a discussion.
              </p>
            </div>
            
            {/* Tighter min-height for the map to match the compacted left card */}
            <div className="flex-1 relative w-full min-h-[300px] lg:min-h-0 h-full rounded-2xl overflow-hidden shadow-inner border border-[var(--border-subtle)]">
              <ContactMap />
            </div>
          </div>

        </div>
      </section>

      <ContactCTA />

      <Footer />
    </main>
  );
}
