import React, { useEffect, useState } from 'react';
import { Project } from './ProjectCard';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Collect all images (main image + gallery if exists)
  const allImages = [project.image];
  if (project.gallery && project.gallery.length > 0) {
    allImages.push(...project.gallery);
  }

  // Prevent scrolling on body when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 py-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[rgba(15,23,42,0.85)] backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Container - Shorter and tighter */}
      <div className="relative bg-white rounded-2xl md:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] w-full max-w-[900px] h-auto max-h-[85vh] overflow-hidden flex flex-col md:flex-row transform transition-all animate-in fade-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 z-50 w-8 h-8 bg-black/10 backdrop-blur-md md:bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-white hover:text-red-500 hover:shadow-md transition-all shadow-sm"
        >
          <i className="fas fa-times text-sm"></i>
        </button>

        {/* Left: Image Hero */}
        <div className="w-full md:w-[45%] h-[220px] md:h-auto min-h-[250px] relative shrink-0 bg-slate-900 group">
          <img 
            src={allImages[activeImageIndex]} 
            alt={project.title} 
            className="w-full h-full object-cover transition-opacity duration-300 absolute inset-0"
          />
          
          {/* Gallery Controls (if multiple images) */}
          {allImages.length > 1 && (
            <>
              <button 
                onClick={() => setActiveImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 hover:bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-20"
              >
                <i className="fas fa-chevron-left text-[0.8rem]"></i>
              </button>
              <button 
                onClick={() => setActiveImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 hover:bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-20"
              >
                <i className="fas fa-chevron-right text-[0.8rem]"></i>
              </button>

              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-20 px-4">
                {allImages.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-10 h-10 rounded-md overflow-hidden border-2 transition-all ${activeImageIndex === idx ? 'border-white shadow-[0_0_15px_rgba(0,0,0,0.6)] scale-110 z-10' : 'border-transparent opacity-50 hover:opacity-100 hover:scale-105'}`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none z-10"></div>
          
          <div className="absolute bottom-16 left-6 right-6 pointer-events-none z-20">
            <div className="flex gap-2 mb-1.5">
              {project.isFeatured && (
                <span className="bg-[var(--primary)] text-white text-[0.6rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-md">
                  Premium
                </span>
              )}
            </div>
            <h2 className="text-2xl font-extrabold text-white leading-tight shadow-sm line-clamp-2">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Right: Details Content (Scrollable if needed) */}
        <div className="w-full md:w-[55%] p-5 md:p-6 flex flex-col relative z-10 bg-white overflow-y-auto">
          
          {/* Header Row: Price & Location */}
          <div className="mb-4 pb-4 border-b border-slate-100 pt-1">
            <div className="text-[0.7rem] uppercase tracking-wider font-bold text-slate-400 mb-1">
              Starting Price
            </div>
            <div className="flex justify-between items-start">
              <div>
                <div className="text-3xl font-black text-[var(--primary)] leading-none mb-1.5">
                  {project.price}
                </div>
                <div className="text-[0.8rem] text-slate-500 flex items-center gap-1.5">
                  <i className="fas fa-map-marker-alt text-[var(--primary-soft)]"></i> 
                  {project.location}
                </div>
              </div>
              <div className="text-right shrink-0 mt-1">
                 <div className="bg-[var(--primary)]/10 text-[var(--primary)] text-[0.7rem] font-bold px-2.5 py-1 rounded-md inline-block">
                  {project.status}
                 </div>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="mb-4">
            <h4 className="text-[0.85rem] font-bold text-[var(--text-dark)] mb-1.5">Property Overview</h4>
            <p className="text-[0.85rem] text-[var(--text-body)] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Features */}
          {project.features && (
            <div className="mb-5">
              <h4 className="text-[0.85rem] font-bold text-[var(--text-dark)] mb-2">Key Details</h4>
              <div className="flex flex-wrap gap-1.5">
                {project.features.split('•').map((feature, i) => (
                  <span key={i} className="text-[0.8rem] font-semibold text-[var(--text-dark)] bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 flex items-center gap-1.5">
                    <i className="fas fa-check text-[var(--primary)] text-[0.65rem]"></i> {feature.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Developer & RERA */}
          <div className="mt-auto pt-3 grid grid-cols-2 gap-3 mb-5">
            <div>
              <div className="text-[0.65rem] uppercase font-bold text-slate-400 mb-0.5">Developer</div>
              <div className="text-[0.85rem] font-bold text-[var(--text-dark)] flex items-center gap-1">
                {project.developer}
                {project.developerVerified && <i className="fas fa-badge-check text-[var(--primary)] text-[0.7rem]"></i>}
              </div>
            </div>
            {project.reraNumber && (
              <div>
                <div className="text-[0.65rem] uppercase font-bold text-slate-400 mb-0.5">RERA Number</div>
                <div className="text-[0.8rem] font-semibold text-slate-700 flex items-center gap-1">
                  <i className="fas fa-file-shield text-emerald-500"></i> {project.reraNumber}
                </div>
              </div>
            )}
          </div>

          {/* Actions - Full width Enquire Now */}
          <div className="flex gap-3">
            <button className="flex-1 bg-[var(--primary)] text-white font-bold py-3 rounded-xl hover:bg-[var(--accent-strong)] transition-colors shadow-[0_4px_15px_rgba(197,138,35,0.3)] hover:shadow-[0_8px_20px_rgba(197,138,35,0.4)] text-[0.9rem]">
              Enquire Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
