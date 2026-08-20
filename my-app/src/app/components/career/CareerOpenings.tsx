"use client";
import React from 'react';

const openings = [
  {
    title: "Sales Executive – NA Plots",
    location: "Pune • Full‑time • On‑field + Office",
    points: [
      "Meet prospective buyers, explain projects and close sales.",
      "Coordinate site visits and maintain follow‑ups in CRM."
    ],
    experience: "1–4 years in real estate / sales"
  },
  {
    title: "Channel Partner Manager",
    location: "Mumbai / Thane • Full‑time",
    points: [
      "Onboard and manage broker network & channel partners.",
      "Conduct project trainings and ensure lead flow."
    ],
    experience: "3+ years in CP management"
  },
  {
    title: "Digital Marketing Executive",
    location: "Pune • Full‑time • Hybrid",
    points: [
      "Run performance campaigns for leads across portals & social.",
      "Coordinate creatives, landing pages and basic analytics."
    ],
    experience: "1–3 years, real estate preferred"
  },
  {
    title: "Customer Success Executive",
    location: "Nashik • Full‑time",
    points: [
      "Support customers post‑booking till registration.",
      "Coordinate documentation, payments and updates."
    ],
    experience: "1–3 years in customer service"
  }
];

export function CareerOpenings() {
  const scrollToForm = () => {
    document.getElementById('careerForm')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="px-[5%] md:px-[8%] py-12 md:py-16 bg-white relative">
      <div className="max-w-[1100px] mx-auto">
        
        <div className="text-center max-w-[600px] mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
            Open Positions
          </h2>
          <p className="text-base md:text-lg text-slate-500 font-medium">
            Select the role that fits you best and share your profile with us.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {openings.map((job, index) => (
            <div 
              key={index}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-6 md:p-8 flex flex-col hover:shadow-lg hover:border-[#cfa861]/30 transition-all duration-300 group"
            >
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2.5 group-hover:text-[#cfa861] transition-colors">
                {job.title}
              </h3>
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/50 text-slate-600 text-xs md:text-sm font-semibold mb-5 self-start">
                <i className="fas fa-map-marker-alt text-[#cfa861]"></i>
                {job.location}
              </div>

              <ul className="space-y-2.5 mb-6 flex-grow">
                {job.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <i className="fas fa-arrow-right text-[#cfa861] mt-1.5 text-[0.65rem]"></i>
                    <span className="text-sm md:text-base text-slate-600 font-medium">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-5 border-t border-slate-200 mt-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-xs md:text-sm font-medium text-slate-500">
                  <span className="text-slate-800 font-bold">Experience:</span> {job.experience}
                </div>
                <button 
                  onClick={scrollToForm}
                  className="px-5 py-2 bg-slate-900 hover:bg-[#cfa861] text-white rounded-full text-sm font-semibold transition-colors duration-300 shadow-md shadow-slate-900/10 hover:shadow-[#cfa861]/30 whitespace-nowrap"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
