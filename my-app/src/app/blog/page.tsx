import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BlogHero } from '../components/blog/BlogHero';
import { BlogFeatured } from '../components/blog/BlogFeatured';
import { BlogList } from '../components/blog/BlogList';
import { BlogSidebar } from '../components/blog/BlogSidebar';

export const metadata = {
  title: 'Blog – Bhoomi Group',
  description: 'Stay updated with land investment tips, project launches and learnings from the Bhoomi Group team.',
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-light)]">
      <Navbar />
      
      <BlogHero />
      
      <div className="px-[5%] md:px-[8%] py-10 md:py-16 max-w-[1500px] mx-auto relative z-10 -mt-10 md:-mt-16">
        
        {/* Top Section: Featured Article + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-16">
          {/* Main Area: Featured Article */}
          <div className="lg:col-span-8 flex flex-col h-full">
            <BlogFeatured />
          </div>
          
          {/* Sidebar Area */}
          <div className="lg:col-span-4 h-full">
            <BlogSidebar />
          </div>
        </div>

        {/* Bottom Section: 4 Latest Posts (Horizontal Linear Structure) */}
        <div className="w-full">
          <BlogList />
        </div>

      </div>

      <Footer />
    </main>
  );
}
