import React from 'react';

export function Testimonials() {
  return (
    <>
{/*  Testimonials  */}
    <section className="testimonials-section" aria-label="Testimonials">
      <div className="testimonials-bg">
        <div className="testimonials-grid-overlay"></div>
      </div>
      <h2 className="testimonials-title">Testimonials</h2>
      <p className="testimonials-subtitle">What our clients say about us</p>

      <div className="testimonials-carousel" aria-roledescription="carousel">
        <button type="button" className="testimonials-arrow testimonials-arrow-prev" aria-label="Previous testimonials">
          <i className="fas fa-chevron-left" aria-hidden="true"></i>
        </button>

        <div className="testimonials-viewport">
          <div className="testimonials-track">
            {/*  Video testimonials first  */}
            <div className="testimonial-card" data-kind="video">
              <div className="testimonial-video-frame">
                <video preload="metadata" controls playsInline>
                  <source src="/assets/videos/testimonial-video/02.MP4" type="video/mp4" />
                </video>
              </div>
              <div className="testimonial-author">
                <div className="testimonial-avatar">P</div>
                <div>
                  <strong>Priya M.</strong>
                  <span>Investor, Mumbai</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card" data-kind="video">
              <div className="testimonial-video-frame">
                <video preload="metadata" controls playsInline>
                  <source src="/assets/videos/testimonial-video/01.MP4" type="video/mp4" />
                </video>
              </div>
              <div className="testimonial-author">
                <div className="testimonial-avatar">A</div>
                <div>
                  <strong>Amit S.</strong>
                  <span>Residential buyer, Baner</span>
                </div>
              </div>
            </div>

            {/*  Then text testimonials  */}
            <div className="testimonial-card" data-kind="text">
              <div className="testimonial-quote-icon"><i className="fas fa-quote-left"></i></div>
              <p className="testimonial-text">Bhoomi Plots helped us find the perfect plot for our dream home. Their team was transparent, professional and went the extra mile. Highly recommended.</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">R</div>
                <div>
                  <strong>Rajesh K.</strong>
                  <span>First-time buyer, Pune</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card" data-kind="text">
              <div className="testimonial-quote-icon"><i className="fas fa-quote-left"></i></div>
              <p className="testimonial-text">We invested in two plots through Bhoomi and the entire process was smooth. Accurate guidance and best quality documentation. Trust them for land deals.</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">P</div>
                <div>
                  <strong>Priya M.</strong>
                  <span>Investor, Mumbai</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card" data-kind="text">
              <div className="testimonial-quote-icon"><i className="fas fa-quote-left"></i></div>
              <p className="testimonial-text">From consultation to registration, Bhoomi Plots and Lands gave us better options and solutions. Our family is now in a RERA-approved project. Thank you!</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">A</div>
                <div>
                  <strong>Amit S.</strong>
                  <span>Residential buyer, Baner</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button type="button" className="testimonials-arrow testimonials-arrow-next" aria-label="Next testimonials">
          <i className="fas fa-chevron-right" aria-hidden="true"></i>
        </button>
      </div>
    </section>
    </>
  );
}
