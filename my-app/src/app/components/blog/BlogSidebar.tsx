import React from 'react';
import Link from 'next/link';

export function BlogSidebar() {
  const categories = [
    { name: 'Investment Guides', count: 12 },
    { name: 'Project Updates', count: 8 },
    { name: 'Customer Stories', count: 5 },
    { name: 'RERA & Legal', count: 4 },
  ];

  return (
    <aside className="flex flex-col gap-6 sticky top-24">
      
      {/* Categories Widget */}
      <div className="bg-white rounded-2xl shadow-sm border border-[var(--border-subtle-alt)] p-6">
        <h3 className="text-[1.1rem] font-bold mb-4 text-[var(--text-dark-strong)] flex items-center gap-2">
          <i className="fas fa-folder text-[var(--primary)] text-sm"></i>
          Categories
        </h3>
        <ul className="flex flex-col">
          {categories.map((cat, idx) => (
            <li key={idx} className="border-b border-[var(--border-subtle-alt)] last:border-0">
              <Link href="#" className="group flex items-center justify-between py-3 transition-colors">
                <span className="text-[0.95rem] font-medium text-[var(--text-body)] group-hover:text-[var(--primary)] transition-colors">
                  {cat.name}
                </span>
                <span className="text-[0.8rem] text-[var(--text-muted)] bg-[var(--bg-light)] px-2 py-0.5 rounded-full font-semibold group-hover:bg-[var(--primary)]/10 group-hover:text-[var(--primary)] transition-colors">
                  {cat.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Widget */}
      <div className="bg-[var(--bg-dark)] rounded-2xl shadow-md p-6 md:p-8 text-white relative overflow-hidden text-center border border-[var(--bg-darker)]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--primary)]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4 text-[var(--primary)] text-lg">
            <i className="fas fa-headset"></i>
          </div>
          <h3 className="text-xl font-bold mb-2">Need Help?</h3>
          <p className="text-gray-300 text-[0.85rem] leading-relaxed mb-6">
            Want to discuss any topic in detail? Our team can walk you through options on a quick call.
          </p>
          <Link href="/contact" className="w-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-[0.95rem] font-bold py-2.5 px-4 rounded-lg transition-colors inline-block">
            Talk to an Expert
          </Link>
        </div>
      </div>
      
    </aside>
  );
}
