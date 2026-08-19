import React from 'react';

export interface Project {
  id: string;
  image: string;
  gallery?: string[];
  title: string;
  price: string;
  subPrice?: string;
  features?: string;
  description: string;
  location: string;
  developer: string;
  developerVerified?: boolean;
  status: string;
  reraNumber?: string;
  isFeatured?: boolean;
  hasVideo?: boolean;
  isLiked?: boolean;
}

interface ProjectCardProps {
  project: Project;
  onViewClick: (project: Project) => void;
}

export function ProjectCard({ project, onViewClick }: ProjectCardProps) {
  return (
    <div 
      onClick={() => onViewClick(project)}
      className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 ease-out group flex flex-col h-full relative cursor-pointer ${project.isFeatured ? 'border-[var(--primary)] shadow-[0_8px_25px_rgba(197,138,35,0.12)] hover:shadow-[0_15px_35px_rgba(197,138,35,0.2)] hover:-translate-y-1' : 'border-slate-100 shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:border-slate-200 hover:shadow-[0_10px_25px_rgba(0,0,0,0.06)] hover:-translate-y-1'}`}
    >
      
      {/* Featured Highlight Line */}
      {project.isFeatured && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent-strong)] z-20"></div>
      )}

      {/* Image Container - slightly shorter for compact look */}
      <div className="relative h-[200px] w-full overflow-hidden shrink-0">
        <div className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm cursor-pointer hover:bg-white hover:scale-110 transition-transform duration-300">
          <i className={`${project.isLiked ? 'fas' : 'far'} fa-heart ${project.isLiked ? 'text-red-500' : 'text-slate-600'} text-[0.95rem]`}></i>
        </div>
        
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 items-end">
          {project.isFeatured && (
            <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent-strong)] text-white text-[0.7rem] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
              <i className="fas fa-crown text-white/90 text-[0.7rem]"></i> Premium
            </div>
          )}
          {project.hasVideo && (
            <div className="bg-[rgba(15,23,42,0.7)] backdrop-blur-md text-white text-[0.7rem] font-medium px-3 py-1 rounded-full shadow-md flex items-center gap-1 hover:bg-[var(--primary)] transition-colors cursor-pointer">
              <i className="fas fa-play-circle"></i> Tour
            </div>
          )}
        </div>
        
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none opacity-80"></div>
        
        <div className="absolute bottom-3 left-4 right-4 z-10 flex justify-between items-end">
           <div className="bg-white/95 backdrop-blur-md text-[var(--text-dark-strong)] text-[0.7rem] font-bold px-2.5 py-1 rounded shadow-sm">
            {project.status}
           </div>
        </div>
      </div>
      
      {/* Card Body - tighter padding */}
      <div className="p-4 flex flex-col flex-grow">
        
        {/* Title & Location Hierarchy */}
        <div className="mb-3">
          <h3 className="text-[1.1rem] font-extrabold text-[var(--text-dark-strong)] leading-tight mb-1 group-hover:text-[var(--primary)] transition-colors duration-300 line-clamp-1">
            {project.title}
          </h3>
          <div className="text-[0.8rem] text-slate-500 flex items-center gap-1.5">
            <i className="fas fa-map-marker-alt text-[var(--primary-soft)]"></i> 
            <span className="line-clamp-1">{project.location}</span>
          </div>
        </div>

        {/* Features Row - smaller badges */}
        {project.features && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.features.split('•').map((feature, i) => (
              <span key={i} className="text-[0.7rem] font-bold text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                {feature.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Description - smaller text */}
        <div className="text-[0.85rem] text-[var(--text-body)] mb-4 line-clamp-2 leading-relaxed opacity-90">
          {project.description}
        </div>

        <div className="mt-auto"></div>

        {/* Pricing Area - cleaner, less bulky */}
        <div className="mb-4 flex justify-between items-end">
           <div>
             <div className="text-[0.7rem] text-slate-400 font-medium mb-0.5 uppercase tracking-wide">Starting From</div>
             <div className="text-[1.3rem] font-black text-[var(--primary)] leading-none">
               {project.price}
             </div>
           </div>
        </div>
        
        {/* Footer: Developer & Button */}
        <div className="pt-3 border-t border-slate-100 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-0.5">
              <span className="flex items-center gap-1 text-[0.8rem] font-bold text-[var(--text-dark)]">
                <i className="fas fa-building text-[var(--primary)] opacity-80 text-[0.75rem]"></i> {project.developer}
                {project.developerVerified && <i className="fas fa-badge-check text-[var(--primary)] text-[0.75rem]"></i>}
              </span>
              {project.reraNumber && (
                <span className="text-[0.65rem] text-slate-500 flex items-center gap-1">
                  <i className="fas fa-file-shield text-emerald-500"></i> RERA: {project.reraNumber}
                </span>
              )}
            </div>
          </div>
          
          <button 
            onClick={() => onViewClick(project)}
            className="w-full py-2 bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white font-bold text-[0.85rem] rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 group/btn"
          >
            View Property <i className="fas fa-arrow-right text-[0.75rem] group-hover/btn:translate-x-1 transition-transform"></i>
          </button>
        </div>
        
      </div>
    </div>
  );
}
