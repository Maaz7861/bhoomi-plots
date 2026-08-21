import React from 'react';

export function WhyChooseUs() {
  return (
    <section className="why-choose-section py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--bg-light)]">
      <h2 className="text-center font-extrabold mb-8 md:mb-12 text-[#0f172a] text-2xl md:text-3xl lg:text-[2rem]">
        Why Choose Us?
      </h2>
      <div className="grid gap-6 lg:gap-10 grid-cols-1 lg:grid-cols-2 max-w-[1100px] mx-auto items-stretch">
        
        {/* Left Card: Dark with building background */}
        <div className="relative rounded-[20px] overflow-hidden flex flex-col text-white p-6 md:p-10 shadow-xl">
          {/* Background Image and Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop")' }}
          ></div>
          <div className="absolute inset-0 bg-black/90"></div> {/* Dark overlay */}

          <div className="relative z-10 flex flex-col h-full">
            <span className="uppercase text-[0.65rem] md:text-[0.7rem] tracking-[0.2em] font-bold mb-3 text-[#f5b041]">
              Sustainability
            </span>
            <h3 className="font-bold leading-tight mb-4 text-xl md:text-2xl lg:text-[1.6rem]">
              Helping People To Find Right Property
            </h3>
            <p className="text-[0.85rem] md:text-[0.9rem] leading-relaxed mb-8 text-slate-300">
              Your satisfaction is our top priority. We offer personalized services, from one-on-one
              consultations to tailored solutions that fit your specific needs. We're with you every
              step of the way, ensuring that your experience with us is seamless and fulfilling, even
              long after you've found the perfect property.
            </p>
            <a 
              href="/contact" 
              className="inline-block self-start px-6 py-2.5 rounded-[10px] font-bold text-[0.85rem] mt-auto bg-[#f5b041] text-[#0f172a] transition-all duration-300 hover:-translate-y-1 hover:bg-[#e6a338] hover:shadow-lg"
            >
              Get Enquiry
            </a>
          </div>
        </div>

        {/* Right Card: Light theme with best practices list */}
        <div className="rounded-[20px] flex flex-col bg-white/60 backdrop-blur-sm border border-black/5 p-6 md:p-10 shadow-sm">
          <h3 className="font-bold leading-tight mb-3 text-[#0f172a] text-xl md:text-[1.5rem]">
            We Follow Best Practices.
          </h3>
          <p className="text-[0.85rem] md:text-[0.9rem] leading-relaxed mb-6 text-slate-500">
            At Bhoomi Group, we're committed to turning your real estate dreams into
            reality. Here's why we're the trusted choice for discerning buyers and investors.
          </p>
          
          <ul className="list-none p-0 flex flex-col gap-4">
            <li className="flex items-center gap-4 text-[0.85rem] md:text-[0.9rem] text-[#0f172a] font-medium">
              <span className="w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0 bg-[#cffafe] text-[#0891b2]">
                <i className="fas fa-search text-[0.75rem]" aria-hidden="true"></i>
              </span>
              <span>Transparency &amp; Satisfying Deals</span>
            </li>
            <li className="flex items-center gap-4 text-[0.85rem] md:text-[0.9rem] text-[#0f172a] font-medium">
              <span className="w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0 bg-[#cffafe] text-[#0891b2]">
                <i className="fas fa-clipboard-list text-[0.75rem]" aria-hidden="true"></i>
              </span>
              <span>Accurate Guidance To Clients</span>
            </li>
            <li className="flex items-center gap-4 text-[0.85rem] md:text-[0.9rem] text-[#0f172a] font-medium">
              <span className="w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0 bg-[#cffafe] text-[#0891b2]">
                <i className="fas fa-award text-[0.75rem]" aria-hidden="true"></i>
              </span>
              <span>Provides Best Quality</span>
            </li>
            <li className="flex items-center gap-4 text-[0.85rem] md:text-[0.9rem] text-[#0f172a] font-medium">
              <span className="w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0 bg-[#cffafe] text-[#0891b2]">
                <i className="fas fa-lightbulb text-[0.75rem]" aria-hidden="true"></i>
              </span>
              <span>Better Options &amp; Solutions</span>
            </li>
          </ul>
        </div>
        
      </div>
    </section>
  );
}
