import React from 'react';

export function SocialPopup() {
  return (
    <>
{/*  Social Handlers Popup  */}
    <div className="social-popup-backdrop" id="socialPopbackdrop" aria-hidden="true">
      <div className="social-popup-panel">
        <button type="button" className="social-popup-close" id="socialPopClose" aria-label="Close">&times;</button>
        <h3 className="social-popup-title">lets connect</h3>
        <p className="social-popup-subtitle">Follow Bhoomi Plots &amp; Land on social media</p>
        <div className="social-popup-icons">
          <a href="https://www.instagram.com/bhoomigroup15/" target="_blank" rel="noopener noreferrer" className="social-popup-icon" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          <a href="https://www.facebook.com/bhoomiplots1" target="_blank" rel="noopener noreferrer" className="social-popup-icon" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
          <a href="https://x.com/bhoomiplots" target="_blank" rel="noopener noreferrer" className="social-popup-icon" aria-label="X (Twitter)"><i className="fab fa-twitter"></i></a>
          <a href="https://www.youtube.com/@BhoomiGroup15" target="_blank" rel="noopener noreferrer" className="social-popup-icon" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
          <a href="https://in.linkedin.com/company/bhoomigroup15" target="_blank" rel="noopener noreferrer" className="social-popup-icon" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
        </div>
      </div>
    </div>
    </>
  );
}
