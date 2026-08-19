import React from 'react';

export function AboutIntro() {
  return (
    <section className="px-[5%] md:px-[8%] py-10 md:py-16 flex justify-center bg-transparent">
      <div className="w-full max-w-[1100px] text-[0.95rem] leading-relaxed text-[var(--text-body-muted)] flex flex-col gap-4 text-left bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-slate-100 relative z-10 mx-auto">
        <p>
          We direct our vision of <strong className="font-bold text-[var(--text-dark-strong)]">“Assuring hope for a better future”</strong>
          {' '}and believe that investing in NA land &amp; plots changes lives. Our
          focus at Bhoomi Plots and Land is to offer well-located communities,
          transparent processes and a clear strategy to create value for buyers
          and investors. With a strong team of self-driven professionals, we are
          grateful to our business associates and customers for their continuous
          trust in our services.
        </p>
        <p>
          Bhoomi Plots and Land comes with a vision to help people find their
          dream investment. Our highly experienced team is always curious and
          attentive in delivering a trustworthy experience to our clients across
          Maharashtra and India.
        </p>
      </div>
    </section>
  );
}
