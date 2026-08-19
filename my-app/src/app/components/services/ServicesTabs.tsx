"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

type Tab = 'sales' | 'marketing' | 'after' | 'analysis';

function ServicesTabsContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');

  const [activeTab, setActiveTab] = useState<Tab>('sales');

  useEffect(() => {
    if (tabParam && ['sales', 'marketing', 'after', 'analysis'].includes(tabParam)) {
      setActiveTab(tabParam as Tab);
    }
  }, [tabParam]);

  const tabs = [
    { id: 'sales', label: 'Sales' },
    { id: 'marketing', label: 'Marketing & Branding' },
    { id: 'after', label: 'After Sales Services' },
    { id: 'analysis', label: 'Project Analysis' },
  ];

  const tabContent = {
    sales: [
      {
        icon: 'fas fa-user-tie',
        title: 'Sales Advisory & Discovery',
        desc: 'One‑to‑one discussions to understand your investment style, ticket size and time horizon so that we can design a personalised buying plan for you.',
        bullets: ['Clarify goals – self use, weekend home or pure investment', 'Explain risk / return across land, plots and residential', 'Prioritise locations based on budget and timelines']
      },
      {
        icon: 'fas fa-map-location-dot',
        title: 'Site Visits & Micro‑market Research',
        desc: 'Curated site visits with local intelligence on infrastructure, connectivity, social growth and future government plans.',
        bullets: ['Short‑listed projects mapped in a single visit route', 'On‑ground checks for approach roads and surroundings', 'Comparisons with competing projects in the same belt']
      },
      {
        icon: 'fas fa-handshake',
        title: 'Negotiation & Booking Support',
        desc: 'We represent you in discussions with developers to secure the best possible price, payment schedule and add‑ons.',
        bullets: ['Special launch offers and channel partner benefits', 'Support with token amount, allotment letters and receipts', 'Co‑ordination for unit, plot or survey number locking']
      }
    ],
    marketing: [
      {
        icon: 'fas fa-bullhorn',
        title: 'Project Marketing & Branding',
        desc: 'For developers and land owners, we position your project in the right way for today’s digital‑first buyer.',
        bullets: ['Brand story, naming and positioning for the project', 'Brochures, site branding and walkthrough presentations', 'Channel partner communication kits and training']
      },
      {
        icon: 'fas fa-file-signature',
        title: 'Campaigns & Lead Management',
        desc: 'Integrated campaigns across performance marketing, events and broker networks with full‑funnel tracking.',
        bullets: ['Google / Meta ads and real estate portals optimisation', 'Call‑centre and site‑visit management processes', 'Dashboards for enquiry, visit and booking conversions']
      },
      {
        icon: 'fas fa-people-group',
        title: 'Channel Partner Ecosystem',
        desc: 'Build and manage a strong channel partner base in key cities to ensure consistent monthly bookings.',
        bullets: ['Onboarding of brokers and wealth partners', 'Incentive structures and payout management', 'Quarterly performance reviews and targets']
      }
    ],
    after: [
      {
        icon: 'fas fa-coins',
        title: 'Financing & Bank Tie‑ups',
        desc: 'Assistance in identifying suitable bank or NBFC finance options for your land, plot or home purchase.',
        bullets: ['Pre‑approved projects and panelled banks', 'Loan eligibility, documentation and application support', 'Co‑ordination for disbursements and stage‑wise payments']
      },
      {
        icon: 'fas fa-file-contract',
        title: 'Registration & Handover Co‑ordination',
        desc: 'Ground‑level support for agreement drafting, registration and post‑registration formalities.',
        bullets: ['Slot booking at registrar office where applicable', 'Checklist for documents and ID proofs', 'Assistance with possession letters and utility connections']
      },
      {
        icon: 'fas fa-headset',
        title: 'Customer Experience & Long‑term Support',
        desc: 'Relationship team that stays with you even after possession to help with resale or upgrade plans.',
        bullets: ['Support tickets for queries and issue resolution', 'Assistance in renting or re‑selling selected assets', 'Periodic portfolio review for repeat investments']
      }
    ],
    analysis: [
      {
        icon: 'fas fa-scale-balanced',
        title: 'Legal Due Diligence',
        desc: 'Independent checks on land titles, approvals and regulatory compliances to reduce legal risk.',
        bullets: ['Title search reports and encumbrance checks', 'Verification of approvals, sanctions and RERA status', 'Review of agreement clauses from buyer perspective']
      },
      {
        icon: 'fas fa-chart-line',
        title: 'Project Feasibility & Analysis',
        desc: 'Data‑backed analysis of demand, pricing and configuration mix to shape new plotted or residential launches.',
        bullets: ['Catchment study and buyer persona definition', 'Price‑band recommendations and absorption forecasts', 'Product mix suggestions – plot sizes, unit types, phases']
      },
      {
        icon: 'fas fa-chart-pie',
        title: 'Land Acquisition & JV Advisory',
        desc: 'For investors and developers, we help evaluate and structure land deals and joint‑venture opportunities.',
        bullets: ['Initial screening of land parcels and ownership patterns', 'High‑level financial modelling and exit scenarios', 'Deal structuring inputs for JVs and revenue share models']
      }
    ]
  };

  return (
    <section className="px-[5%] md:px-[8%] pb-12 pt-4 bg-transparent">
      <div className="w-full max-w-[1100px] mx-auto flex flex-col items-center">
        
        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 w-full max-[900px]:flex-nowrap max-[900px]:justify-start max-[900px]:overflow-x-auto max-[900px]:pb-4 max-[900px]:pt-2 max-[900px]:snap-x max-[900px]:snap-mandatory scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`px-6 py-3 max-[900px]:shrink-0 max-[900px]:snap-center rounded-full font-semibold transition-all duration-300 ${
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
          {tabContent[activeTab].map((service, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 hover:border-[var(--primary-soft)] hover:shadow-[0_15px_35px_rgba(197,138,35,0.1)] hover:-translate-y-1.5 transition-all duration-500 ease-out flex flex-col items-start text-left w-full group relative overflow-hidden"
            >
              {/* Subtle hover gradient line at the bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent-strong)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

              <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 text-[var(--primary)] text-2xl flex items-center justify-center mb-6 group-hover:bg-[var(--primary)] group-hover:border-[var(--primary)] group-hover:text-white group-hover:shadow-md transition-all duration-500">
                <i className={service.icon}></i>
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-[var(--text-dark-strong)] leading-snug group-hover:text-[var(--primary)] transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="text-[0.95rem] text-[var(--text-body)] mb-6 leading-relaxed">
                {service.desc}
              </p>
              
              <ul className="flex flex-col gap-3 mt-auto w-full border-t border-slate-100 pt-5">
                {service.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3 text-[0.85rem] text-[var(--text-body-muted)] leading-relaxed">
                    <i className="fas fa-check-circle text-[var(--primary-soft)] mt-[3px]"></i>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export function ServicesTabs() {
  return (
    <Suspense fallback={<div className="h-[600px] flex items-center justify-center"><div className="w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div></div>}>
      <ServicesTabsContent />
    </Suspense>
  );
}
