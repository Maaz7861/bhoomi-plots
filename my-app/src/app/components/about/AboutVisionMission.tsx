import React from 'react';

export function AboutVisionMission() {
  return (
    <div className="flex flex-col gap-8 md:gap-16 py-12 md:py-20 bg-white/50">
      
      {/* Vision Section */}
      <section className="flex justify-center px-[5%] md:px-[8%]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-stretch w-full max-w-[1100px]">
          <div className="flex flex-col gap-4 order-2 md:order-1 bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-slate-100 h-full justify-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-1 text-[var(--text-dark-strong)]">
              Our Vision
            </h2>
            <p className="text-[0.95rem] leading-relaxed text-[var(--text-body-muted)]">
              Our vision is to be the preferred land banker by bringing risk-free
              investment options anywhere in India. We aim to become the first
              choice for transparent land and plot investments that are flexible,
              diverse and tailored to different budgets.
            </p>
            <p className="text-[0.95rem] leading-relaxed text-[var(--text-body-muted)]">
              We focus on offering hassle-free home and land buying solutions under
              one roof—making Bhoomi Group the most reliable and trusted
              name for plotted development and real estate advisory.
            </p>
          </div>
          <div className="order-1 md:order-2 h-full">
            <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.15)] h-[300px] md:h-full group border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1000&q=80"
                alt="Our Vision"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Subtle inner highlight frame */}
              <div className="absolute inset-[15px] border border-white/30 rounded-xl pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="flex justify-center px-[5%] md:px-[8%] mt-8 md:mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-stretch w-full max-w-[1100px]">
          <div className="order-1 md:order-1 h-full">
            <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.15)] h-[300px] md:h-full group border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80"
                alt="Our Mission"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Subtle inner highlight frame */}
              <div className="absolute inset-[15px] border border-white/30 rounded-xl pointer-events-none"></div>
            </div>
          </div>
          <div className="flex flex-col gap-4 order-2 md:order-2 bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-slate-100 h-full justify-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-1 text-[var(--text-dark-strong)]">
              Our Mission
            </h2>
            <p className="text-[0.95rem] leading-relaxed text-[var(--text-body-muted)]">
              At Bhoomi Group we dream to modernise the traditional
              experience of real estate. Our mission is to provide buyers and
              homeowners with investment options that
              <strong className="font-semibold text-[var(--text-dark-strong)]"> exceed expectations</strong>—backed by expert guidance and
              trustworthy services at every step.
            </p>
            <p className="text-[0.95rem] leading-relaxed text-[var(--text-body-muted)]">
              We embrace the values of integrity, innovation, transparency, customer
              centricity and humility. Our constant endeavour is to help people
              achieve their dreams by touching lives in true sense through
              well-planned investments in land and real estate.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
