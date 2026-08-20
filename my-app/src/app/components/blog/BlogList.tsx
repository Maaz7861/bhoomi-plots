import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const posts = [
  {
    tag: 'Investment',
    title: 'Why land continues to be a strong asset class in India',
    desc: 'Understanding supply, demand and how land holds value across market cycles.',
    readTime: '3 min read',
    date: 'Oct 12',
    image: '/projects/plot.jpg'
  },
  {
    tag: 'Pune Region',
    title: 'Top emerging corridors for NA plots around Pune',
    desc: 'A quick overview of Hinjewadi, Kharadi, Wagholi and other micro‑markets.',
    readTime: '4 min read',
    date: 'Oct 08',
    image: '/projects/residential.jpg'
  },
  {
    tag: 'Stories',
    title: 'How a first‑time buyer built a weekend home near Nashik',
    desc: 'From shortlisting to registration – a real customer journey with Bhoomi.',
    readTime: '6 min read',
    date: 'Sep 29',
    image: '/projects/commercial.jpg'
  },
  {
    tag: 'Regulations',
    title: 'Things to know about RERA while buying plots',
    desc: 'Key compliance points and documents you should review as a buyer.',
    readTime: '3 min read',
    date: 'Sep 15',
    image: '/projects/land.jpg'
  }
];

export function BlogList() {
  return (
    <section>
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-2xl font-bold text-[var(--text-dark-strong)] tracking-tight">Latest Posts</h2>
        <div className="flex-1 h-px bg-[var(--border-subtle)]"></div>
      </div>
      
      {/* 4 Cards Horizontally on Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {posts.map((post, idx) => (
          <article key={idx} className="group bg-white rounded-[1.25rem] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_50px_-12px_rgba(197,138,35,0.25)] transition-all duration-500 border border-[var(--border-subtle-alt)] hover:border-[var(--primary)]/30 flex flex-col h-full hover:-translate-y-2 relative">
            
            {/* Standardized Aspect Ratio Thumbnail */}
            <div className="w-full aspect-[4/3] relative overflow-hidden bg-slate-100 shrink-0 border-b border-[var(--border-subtle-alt)]">
              <Image 
                src={post.image} 
                alt={post.title} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
              
              <div className="absolute top-4 left-4 z-10 transition-transform duration-500 group-hover:translate-y-1">
                <span className="inline-block px-3 py-1 bg-white/95 backdrop-blur text-[var(--text-dark-strong)] text-[0.65rem] font-bold uppercase tracking-wider rounded-md shadow-sm border border-[var(--border-subtle-alt)] group-hover:text-[var(--primary)] group-hover:border-[var(--primary)]/30 transition-colors">
                  {post.tag}
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5 flex flex-col flex-1 bg-white relative z-20">
              <h3 className="text-[1.1rem] font-bold mb-3 text-[var(--text-dark-strong)] group-hover:text-[var(--primary)] transition-colors duration-300 leading-snug line-clamp-3">
                {post.title}
              </h3>
              
              <p className="text-[var(--text-body-muted)] mb-5 text-[0.85rem] leading-relaxed line-clamp-3 group-hover:text-[var(--text-body)] transition-colors duration-300">
                {post.desc}
              </p>
              
              {/* Footer pushed to bottom using mt-auto */}
              <div className="mt-auto pt-4 flex items-center justify-between border-t border-[var(--border-subtle-alt)] group-hover:border-[var(--primary)]/20 transition-colors duration-300 text-[0.7rem] font-semibold text-[var(--text-muted)]">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 group-hover:text-[var(--text-dark-strong)] transition-colors"><i className="far fa-calendar-alt text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors duration-300"></i> {post.date}</span>
                  <span className="flex items-center gap-1.5 group-hover:text-[var(--text-dark-strong)] transition-colors"><i className="far fa-clock text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors duration-300"></i> {post.readTime}</span>
                </div>
              </div>
            </div>
            
            <Link href="#" className="absolute inset-0 z-30" aria-label={`Read ${post.title}`}></Link>
          </article>
        ))}
      </div>
    </section>
  );
}
