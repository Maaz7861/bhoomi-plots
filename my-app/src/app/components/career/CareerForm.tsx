import React from 'react';

export function CareerForm() {
  return (
    <section id="careerForm" className="px-[5%] md:px-[8%] py-12 md:py-16 bg-slate-50 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#cfa861]/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
      
      <div className="max-w-[700px] mx-auto relative z-10 bg-white p-6 md:p-10 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
            Didn’t find a suitable role?
          </h2>
          <p className="text-base text-slate-500 font-medium max-w-[500px] mx-auto">
            Share your details and we’ll get in touch when a matching opportunity opens up.
          </p>
        </div>

        <form className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 ml-1">Full Name</label>
              <input 
                type="text" 
                placeholder="Enter your full name" 
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cfa861]/50 focus:border-[#cfa861] transition-all text-sm font-medium text-slate-700 placeholder:text-slate-400"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 ml-1">Email</label>
              <input 
                type="email" 
                placeholder="name@email.com" 
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cfa861]/50 focus:border-[#cfa861] transition-all text-sm font-medium text-slate-700 placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 ml-1">Mobile Number</label>
              <input 
                type="tel" 
                placeholder="+91-" 
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cfa861]/50 focus:border-[#cfa861] transition-all text-sm font-medium text-slate-700 placeholder:text-slate-400"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 ml-1">Preferred Location</label>
              <input 
                type="text" 
                placeholder="Pune / Nashik / Mumbai etc." 
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cfa861]/50 focus:border-[#cfa861] transition-all text-sm font-medium text-slate-700 placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 ml-1">Role you’re interested in</label>
            <input 
              type="text" 
              placeholder="Eg. Sales Executive, Marketing" 
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cfa861]/50 focus:border-[#cfa861] transition-all text-sm font-medium text-slate-700 placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 ml-1">Short profile / experience</label>
            <textarea 
              rows={4} 
              placeholder="Tell us briefly about your background" 
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cfa861]/50 focus:border-[#cfa861] transition-all text-sm font-medium text-slate-700 placeholder:text-slate-400 resize-none"
            ></textarea>
          </div>

          <button 
            type="button" 
            className="w-full py-3 bg-[#cfa861] hover:bg-amber-600 text-white rounded-lg font-bold text-base transition-colors duration-300 shadow-md shadow-[#cfa861]/30 hover:shadow-[#cfa861]/50 mt-4"
          >
            Submit Profile
          </button>
        </form>
      </div>
    </section>
  );
}
