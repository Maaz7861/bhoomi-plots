import React from 'react';

export function Footer() {
  return (
    <>
<footer className="footer">
      <div className="footer-inner">
        <div className="footer-col">
          <h4>Address</h4>
          <p className="footer-address">
            Shree Hari Krushna Complex, Shop<br />
            Number 13 &amp; 14, Old Adgoan Naka,<br />
            Panchavati, Nashik, Maharashtra<br />
            422003
          </p>
          <p className="footer-hours">
            Thu - Tue 10.00 AM - 07.00 PM<br />
            Wednesday - Closed
          </p>
        </div>
        <div className="footer-col">
          <h4>Our Services</h4>
          <ul>
            <li><a href="pages/services.html">Farm House Plots</a></li>
            <li><a href="pages/services.html">Industrial Plots</a></li>
            <li><a href="pages/services.html">NA Plots</a></li>
            <li><a href="pages/services.html">Residential Plots</a></li>
            <li><a href="pages/services.html">Development Plots</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact Us</h4>
          <p><a href="tel:+917083909008">7083909008</a></p>
          <p><a href="mailto:bhoomiplots1@gmail.com">bhoomiplots1@gmail.com</a></p>
          <div className="footer-social">
            <a href="https://www.instagram.com/bhoomigroup15/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="https://www.facebook.com/bhoomiplots1" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="https://x.com/bhoomiplots" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)"><i className="fab fa-twitter"></i></a>
            <a href="https://www.youtube.com/@BhoomiGroup15" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
            <a href="https://in.linkedin.com/company/bhoomigroup15" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Career</h4>
          <p><a href="pages/careers.html">Join our team</a></p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 Bhoomi Plots &amp; Land. All rights reserved.</span>
        <span>Made with care for Indian real estate buyers.</span>
      </div>
    </footer>
    </>
  );
}
