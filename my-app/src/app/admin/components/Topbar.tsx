"use client";
import React from "react";
import { useAdmin } from "./AdminContext";

interface TopbarProps {
  title: string;
  breadcrumb?: string;
  onMenuToggle?: () => void;
}

export function Topbar({ title, breadcrumb, onMenuToggle }: TopbarProps) {
  let contextToggle: (() => void) | undefined;
  try {
    const admin = useAdmin();
    contextToggle = admin.toggleSidebar;
  } catch {
    // Topbar rendered outside AdminProvider fallback
  }

  const handleToggle = onMenuToggle || contextToggle;

  return (
    <header className="admin-topbar">
      <div className="topbar-left">
        {/* Mobile / Tablet menu toggle */}
        <button
          className="topbar-icon-btn topbar-menu-btn"
          onClick={handleToggle}
          aria-label="Toggle Navigation Menu"
          id="topbar-menu-toggle"
          type="button"
        >
          <i className="fas fa-bars"></i>
        </button>

        <div>
          <div className="topbar-page-title">{title}</div>
          {breadcrumb && (
            <div className="topbar-breadcrumb">
              <span>Admin</span> &rsaquo; {breadcrumb}
            </div>
          )}
        </div>
      </div>

      <div className="topbar-right">
        {/* Status Pill */}
        <div className="topbar-status-pill">
          <span className="status-dot"></span>
          <span className="status-text">Atlas Live</span>
        </div>

        {/* Live Site Link */}
        <a
          href="/Home"
          target="_blank"
          rel="noopener noreferrer"
          className="topbar-icon-btn"
          title="Open Customer Landing Page"
          id="topbar-view-site-btn"
        >
          <i className="fas fa-arrow-up-right-from-square"></i>
        </a>
      </div>
    </header>
  );
}
