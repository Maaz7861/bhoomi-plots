import React from 'react';

export function ServicesProcess() {
  const steps = [
    { num: "01", text: "Understand your goals & budget" },
    { num: "02", text: "Curate matching projects & plots" },
    { num: "03", text: "Arrange site visits & due diligence" },
    { num: "04", text: "Support booking, financing & registration" },
    { num: "05", text: "Stay with you for post‑sales support" }
  ];

  return (
    <section className="px-[5%] md:px-[8%] py-10 md:py-16 bg-transparent">
      <div className="w-full max-w-[1100px] mx-auto bg-white rounded-3xl p-8 md:p-14 shadow-lg border border-slate-100 relative overflow-hidden">
        
        {/* Subtle background decoration */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-50 rounded-full blur-3xl pointer-events-none"></div>

        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-[var(--text-dark-strong)] relative z-10">
          How we work with you
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 relative z-10">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-5 group relative">
              
              {/* Desktop Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-[28px] left-[60px] w-[calc(100%-20px)] h-[2px] bg-slate-100 z-[-1]"></div>
              )}
              
              <div className="w-14 h-14 shrink-0 rounded-full bg-slate-50 border-2 border-slate-100 text-[var(--primary)] text-lg font-bold flex items-center justify-center group-hover:bg-[var(--primary)] group-hover:border-[var(--primary)] group-hover:text-white transition-all duration-300 shadow-sm">
                {step.num}
              </div>
              
              <p className="text-[0.95rem] md:text-[1rem] font-medium text-[var(--text-body)] md:pr-4 group-hover:text-[var(--text-dark-strong)] transition-colors">
                {step.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
