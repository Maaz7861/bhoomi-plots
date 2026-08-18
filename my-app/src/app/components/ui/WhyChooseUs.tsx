import React from 'react';

export function WhyChooseUs() {
  return (
    <section className="why-choose-section py-[clamp(40px,6vw,64px)] px-[5%] bg-[var(--bg-light)]">
      <h2 className="why-choose-title text-center font-bold mb-8 text-[var(--text-dark-strong)]" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)' }}>Why Choose Us?</h2>
      <div className="why-choose-inner grid gap-6 grid-cols-2 max-w-[1100px] mx-auto max-[900px]:grid-cols-1">
        <div className="why-choose-card why-choose-left rounded-[20px] flex flex-col text-[#fff]" style={{ padding: 'clamp(24px, 3vw, 38px)', background: 'linear-gradient(135deg, #c58a23 0%, #a66e15 100%)' }}>
          <span className="why-choose-kicker uppercase text-[0.72rem] tracking-[0.14em] font-semibold mb-3 text-[rgba(255,255,255,0.75)]">Sustainability</span>
          <h3 className="why-choose-heading font-bold leading-tight mb-4" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.65rem)' }}>Helping People To Find Right Property</h3>
          <p className="why-choose-text text-[0.9rem] leading-relaxed mb-5 text-[rgba(255,255,255,0.82)]">
            Your satisfaction is our top priority. We offer personalized services, from one-on-one
            consultations to tailored solutions that fit your specific needs. We&apos;re with you every
            step of the way, ensuring that your experience with us is seamless and fulfilling, even
            long after you&apos;ve found the perfect property.
          </p>
          <a href="/contact" className="why-choose-btn inline-block self-start px-6 py-3 rounded-[10px] font-semibold text-[0.9rem] mt-auto bg-[rgba(255,255,255,0.18)] text-[#fff] border border-[rgba(255,255,255,0.35)] transition-all duration-250 ease-out hover:-translate-y-[2px] hover:bg-[rgba(255,255,255,0.28)]">Get Enquiry</a>
        </div>
        <div className="why-choose-card why-choose-right rounded-[20px] flex flex-col bg-[var(--bg-dark)] text-[var(--text-soft)]" style={{ padding: 'clamp(24px, 3vw, 38px)' }}>
          <h3 className="why-choose-heading why-choose-heading-dark font-bold leading-tight mb-4 text-[var(--accent-strong)]" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.65rem)' }}>We Follow Best Practices.</h3>
          <p className="why-choose-text why-choose-text-dark text-[0.9rem] leading-relaxed mb-5 text-[var(--text-muted-light)]">
            At Bhoomi Plots and Lands, we&apos;re committed to turning your real estate dreams into
            reality. Here&apos;s why we&apos;re the trusted choice for discerning buyers and investors.
          </p>
          <ul className="why-choose-list list-none p-0 flex flex-col gap-3 mb-6">
            <li className="flex items-center gap-3 text-[0.9rem] text-[var(--text-muted-light)]">
              <i className="fas fa-search text-base w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-[rgba(245,197,75,0.15)] text-[var(--accent-strong)]" aria-hidden="true"></i>
              <span>Transparency &amp; Satisfying Deals</span>
            </li>
            <li className="flex items-center gap-3 text-[0.9rem] text-[var(--text-muted-light)]">
              <i className="fas fa-clipboard-list text-base w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-[rgba(245,197,75,0.15)] text-[var(--accent-strong)]" aria-hidden="true"></i>
              <span>Accurate Guidance To Clients</span>
            </li>
            <li className="flex items-center gap-3 text-[0.9rem] text-[var(--text-muted-light)]">
              <i className="fas fa-award text-base w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-[rgba(245,197,75,0.15)] text-[var(--accent-strong)]" aria-hidden="true"></i>
              <span>Provides Best Quality</span>
            </li>
            <li className="flex items-center gap-3 text-[0.9rem] text-[var(--text-muted-light)]">
              <i className="fas fa-lightbulb text-base w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-[rgba(245,197,75,0.15)] text-[var(--accent-strong)]" aria-hidden="true"></i>
              <span>Better Options &amp; Solutions</span>
            </li>
          </ul>
          <div className="why-choose-actions flex gap-3 mt-auto">
            <a href="tel:+917083909008" className="why-choose-fab w-11 h-11 rounded-full flex items-center justify-center text-base bg-[rgba(245,197,75,0.18)] text-[var(--accent-strong)] border border-[rgba(245,197,75,0.3)] transition-all duration-200 hover:-translate-y-[2px] hover:bg-[var(--accent-strong)] hover:text-[var(--bg-dark)]" aria-label="Call">
              <i className="fas fa-phone"></i>
            </a>
            <a href="#" className="why-choose-fab why-choose-fab-up w-11 h-11 rounded-full flex items-center justify-center text-base bg-[rgba(255,255,255,0.08)] text-[var(--text-muted-light)] border border-[rgba(255,255,255,0.15)] transition-all duration-200 hover:-translate-y-[2px] hover:bg-[var(--accent-strong)] hover:text-[var(--bg-dark)]" aria-label="Back to top">
              <i className="fas fa-arrow-up"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
