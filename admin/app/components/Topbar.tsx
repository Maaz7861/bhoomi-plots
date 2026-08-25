"use client";
import React from "react";

interface TopbarProps {
  title: string;
  breadcrumb?: string;
  onMenuToggle?: () => void;
}

export function Topbar({ title, breadcrumb, onMenuToggle }: TopbarProps) {
  return (
    <header className="admin-topbar">
      <div className="topbar-left">
        {/* Mobile menu toggle */}
        <button
          className="topbar-icon-btn"
          style={{ display: "flex" }}
          onClick={onMenuToggle}
          aria-label="Toggle sidebar"
          id="topbar-menu-toggle"
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
        {/* Notifications placeholder */}
        <button
          className="topbar-icon-btn"
          aria-label="Notifications"
          id="topbar-notifications-btn"
        >
          <i className="fas fa-bell"></i>
        </button>

        {/* Help */}
        <button
          className="topbar-icon-btn"
          aria-label="Help"
          id="topbar-help-btn"
        >
          <i className="fas fa-circle-question"></i>
        </button>
      </div>
    </header>
  );
}
