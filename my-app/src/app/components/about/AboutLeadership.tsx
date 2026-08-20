"use client";
import React, { useState } from 'react';

const leaders = [
  {
    id: 'jagdish',
    name: 'Mr. Jagdish Thakur',
    role: 'Founder & MD',
    image: '/assets/images/jagdish-thakur.jpg',
    imageStyle: { objectPosition: 'center top' },
    description: (
      <>
        <p className="mb-4">
          <strong>Mr. Jagdish Thakur</strong> is a young entrepreneur who entered the Real Estate industry in 2009. A qualified MBA in Agriculture, he brings <strong>over 14 years of robust experience</strong> to the table. His core strengths lie in Organizational Management, Best Investment Solutions, Legal Affairs, Liasoning, Sales, Marketing, and CRM.
        </p>
        <p className="mb-4">
          He began his career with renowned groups in Pune, including Paranjape Schemes (Construction) Ltd in 2009 and the Lodha Group in 2013, where he gained expertise in the luxurious and high-end segment, driving sales for iconic projects like Trump Tower and Lodha World Tower in Mumbai. In 2018, he joined Karda Construction, notably introducing India's First Investment Mela in the real estate sector.
        </p>
        <p>
          In 2021, he established his own company, <strong>Bhoomi Group</strong>. Starting with just 3 partners, he has grown the company to an employee strength of over 135 skilled professionals. Under his leadership, the company has successfully delivered 4 projects, launched 50-60 projects, and is currently developing 22 Residential &amp; Commercial projects in Nashik. Impressively, in the past 2 quarters alone, the company has successfully delivered 1,200 homes and 5 layouts to customers, backed by expert construction consultancy and cash flow management.
        </p>
      </>
    )
  },
  {
    id: 'anand',
    name: 'Mr. Anand More',
    role: 'Founder & CEO',
    image: '/assets/images/anand-more.png',
    imageStyle: { 
      objectPosition: 'left top', 
      transform: 'scale(1.1) translate(-2%, 18%)' 
    },
    description: (
      <>
        <p className="mb-4">
          <strong>Mr. Anand More</strong> is an MBA Marketing Specialist and commercial artist. He possesses special skills in branding, designing, and brand development.
        </p>
        <p className="mb-4">
          With <strong>15 years of rich experience</strong> spanning the FMCG and Real Estate sectors, he brings a unique blend of marketing and communications expertise tailored for high-growth companies.
        </p>
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-sm mt-2">
          <p className="font-bold text-[var(--primary)] mb-3">Core Expertise</p>
          <ul className="flex flex-col gap-2 text-[0.9rem] text-slate-600">
            <li className="flex gap-2"><i className="fas fa-check text-[var(--primary-soft)] mt-1"></i> Astute strategic planning and program management</li>
            <li className="flex gap-2"><i className="fas fa-check text-[var(--primary-soft)] mt-1"></i> End-to-end campaign management</li>
            <li className="flex gap-2"><i className="fas fa-check text-[var(--primary-soft)] mt-1"></i> Marketing Leadership & Strategic Business Planning</li>
            <li className="flex gap-2"><i className="fas fa-check text-[var(--primary-soft)] mt-1"></i> Comprehensive Brand Development</li>
          </ul>
        </div>
      </>
    )
  },
  {
    id: 'rohit',
    name: 'Mr. Rohit Kulkarni',
    role: 'Working Director',
    image: '/assets/images/rohit-kulkarni.jpg',
    imageStyle: { objectPosition: 'center top' },
    description: (
      <>
        <p className="mb-4">
          <strong>Mr. Rohit Kulkarni</strong> is a graduate in P.G.D.B.M in Marketing Management and holds a B.Com in Banking and Finance (2004) from Pune University.
        </p>
        <p className="mb-4">
          A versatile managerial talent, he has established a successful career promoting real estate sales for <strong>over 14 years</strong> with renowned establishments, accumulating a total work experience of over 21 years in diverse roles. He has consistently delivered superior year-on-year performance as a Sales, Marketing, and Business Development Professional.
        </p>
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-sm mt-2">
          <p className="font-bold text-[var(--primary)] mb-3">Key Strengths & Areas of Impact</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[0.9rem] text-slate-600">
            <ul className="flex flex-col gap-2">
              <li className="flex gap-2"><i className="fas fa-check text-[var(--primary-soft)] mt-1"></i> Strategy, Execution & Leadership</li>
              <li className="flex gap-2"><i className="fas fa-check text-[var(--primary-soft)] mt-1"></i> Client Relationship Management</li>
              <li className="flex gap-2"><i className="fas fa-check text-[var(--primary-soft)] mt-1"></i> Channel & Dealer Management</li>
            </ul>
            <ul className="flex flex-col gap-2">
              <li className="flex gap-2"><i className="fas fa-check text-[var(--primary-soft)] mt-1"></i> Team Management & Administration</li>
              <li className="flex gap-2"><i className="fas fa-check text-[var(--primary-soft)] mt-1"></i> Market Research & Penetration</li>
              <li className="flex gap-2"><i className="fas fa-check text-[var(--primary-soft)] mt-1"></i> Sales Forecasting & MIS Reporting</li>
            </ul>
          </div>
        </div>
      </>
    )
  }
];

export function AboutLeadership() {
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const toggleCard = (id: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="px-[5%] md:px-[8%] py-16 md:py-24 bg-transparent relative">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-dark-strong)] mb-4 tracking-tight uppercase tracking-[0.2em] text-[#cfa861]">
            Directors
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent-strong)] mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col gap-12 md:gap-16 w-full">
          {leaders.map((leader, index) => {
            const isExpanded = expandedCards[leader.id];
            
            return (
              <div 
                key={leader.id}
                className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12 items-start bg-white rounded-3xl p-6 md:p-10 pb-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] relative`}
              >
                
                {/* Image Container */}
                <div className="w-full md:w-[35%] shrink-0 flex flex-col items-center md:items-start max-[900px]:text-center">
                  {leader.image ? (
                    <div className="w-full aspect-[4/5] max-w-[320px] rounded-[1.5rem] mb-6 md:mb-8 relative overflow-hidden bg-gradient-to-b from-slate-200 to-slate-300 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] group border-[4px] border-white flex justify-center items-center">
                      <img 
                        src={leader.image} 
                        alt={leader.name} 
                        style={leader.imageStyle}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.02)] pointer-events-none"></div>
                    </div>
                  ) : (
                    <div className="w-full aspect-[4/5] max-w-[320px] rounded-[1.5rem] bg-slate-50 flex flex-col items-center justify-center text-slate-300 border-2 border-dashed border-slate-200 mb-6 md:mb-8 overflow-hidden">
                      <i className="fas fa-image text-4xl mb-3"></i>
                      <span className="text-sm font-medium">Image Placeholder</span>
                    </div>
                  )}
                  
                  <div className="flex flex-col items-center md:items-start w-full">
                    <h3 className="text-2xl md:text-3xl font-bold text-[var(--primary)] mb-1.5 text-center md:text-left">
                      {leader.name}
                    </h3>
                    <p className="text-[1.05rem] font-medium text-slate-500 text-center md:text-left">
                      {leader.role}
                    </p>
                  </div>
                </div>

                {/* Text Description Content */}
                <div 
                  className={`w-full md:w-[65%] text-[0.95rem] md:text-[1rem] leading-relaxed text-[var(--text-body-muted)] flex flex-col text-justify max-[900px]:text-left md:pt-4 transition-all duration-500 ease-in-out ${
                    isExpanded 
                      ? 'max-[900px]:max-h-[1500px] max-[900px]:opacity-100 max-[900px]:pt-6 max-[900px]:pb-2' 
                      : 'max-[900px]:max-h-0 max-[900px]:opacity-0 max-[900px]:overflow-hidden'
                  }`}
                >
                  {leader.description}
                </div>

                {/* Mobile Read More Toggle Button */}
                <button 
                  onClick={() => toggleCard(leader.id)}
                  className="hidden max-[900px]:inline-flex absolute bottom-4 right-6 text-[var(--primary)] font-bold text-[0.9rem] items-center gap-1.5"
                >
                  {isExpanded ? (
                    <>Show Less <i className="fas fa-chevron-up text-[0.7rem] pt-[1px]"></i></>
                  ) : (
                    <>Read More <i className="fas fa-chevron-down text-[0.7rem] pt-[1px]"></i></>
                  )}
                </button>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
