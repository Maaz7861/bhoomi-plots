import React from 'react';

export function Navbar() {
  return (
    <>
<nav className="navbar">
      <div>
        <img src="/assets/images/bhoomi-logo-white-1-1536x526.png" alt="Bhoomi Plots and Land" style={{'height': '50px', 'width': 'auto', background: '#0f172add', borderRadius: '50px', padding: '0 15px'}} />
      </div>
      <button className="nav-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">
        <i className="fas fa-bars"></i>
      </button>
      <div className="nav-links">
        <a href="index.html" className="active">Home</a>
        <a href="pages/about.html">About</a>

        <div className="nav-item has-dropdown">
          <a href="pages/services.html">
            Services
            <i className="fas fa-chevron-down nav-caret"></i>
          </a>
          <div className="nav-dropdown">
            <a href="#">Sales</a>
            <a href="#">Marketing &amp; Branding</a>
            <a href="#">After Sales Services</a>
            <a href="#">Project Analysis</a>
          </div>
        </div>

        <div className="nav-item has-dropdown">
          <a href="pages/projects.html">
            Projects
            <i className="fas fa-chevron-down nav-caret"></i>
          </a>
          <div className="nav-dropdown">
            <a href="pages/projects-lands.html">Lands</a>
            <a href="pages/projects-plots.html">Plots</a>
            <a href="pages/projects-residential.html">Residential</a>
          </div>
        </div>

        <a href="pages/gallery.html">Gallery</a>
        <a href="pages/careers.html">Careers</a>
        <a href="pages/contact.html">Contact</a>
        <a href="pages/blog.html">Blog</a>
      </div>
      <div className="nav-actions nav-auth">
        <button type="button" className="btn-social-handlers" id="socialHandlersBtn" aria-label="Open social links">
          <i className="fas fa-share-nodes"></i> lets connect
        </button>
      </div>
    </nav>
    </>
  );
}
