import React from 'react';

export interface Project {
  id: string;
  image: string;
  gallery?: string[];
  title: string;
  price: string;
  priceRange?: string;
  bhk?: string;
  subPrice?: string;
  features?: string;
  description: string;
  location: string;
  developer?: string;
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

      {/* Image Container */}
      <div className="relative h-[200px] w-full overflow-hidden shrink-0">
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
        
        <div className="absolute bottom-3 left-4 right-4 z-10 flex justify-between items-end gap-2">
           <div className="bg-white/95 backdrop-blur-md text-[var(--text-dark-strong)] text-[0.7rem] font-bold px-2.5 py-1 rounded shadow-sm">
            {project.status}
           </div>
           {project.bhk && (
             <div className="bg-[var(--primary)] text-white text-[0.7rem] font-bold px-2.5 py-1 rounded shadow-sm flex items-center gap-1">
               <i className="fas fa-bed text-[0.65rem]"></i> {project.bhk}
             </div>
           )}
        </div>
      </div>
      
      {/* Card Body */}
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

        {/* Features Row */}
        {project.features && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.features.split('•').map((feature, i) => (
              <span key={i} className="text-[0.7rem] font-bold text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                {feature.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Description */}
        <div className="text-[0.85rem] text-[var(--text-body)] mb-4 line-clamp-2 leading-relaxed opacity-90">
          {project.description}
        </div>

        <div className="mt-auto"></div>

        {/* Pricing Area */}
        <div className="mb-4 flex justify-between items-end">
           <div>
             <div className="text-[0.7rem] text-slate-400 font-medium mb-0.5 uppercase tracking-wide">
               {project.priceRange ? 'Price Range' : 'Starting From'}
             </div>
             <div className="text-[1.25rem] font-black text-[var(--primary)] leading-tight">
               {project.priceRange ? project.priceRange : project.price}
             </div>
             {project.priceRange && project.price && project.price !== project.priceRange && (
               <div className="text-[0.72rem] text-slate-500 font-medium mt-0.5">
                 Starts at {project.price}
               </div>
             )}
           </div>
        </div>
        
        {/* Footer: RERA & Button */}
        <div className="pt-3 border-t border-slate-100 flex flex-col gap-3">
          {project.reraNumber && (
            <div className="flex items-center justify-between">
              <span className="text-[0.7rem] text-slate-500 flex items-center gap-1">
                <i className="fas fa-file-shield text-emerald-500"></i> RERA: <code className="font-semibold text-slate-700">{project.reraNumber}</code>
              </span>
            </div>
          )}
          
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
