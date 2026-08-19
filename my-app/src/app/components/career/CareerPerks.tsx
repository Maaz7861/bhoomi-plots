import React from 'react';

const perks = [
  "Transparent, ethical and growth‑oriented culture",
  "Hands‑on experience across sales, marketing and operations",
  "Learning exposure to NA plots, farm lands and townships",
  "Performance‑linked rewards and fast‑track career growth"
];

const stats = [
  { number: "50+", label: "Team Members" },
  { number: "10+", label: "Cities Presence" },
  { number: "5000+", label: "Happy Customers" }
];

export function CareerPerks() {
  return (
    <section className="px-[5%] md:px-[8%] py-12 md:py-16 bg-slate-50 relative">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        
        {/* Left Side: Perks */}
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">
            Why work with Bhoomi?
          </h2>
          <ul className="space-y-6">
            {perks.map((perk, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#cfa861]/10 flex items-center justify-center text-[#cfa861] mt-0.5">
                  <i className="fas fa-check text-xs"></i>
                </div>
                <p className="text-base text-slate-600 font-medium leading-relaxed">
                  {perk}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side: Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-[#cfa861]/5 blur-[80px] rounded-full z-0"></div>
          
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`relative z-10 bg-white rounded-xl p-6 border border-slate-100 shadow-lg shadow-slate-200/40 hover:-translate-y-1 transition-transform duration-300 ${
                index === 2 ? 'sm:col-span-2 sm:max-w-[50%] sm:justify-self-center w-full' : ''
              }`}
            >
              <div className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-1">
                {stat.number}
              </div>
              <div className="text-xs md:text-sm font-bold text-[#cfa861] uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
