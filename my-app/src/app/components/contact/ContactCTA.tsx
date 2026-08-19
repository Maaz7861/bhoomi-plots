import React from 'react';

export function ContactCTA() {
  return (
    <section className="px-[5%] md:px-[8%] py-16 bg-[var(--bg-light)]">
      <div className="max-w-5xl mx-auto bg-[var(--bg-darker)] rounded-3xl p-8 md:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[var(--primary)]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 md:w-2/3 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">Need help choosing the right project?</h2>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto md:mx-0">
            Share your requirements and our experts will suggest curated
            projects, plots and farm lands that match your budget.
          </p>
        </div>
        
        <div className="relative z-10">
          <button className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold py-3.5 px-8 rounded-lg transition-all shadow-lg hover:-translate-y-0.5 whitespace-nowrap flex items-center justify-center gap-2">
            <span>Talk to an Expert</span>
            <i className="fas fa-arrow-right text-sm"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
