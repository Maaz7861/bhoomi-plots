import React, { useEffect } from 'react';

interface SocialPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SocialPopup({ isOpen, onClose }: SocialPopupProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const socialLinks = [
    { name: 'Instagram', url: 'https://www.instagram.com/bhoomigroup15/', icon: <i className="fab fa-instagram text-xl md:text-2xl"></i>, color: 'hover:text-[#E1306C] hover:bg-[#E1306C]/10' },
    { name: 'Facebook', url: 'https://www.facebook.com/bhoomiplots1', icon: <i className="fab fa-facebook-f text-xl md:text-2xl"></i>, color: 'hover:text-[#1877F2] hover:bg-[#1877F2]/10' },
    { name: 'X (Twitter)', url: 'https://x.com/bhoomiplots', icon: <i className="fab fa-twitter text-xl md:text-2xl"></i>, color: 'hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10' },
    { name: 'YouTube', url: 'https://www.youtube.com/@BhoomiGroup15', icon: <i className="fab fa-youtube text-xl md:text-2xl"></i>, color: 'hover:text-[#FF0000] hover:bg-[#FF0000]/10' },
    { name: 'LinkedIn', url: 'https://in.linkedin.com/company/bhoomigroup15', icon: <i className="fab fa-linkedin-in text-xl md:text-2xl"></i>, color: 'hover:text-[#0A66C2] hover:bg-[#0A66C2]/10' },
    { name: 'Pinterest', url: 'https://in.pinterest.com/bhoomiplots/', icon: <i className="fab fa-pinterest-p text-xl md:text-2xl"></i>, color: 'hover:text-[#E60023] hover:bg-[#E60023]/10' },
    { 
      name: 'Threads', 
      url: 'https://www.threads.com/@b.hoomigroup', 
      color: 'hover:text-black hover:bg-black/10',
      icon: (
        <svg viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6 fill-current">
          <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.194473 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.0476C101.049 97.8663 102.994 97.7376 104.934 97.6514C106.84 97.5663 108.695 97.5227 110.449 97.5227C110.408 104.972 109.355 111.711 107.439 117.276C105.81 121.938 102.75 129.006 98.4405 129.507Z" />
        </svg>
      )
    }
  ];

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0f172a]/40 backdrop-blur-md transition-opacity duration-500">
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} aria-label="Close popup"></div>
      
      {/* Sleek Minimalist White Modal */}
      <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.15)] max-w-[800px] w-[95%] text-center transform transition-all duration-500 animate-in fade-in zoom-in-95 border border-gray-100">
        
        {/* Subtle Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-gray-800 hover:bg-gray-100 transition-all"
          aria-label="Close"
        >
          <i className="fas fa-times"></i>
        </button>

        {/* Clean Header */}
        <div className="mb-10">
          <h3 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Connect with us</h3>
          <p className="text-gray-500 text-[1rem]">Follow Bhoomi Plots &amp; Land across our networks</p>
        </div>

        {/* 7 Icons strictly in one horizontal line */}
        <div className="flex flex-row items-center justify-start md:justify-center gap-3 md:gap-5 overflow-x-auto snap-x px-2 pt-6 pb-6 -mt-6 -mb-6 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {socialLinks.map((link, idx) => (
            <a 
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex items-center justify-center w-[3.5rem] h-[3.5rem] md:w-[4rem] md:h-[4rem] shrink-0 rounded-full bg-gray-50 text-gray-600 border border-gray-100 hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(0,0,0,0.06)] transition-all duration-300 ${link.color}`}
              aria-label={link.name}
              title={link.name}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <span className="transition-transform duration-300 group-hover:scale-110 flex items-center justify-center">
                {link.icon}
              </span>
            </a>
          ))}
        </div>
        
        {/* Helper text for mobile users to know they can scroll if their screen is very tiny */}
        <p className="mt-8 text-xs text-gray-400 md:hidden italic">Swipe horizontally to see more</p>

      </div>
      
      {/* Hide scrollbar for webkit */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
}
