"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearToken, getAdminUser } from "@/lib/api";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface NavItem {
  href: string;
  icon: string;
  label: string;
  badge?: string | null;
}

interface NavSection {
  label: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    label: "Overview",
    items: [
      { href: "/admin/dashboard", icon: "fa-gauge-high", label: "Dashboard" },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/dashboard/plots", icon: "fa-layer-group", label: "Plots & Projects", badge: null },
      { href: "/admin/dashboard/banners", icon: "fa-rectangle-ad", label: "Banner Ads", badge: null },
    ],
  },
  {
    label: "Settings",
    items: [
      { href: "/admin/dashboard/settings", icon: "fa-gear", label: "Settings" },
    ],
  },
];

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<{ name: string; email: string; role: string } | null>(null);

  useEffect(() => {
    setAdminUser(getAdminUser());
  }, []);

  const isActive = (href: string) => {
    if (href === "/admin/dashboard") return pathname === "/admin/dashboard";
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    clearToken();
    router.replace("/admin/login");
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`admin-sidebar ${isOpen ? "open" : ""}`} aria-label="Admin Navigation">
        {/* Logo & Mobile Close */}
        <div className="sidebar-logo">
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
            <img
              src="/assets/images/bhoomi-logo-white-1-1536x526.png"
              alt="Bhoomi Group"
              style={{ height: "32px", width: "auto", objectFit: "contain", alignSelf: "flex-start" }}
            />
            <span className="sidebar-logo-sub" style={{ fontSize: "0.62rem", letterSpacing: "0.1em", color: "var(--accent-strong)", fontWeight: 700 }}>
              ADMIN PORTAL
            </span>
          </div>

          {/* Close button on mobile/tablet */}
          <button
            className="sidebar-close-btn"
            onClick={onClose}
            aria-label="Close Sidebar"
            type="button"
          >
            <i className="fas fa-xmark"></i>
          </button>
        </div>

        {/* Navigation Sections */}
        <nav className="sidebar-nav">
          {navSections.map((section) => (
            <div key={section.label}>
              <div className="sidebar-section-label">{section.label}</div>
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`sidebar-link ${isActive(item.href) ? "active" : ""}`}
                  onClick={onClose}
                  id={`sidebar-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <i className={`fas ${item.icon}`}></i>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="sidebar-link-badge">{item.badge}</span>
                  )}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        {/* Footer info & Logout */}
        <div className="sidebar-footer">
          {/* Visit Public Site */}
          <Link
            href="/Home"
            className="sidebar-link"
            style={{ marginBottom: "4px" }}
            onClick={onClose}
          >
            <i className="fas fa-arrow-up-right-from-square"></i>
            <span>View Live Site</span>
          </Link>

          {/* Logout Button */}
          <button
            className="sidebar-link"
            style={{ color: "#f87171" }}
            onClick={handleLogout}
            id="sidebar-logout-btn"
            type="button"
          >
            <i className="fas fa-right-from-bracket"></i>
            <span>Logout</span>
          </button>

          <div style={{ height: "10px" }} />

          {/* User Profile Chip */}
          <div className="sidebar-user">
            <div className="sidebar-avatar">
              {adminUser?.name ? adminUser.name.charAt(0).toUpperCase() : "A"}
            </div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{adminUser?.name || "Bhoomi Admin"}</div>
              <div className="sidebar-user-role">{adminUser?.email || "admin@bhoomigroup.com"}</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
