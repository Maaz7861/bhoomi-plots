import React from 'react';

export function Testimonials() {
  return (
    <section className="testimonials-section relative overflow-hidden py-[clamp(48px,7vw,72px)] px-[5%] bg-[#0b1120]" aria-label="Testimonials">
      <div className="testimonials-bg absolute inset-0 pointer-events-none">
        <div className="testimonials-grid-overlay absolute inset-0 opacity-40" style={{ backgroundImage: 'linear-gradient(rgba(0, 194, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 194, 255, 0.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      </div>
      <h2 className="testimonials-title relative z-[1] text-center font-bold mb-2 text-[var(--text-inverted)]" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)' }}>Testimonials</h2>
      <p className="testimonials-subtitle relative z-[1] text-center text-[0.9rem] mb-10 text-[var(--text-muted-light)]">What our clients say about us</p>

      <div className="testimonials-carousel relative z-[1] flex items-center gap-4 max-w-[1100px] mx-auto max-[600px]:gap-2" aria-roledescription="carousel">
        <button type="button" className="testimonials-arrow testimonials-arrow-prev w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer bg-[rgba(255,255,255,0.08)] border border-[rgba(0,194,255,0.2)] text-[var(--text-muted-light)] transition-all duration-200 ease-out hover:bg-[rgba(0,194,255,0.2)] hover:text-[#fff]" aria-label="Previous testimonials">
          <i className="fas fa-chevron-left" aria-hidden="true"></i>
        </button>

        <div className="testimonials-viewport flex-1 overflow-hidden">
          <div className="testimonials-track flex gap-5 transition-transform duration-400 ease-out">
            {/* Video testimonials first */}
            <div className="testimonial-card flex-shrink-0 rounded-[18px] p-6 flex flex-col gap-4 bg-[rgba(255,255,255,0.06)] border border-[rgba(0,194,255,0.12)] backdrop-blur-[10px]" style={{ minWidth: 'min(320px, 80vw)' }} data-kind="video">
              <div className="testimonial-video-frame w-full rounded-[12px] overflow-hidden max-h-[360px]" style={{ aspectRatio: '9/16' }}>
                <video className="w-full h-full object-cover" preload="metadata" controls playsInline>
                  <source src="assets/videos/testimonial-video/02.MP4" type="video/mp4" />
                </video>
              </div>
              <div className="testimonial-author flex items-center gap-3">
                <div className="testimonial-avatar w-10 h-10 rounded-full flex items-center justify-center font-bold text-base flex-shrink-0 text-[#fff]" style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent-strong))' }}>P</div>
                <div>
                  <strong className="block text-[0.9rem] font-semibold text-[var(--text-inverted)]">Priya M.</strong>
                  <span className="text-[0.78rem] text-[var(--text-muted-light)]">Investor, Mumbai</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card flex-shrink-0 rounded-[18px] p-6 flex flex-col gap-4 bg-[rgba(255,255,255,0.06)] border border-[rgba(0,194,255,0.12)] backdrop-blur-[10px]" style={{ minWidth: 'min(320px, 80vw)' }} data-kind="video">
              <div className="testimonial-video-frame w-full rounded-[12px] overflow-hidden max-h-[360px]" style={{ aspectRatio: '9/16' }}>
                <video className="w-full h-full object-cover" preload="metadata" controls playsInline>
                  <source src="assets/videos/testimonial-video/01.MP4" type="video/mp4" />
                </video>
              </div>
              <div className="testimonial-author flex items-center gap-3">
                <div className="testimonial-avatar w-10 h-10 rounded-full flex items-center justify-center font-bold text-base flex-shrink-0 text-[#fff]" style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent-strong))' }}>A</div>
                <div>
                  <strong className="block text-[0.9rem] font-semibold text-[var(--text-inverted)]">Amit S.</strong>
                  <span className="text-[0.78rem] text-[var(--text-muted-light)]">Residential buyer, Baner</span>
                </div>
              </div>
            </div>

            {/* Text testimonials */}
            <div className="testimonial-card flex-shrink-0 rounded-[18px] p-6 flex flex-col gap-4 bg-[rgba(255,255,255,0.06)] border border-[rgba(0,194,255,0.12)] backdrop-blur-[10px]" style={{ minWidth: 'min(320px, 80vw)' }} data-kind="text">
              <div className="testimonial-quote-icon text-2xl text-[var(--accent-strong)]"><i className="fas fa-quote-left"></i></div>
              <p className="testimonial-text text-[0.9rem] leading-relaxed flex-1 text-[var(--text-muted-light)]">Bhoomi Plots helped us find the perfect plot for our dream home. Their team was transparent, professional and went the extra mile. Highly recommended.</p>
              <div className="testimonial-author flex items-center gap-3">
                <div className="testimonial-avatar w-10 h-10 rounded-full flex items-center justify-center font-bold text-base flex-shrink-0 text-[#fff]" style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent-strong))' }}>R</div>
                <div>
                  <strong className="block text-[0.9rem] font-semibold text-[var(--text-inverted)]">Rajesh K.</strong>
                  <span className="text-[0.78rem] text-[var(--text-muted-light)]">First-time buyer, Pune</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card flex-shrink-0 rounded-[18px] p-6 flex flex-col gap-4 bg-[rgba(255,255,255,0.06)] border border-[rgba(0,194,255,0.12)] backdrop-blur-[10px]" style={{ minWidth: 'min(320px, 80vw)' }} data-kind="text">
              <div className="testimonial-quote-icon text-2xl text-[var(--accent-strong)]"><i className="fas fa-quote-left"></i></div>
              <p className="testimonial-text text-[0.9rem] leading-relaxed flex-1 text-[var(--text-muted-light)]">We invested in two plots through Bhoomi and the entire process was smooth. Accurate guidance and best quality documentation. Trust them for land deals.</p>
              <div className="testimonial-author flex items-center gap-3">
                <div className="testimonial-avatar w-10 h-10 rounded-full flex items-center justify-center font-bold text-base flex-shrink-0 text-[#fff]" style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent-strong))' }}>P</div>
                <div>
                  <strong className="block text-[0.9rem] font-semibold text-[var(--text-inverted)]">Priya M.</strong>
                  <span className="text-[0.78rem] text-[var(--text-muted-light)]">Investor, Mumbai</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card flex-shrink-0 rounded-[18px] p-6 flex flex-col gap-4 bg-[rgba(255,255,255,0.06)] border border-[rgba(0,194,255,0.12)] backdrop-blur-[10px]" style={{ minWidth: 'min(320px, 80vw)' }} data-kind="text">
              <div className="testimonial-quote-icon text-2xl text-[var(--accent-strong)]"><i className="fas fa-quote-left"></i></div>
              <p className="testimonial-text text-[0.9rem] leading-relaxed flex-1 text-[var(--text-muted-light)]">From consultation to registration, Bhoomi Plots and Lands gave us better options and solutions. Our family is now in a RERA-approved project. Thank you!</p>
              <div className="testimonial-author flex items-center gap-3">
                <div className="testimonial-avatar w-10 h-10 rounded-full flex items-center justify-center font-bold text-base flex-shrink-0 text-[#fff]" style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent-strong))' }}>A</div>
                <div>
                  <strong className="block text-[0.9rem] font-semibold text-[var(--text-inverted)]">Amit S.</strong>
                  <span className="text-[0.78rem] text-[var(--text-muted-light)]">Residential buyer, Baner</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button type="button" className="testimonials-arrow testimonials-arrow-next w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer bg-[rgba(255,255,255,0.08)] border border-[rgba(0,194,255,0.2)] text-[var(--text-muted-light)] transition-all duration-200 ease-out hover:bg-[rgba(0,194,255,0.2)] hover:text-[#fff]" aria-label="Next testimonials">
          <i className="fas fa-chevron-right" aria-hidden="true"></i>
        </button>
      </div>
    </section>
  );
}
