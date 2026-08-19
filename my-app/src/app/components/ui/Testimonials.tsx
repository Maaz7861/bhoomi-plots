'use client';
import React, { useRef } from 'react';

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollPrev = () => {
    if (trackRef.current && trackRef.current.children.length > 0) {
      const cardWidth = trackRef.current.children[0].getBoundingClientRect().width;
      trackRef.current.scrollBy({ left: -(cardWidth + 24), behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (trackRef.current && trackRef.current.children.length > 0) {
      const cardWidth = trackRef.current.children[0].getBoundingClientRect().width;
      trackRef.current.scrollBy({ left: cardWidth + 24, behavior: 'smooth' });
    }
  };

  return (
    <section className="testimonials-section relative overflow-hidden py-[clamp(48px,7vw,72px)] px-[5%] bg-[#0b1120]" aria-label="Testimonials">
      <div className="testimonials-bg absolute inset-0 pointer-events-none">
        <div className="testimonials-grid-overlay absolute inset-0 opacity-40" style={{ backgroundImage: 'linear-gradient(rgba(0, 194, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 194, 255, 0.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      </div>
      <h2 className="testimonials-title relative z-[1] text-center font-bold mb-2 text-[var(--text-inverted)]" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)' }}>Testimonials</h2>
      <p className="testimonials-subtitle relative z-[1] text-center text-[0.9rem] mb-10 text-[var(--text-muted-light)]">What our clients say about us</p>

      <div className="testimonials-carousel relative z-[1] flex items-center gap-4 max-w-[1200px] mx-auto max-[600px]:gap-2" aria-roledescription="carousel">
        <button onClick={scrollPrev} type="button" className="testimonials-arrow testimonials-arrow-prev w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer bg-[rgba(255,255,255,0.08)] border border-[rgba(0,194,255,0.2)] text-[var(--text-muted-light)] transition-all duration-200 ease-out hover:bg-[rgba(0,194,255,0.2)] hover:text-[#fff] hover:scale-110" aria-label="Previous testimonials">
          <i className="fas fa-chevron-left" aria-hidden="true"></i>
        </button>

        <div className="testimonials-viewport flex-1 overflow-hidden">
          <div 
            ref={trackRef}
            className="testimonials-track flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar px-1 py-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* ORIGINAL VIDEO CARDS */}
            <div className="testimonial-card snap-start flex-shrink-0 w-[calc((100%-48px)/3)] max-[900px]:w-[calc((100%-24px)/2)] max-[600px]:w-full rounded-[24px] p-6 flex flex-col gap-5 bg-[rgba(15,23,42,0.6)] border border-[rgba(0,194,255,0.15)] backdrop-blur-[12px] hover:-translate-y-2 hover:border-[rgba(0,194,255,0.4)] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,194,255,0.1)]" data-kind="video">
              <div className="testimonial-video-frame w-full rounded-[16px] overflow-hidden aspect-video bg-black/50 shadow-inner relative group">
                <video className="w-full h-full object-cover" preload="metadata" controls playsInline>
                  <source src="assets/videos/testimonial-video/02.MP4" type="video/mp4" />
                </video>
              </div>
              <div className="testimonial-author flex items-center gap-4 mt-auto pt-2 border-t border-[rgba(255,255,255,0.05)]">
                <div className="testimonial-avatar w-12 h-12 rounded-full flex items-center justify-center font-bold text-[1.1rem] flex-shrink-0 text-[#fff] shadow-lg" style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent-strong))' }}>P</div>
                <div>
                  <strong className="block text-[0.95rem] font-bold text-[var(--text-inverted)]">Priya M.</strong>
                  <span className="text-[0.8rem] text-[var(--accent-cyan)] font-medium">Investor, Mumbai</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card snap-start flex-shrink-0 w-[calc((100%-48px)/3)] max-[900px]:w-[calc((100%-24px)/2)] max-[600px]:w-full rounded-[24px] p-6 flex flex-col gap-5 bg-[rgba(15,23,42,0.6)] border border-[rgba(0,194,255,0.15)] backdrop-blur-[12px] hover:-translate-y-2 hover:border-[rgba(0,194,255,0.4)] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,194,255,0.1)]" data-kind="video">
              <div className="testimonial-video-frame w-full rounded-[16px] overflow-hidden aspect-video bg-black/50 shadow-inner relative group">
                <video className="w-full h-full object-cover" preload="metadata" controls playsInline>
                  <source src="assets/videos/testimonial-video/01.MP4" type="video/mp4" />
                </video>
              </div>
              <div className="testimonial-author flex items-center gap-4 mt-auto pt-2 border-t border-[rgba(255,255,255,0.05)]">
                <div className="testimonial-avatar w-12 h-12 rounded-full flex items-center justify-center font-bold text-[1.1rem] flex-shrink-0 text-[#fff] shadow-lg" style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent-strong))' }}>A</div>
                <div>
                  <strong className="block text-[0.95rem] font-bold text-[var(--text-inverted)]">Amit S.</strong>
                  <span className="text-[0.8rem] text-[var(--accent-cyan)] font-medium">Residential buyer, Baner</span>
                </div>
              </div>
            </div>

            {/* ORIGINAL TEXT CARDS */}
            <div className="testimonial-card snap-start flex-shrink-0 w-[calc((100%-48px)/3)] max-[900px]:w-[calc((100%-24px)/2)] max-[600px]:w-full rounded-[24px] p-6 flex flex-col gap-5 bg-[rgba(15,23,42,0.6)] border border-[rgba(0,194,255,0.15)] backdrop-blur-[12px] hover:-translate-y-2 hover:border-[rgba(0,194,255,0.4)] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,194,255,0.1)]" data-kind="text">
              <div className="testimonial-quote-icon text-3xl text-[var(--accent-strong)] opacity-80 mb-2"><i className="fas fa-quote-left"></i></div>
              <p className="testimonial-text text-[0.95rem] leading-relaxed flex-1 text-[var(--text-soft)] italic">"Bhoomi Plots helped us find the perfect plot for our dream home. Their team was transparent, professional and went the extra mile. Highly recommended."</p>
              <div className="testimonial-author flex items-center gap-4 mt-auto pt-4 border-t border-[rgba(255,255,255,0.05)]">
                <div className="testimonial-avatar w-12 h-12 rounded-full flex items-center justify-center font-bold text-[1.1rem] flex-shrink-0 text-[#fff] shadow-lg" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>R</div>
                <div>
                  <strong className="block text-[0.95rem] font-bold text-[var(--text-inverted)]">Rajesh K.</strong>
                  <span className="text-[0.8rem] text-[var(--text-muted-light)]">First-time buyer, Pune</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card snap-start flex-shrink-0 w-[calc((100%-48px)/3)] max-[900px]:w-[calc((100%-24px)/2)] max-[600px]:w-full rounded-[24px] p-6 flex flex-col gap-5 bg-[rgba(15,23,42,0.6)] border border-[rgba(0,194,255,0.15)] backdrop-blur-[12px] hover:-translate-y-2 hover:border-[rgba(0,194,255,0.4)] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,194,255,0.1)]" data-kind="text">
              <div className="testimonial-quote-icon text-3xl text-[var(--accent-strong)] opacity-80 mb-2"><i className="fas fa-quote-left"></i></div>
              <p className="testimonial-text text-[0.95rem] leading-relaxed flex-1 text-[var(--text-soft)] italic">"We invested in two plots through Bhoomi and the entire process was smooth. Accurate guidance and best quality documentation. Trust them for land deals."</p>
              <div className="testimonial-author flex items-center gap-4 mt-auto pt-4 border-t border-[rgba(255,255,255,0.05)]">
                <div className="testimonial-avatar w-12 h-12 rounded-full flex items-center justify-center font-bold text-[1.1rem] flex-shrink-0 text-[#fff] shadow-lg" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' }}>S</div>
                <div>
                  <strong className="block text-[0.95rem] font-bold text-[var(--text-inverted)]">Sneha T.</strong>
                  <span className="text-[0.8rem] text-[var(--text-muted-light)]">Investor, Nashik</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card snap-start flex-shrink-0 w-[calc((100%-48px)/3)] max-[900px]:w-[calc((100%-24px)/2)] max-[600px]:w-full rounded-[24px] p-6 flex flex-col gap-5 bg-[rgba(15,23,42,0.6)] border border-[rgba(0,194,255,0.15)] backdrop-blur-[12px] hover:-translate-y-2 hover:border-[rgba(0,194,255,0.4)] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,194,255,0.1)]" data-kind="text">
              <div className="testimonial-quote-icon text-3xl text-[var(--accent-strong)] opacity-80 mb-2"><i className="fas fa-quote-left"></i></div>
              <p className="testimonial-text text-[0.95rem] leading-relaxed flex-1 text-[var(--text-soft)] italic">"From consultation to registration, Bhoomi Plots and Lands gave us better options and solutions. Our family is now in a RERA-approved project. Thank you!"</p>
              <div className="testimonial-author flex items-center gap-4 mt-auto pt-4 border-t border-[rgba(255,255,255,0.05)]">
                <div className="testimonial-avatar w-12 h-12 rounded-full flex items-center justify-center font-bold text-[1.1rem] flex-shrink-0 text-[#fff] shadow-lg" style={{ background: 'linear-gradient(135deg, #ef4444, #b91c1c)' }}>V</div>
                <div>
                  <strong className="block text-[0.95rem] font-bold text-[var(--text-inverted)]">Vikram D.</strong>
                  <span className="text-[0.8rem] text-[var(--text-muted-light)]">Business Owner, Mumbai</span>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card snap-start flex-shrink-0 w-[calc((100%-48px)/3)] max-[900px]:w-[calc((100%-24px)/2)] max-[600px]:w-full rounded-[24px] p-6 flex flex-col gap-5 bg-[rgba(15,23,42,0.6)] border border-[rgba(0,194,255,0.15)] backdrop-blur-[12px] hover:-translate-y-2 hover:border-[rgba(0,194,255,0.4)] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,194,255,0.1)]" data-kind="text">
              <div className="testimonial-quote-icon text-3xl text-[var(--accent-strong)] opacity-80 mb-2"><i className="fas fa-quote-left"></i></div>
              <p className="testimonial-text text-[0.95rem] leading-relaxed flex-1 text-[var(--text-soft)] italic">"The transparency and honesty of the Bhoomi team is unmatched. I got clear titles and proper guidance at every step. Truly the best real estate partner."</p>
              <div className="testimonial-author flex items-center gap-4 mt-auto pt-4 border-t border-[rgba(255,255,255,0.05)]">
                <div className="testimonial-avatar w-12 h-12 rounded-full flex items-center justify-center font-bold text-[1.1rem] flex-shrink-0 text-[#fff] shadow-lg" style={{ background: 'linear-gradient(135deg, #0ea5e9, #0369a1)' }}>M</div>
                <div>
                  <strong className="block text-[0.95rem] font-bold text-[var(--text-inverted)]">Mahesh J.</strong>
                  <span className="text-[0.8rem] text-[var(--text-muted-light)]">IT Professional, Pune</span>
                </div>
              </div>
            </div>

            {/* NEW ADDED CARDS IN ORIGINAL FORMAT */}
            <div className="testimonial-card snap-start flex-shrink-0 w-[calc((100%-48px)/3)] max-[900px]:w-[calc((100%-24px)/2)] max-[600px]:w-full rounded-[24px] p-6 flex flex-col gap-5 bg-[rgba(15,23,42,0.6)] border border-[rgba(0,194,255,0.15)] backdrop-blur-[12px] hover:-translate-y-2 hover:border-[rgba(0,194,255,0.4)] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,194,255,0.1)]" data-kind="text">
              <div className="testimonial-quote-icon text-3xl text-[var(--accent-strong)] opacity-80 mb-2"><i className="fas fa-quote-left"></i></div>
              <p className="testimonial-text text-[0.95rem] leading-relaxed flex-1 text-[var(--text-soft)] italic">"Bhoomi Plots helped us find the perfect plot for our dream home. Their team was transparent, professional and went the extra mile. Highly recommended."</p>
              <div className="testimonial-author flex items-center gap-4 mt-auto pt-4 border-t border-[rgba(255,255,255,0.05)]">
                <div className="testimonial-avatar w-12 h-12 rounded-full flex items-center justify-center font-bold text-[1.1rem] flex-shrink-0 text-[#fff] shadow-lg" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>R</div>
                <div>
                  <strong className="block text-[0.95rem] font-bold text-[var(--text-inverted)]">Rajesh K.</strong>
                  <span className="text-[0.8rem] text-[var(--text-muted-light)]">First-time buyer, Pune</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card snap-start flex-shrink-0 w-[calc((100%-48px)/3)] max-[900px]:w-[calc((100%-24px)/2)] max-[600px]:w-full rounded-[24px] p-6 flex flex-col gap-5 bg-[rgba(15,23,42,0.6)] border border-[rgba(0,194,255,0.15)] backdrop-blur-[12px] hover:-translate-y-2 hover:border-[rgba(0,194,255,0.4)] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,194,255,0.1)]" data-kind="text">
              <div className="testimonial-quote-icon text-3xl text-[var(--accent-strong)] opacity-80 mb-2"><i className="fas fa-quote-left"></i></div>
              <p className="testimonial-text text-[0.95rem] leading-relaxed flex-1 text-[var(--text-soft)] italic">"We invested in two plots through Bhoomi and the entire process was smooth. Accurate guidance and best quality documentation. Trust them for land deals."</p>
              <div className="testimonial-author flex items-center gap-4 mt-auto pt-4 border-t border-[rgba(255,255,255,0.05)]">
                <div className="testimonial-avatar w-12 h-12 rounded-full flex items-center justify-center font-bold text-[1.1rem] flex-shrink-0 text-[#fff] shadow-lg" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>P</div>
                <div>
                  <strong className="block text-[0.95rem] font-bold text-[var(--text-inverted)]">Priya M.</strong>
                  <span className="text-[0.8rem] text-[var(--text-muted-light)]">Investor, Mumbai</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card snap-start flex-shrink-0 w-[calc((100%-48px)/3)] max-[900px]:w-[calc((100%-24px)/2)] max-[600px]:w-full rounded-[24px] p-6 flex flex-col gap-5 bg-[rgba(15,23,42,0.6)] border border-[rgba(0,194,255,0.15)] backdrop-blur-[12px] hover:-translate-y-2 hover:border-[rgba(0,194,255,0.4)] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,194,255,0.1)]" data-kind="text">
              <div className="testimonial-quote-icon text-3xl text-[var(--accent-strong)] opacity-80 mb-2"><i className="fas fa-quote-left"></i></div>
              <p className="testimonial-text text-[0.95rem] leading-relaxed flex-1 text-[var(--text-soft)] italic">"From consultation to registration, Bhoomi Plots and Lands gave us better options and solutions. Our family is now in a RERA-approved project. Thank you!"</p>
              <div className="testimonial-author flex items-center gap-4 mt-auto pt-4 border-t border-[rgba(255,255,255,0.05)]">
                <div className="testimonial-avatar w-12 h-12 rounded-full flex items-center justify-center font-bold text-[1.1rem] flex-shrink-0 text-[#fff] shadow-lg" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' }}>A</div>
                <div>
                  <strong className="block text-[0.95rem] font-bold text-[var(--text-inverted)]">Amit S.</strong>
                  <span className="text-[0.8rem] text-[var(--text-muted-light)]">Residential buyer, Baner</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <button onClick={scrollNext} type="button" className="testimonials-arrow testimonials-arrow-next w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer bg-[rgba(255,255,255,0.08)] border border-[rgba(0,194,255,0.2)] text-[var(--text-muted-light)] transition-all duration-200 ease-out hover:bg-[rgba(0,194,255,0.2)] hover:text-[#fff] hover:scale-110" aria-label="Next testimonials">
          <i className="fas fa-chevron-right" aria-hidden="true"></i>
        </button>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
}
