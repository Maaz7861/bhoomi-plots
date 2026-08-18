import React from 'react';

export function LatestWork() {
  return (
    <>
{/*  Our Latest Work  */}
    <section className="latest-work-section">
      <h2 className="latest-work-title">Our Latest Work</h2>
      <p className="latest-work-subtitle">Recent projects and properties we've delivered</p>
      <div className="latest-work-grid">
        <a href="pages/projects.html" className="latest-work-card">
          <div className="latest-work-img-wrap">
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" alt="Residential project" />
            <span className="latest-work-tag">Residential</span>
          </div>
          <div className="latest-work-body">
            <h3>West Pune Township</h3>
            <p>Bavdhan, Pune</p>
          </div>
        </a>
        <a href="pages/projects.html" className="latest-work-card">
          <div className="latest-work-img-wrap">
            <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80" alt="Apartment project" />
            <span className="latest-work-tag">Apartments</span>
          </div>
          <div className="latest-work-body">
            <h3>Kharadi Heights</h3>
            <p>Kharadi, Pune</p>
          </div>
        </a>
        <a href="pages/projects.html" className="latest-work-card">
          <div className="latest-work-img-wrap">
            <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80" alt="Villa project" />
            <span className="latest-work-tag">Villas</span>
          </div>
          <div className="latest-work-body">
            <h3>Riverside Villas</h3>
            <p>Hinjewadi, Pune</p>
          </div>
        </a>
        <a href="pages/projects.html" className="latest-work-card">
          <div className="latest-work-img-wrap">
            <img src="https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=600&q=80" alt="Plots project" />
            <span className="latest-work-tag">Plots & Land</span>
          </div>
          <div className="latest-work-body">
            <h3>Green Valley Plots</h3>
            <p>Wagholi, Pune</p>
          </div>
        </a>
      </div>
      <div className="latest-work-cta">
        <a href="pages/projects.html" className="btn-primary">View All Projects</a>
      </div>
    </section>
    </>
  );
}
