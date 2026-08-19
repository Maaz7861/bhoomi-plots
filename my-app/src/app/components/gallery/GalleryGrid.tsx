"use client";
import React, { useState, useEffect } from 'react';

type Category = 'All' | 'Residential' | 'Plots & Land' | 'Farm House' | 'Commercial';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: Category;
  title: string;
}

const galleryData: GalleryImage[] = [
  {
    id: 'g1',
    src: '/projects/residential.jpg',
    alt: 'Premium High-Rise Apartment',
    category: 'Residential',
    title: 'Skyline Residences',
  },
  {
    id: 'g2',
    src: '/projects/plot.jpg',
    alt: 'NA Plots Layout',
    category: 'Plots & Land',
    title: 'Eco Meadows Plotted Layout',
  },
  {
    id: 'g3',
    src: '/gallery/farmhouse.jpg',
    alt: 'Luxury Farmhouse',
    category: 'Farm House',
    title: 'Vineyard Retreats',
  },
  {
    id: 'g4',
    src: '/projects/commercial.jpg',
    alt: 'Commercial IT Park',
    category: 'Commercial',
    title: 'Horizon IT Park',
  },
  {
    id: 'g5',
    src: '/gallery/city_view.jpg',
    alt: 'City Skyline',
    category: 'Residential',
    title: 'Urban Residences Overview',
  },
  {
    id: 'g6',
    src: '/projects/land.jpg',
    alt: 'Agricultural Land',
    category: 'Plots & Land',
    title: 'Sahyadri Agro Estates',
  },
];

const categories: Category[] = ['All', 'Residential', 'Plots & Land', 'Farm House', 'Commercial'];

export function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages = activeCategory === 'All' 
    ? galleryData 
    : galleryData.filter(img => img.category === activeCategory);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedImage]);

  return (
    <section className="px-[5%] md:px-[8%] pb-24 bg-white relative">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 text-[0.9rem] border ${
                activeCategory === cat 
                  ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-md shadow-[var(--primary)]/30 -translate-y-0.5' 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-[var(--primary-soft)] hover:text-[var(--primary)] hover:shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Standard Uniform Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredImages.map((img) => (
            <div 
              key={img.id} 
              className="relative group rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 bg-slate-100 aspect-[4/3]"
              onClick={() => setSelectedImage(img)}
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                loading="lazy"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block bg-[var(--primary)] text-white text-[0.65rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm mb-2">
                    {img.category}
                  </span>
                  <h3 className="text-white text-lg font-bold">
                    {img.title}
                  </h3>
                </div>
              </div>

              {/* View Icon Corner */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 text-white">
                <i className="fas fa-expand"></i>
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="py-20 text-center text-slate-500">
            <i className="fas fa-images text-4xl mb-4 opacity-50"></i>
            <p>No images found in this category.</p>
          </div>
        )}

      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(15,23,42,0.95)] backdrop-blur-lg animate-in fade-in duration-300">
          
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 md:top-8 md:right-8 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-colors"
          >
            <i className="fas fa-times text-xl"></i>
          </button>

          <div className="relative w-full h-full p-4 md:p-12 flex flex-col items-center justify-center">
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt} 
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-500"
            />
            
            <div className="mt-6 text-center animate-in slide-in-from-bottom-4 duration-500 delay-150">
              <span className="text-[var(--primary)] text-xs font-bold uppercase tracking-widest mb-2 block">
                {selectedImage.category}
              </span>
              <h3 className="text-white text-xl md:text-2xl font-bold">
                {selectedImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
