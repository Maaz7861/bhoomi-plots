"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearToken, getAdminUser } from "../../lib/api";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navSections = [
  {
    label: "Overview",
    items: [
      { href: "/dashboard", icon: "fa-gauge-high", label: "Dashboard" },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/dashboard/plots", icon: "fa-layer-group", label: "Plots & Projects", badge: null },
      { href: "/dashboard/banners", icon: "fa-rectangle-ad", label: "Banner Ads", badge: null },
    ],
  },
  {
    label: "Settings",
    items: [
      { href: "/dashboard/settings", icon: "fa-gear", label: "Settings" },
    ],
  },
];

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<{ name: string; email: string; role: string } | null>(null);

  useEffect(() => {
    setAdminUser(getAdminUser());
  }, []);

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    clearToken();
    router.replace("/login");
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <i className="fas fa-building" style={{ color: "#0f172a", fontSize: "1rem" }}></i>
          </div>
          <div className="sidebar-logo-text">
            <span className="sidebar-logo-name">Bhoomi Group</span>
            <span className="sidebar-logo-sub">Admin Portal</span>
          </div>
        </div>

        {/* Nav */}
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

        {/* Footer — user info */}
        <div className="sidebar-footer">
          {/* Visit Site */}
          <Link
            href="http://localhost:3000"
            target="_blank"
            className="sidebar-link"
            style={{ marginBottom: "4px" }}
          >
            <i className="fas fa-arrow-up-right-from-square"></i>
            <span>View Live Site</span>
          </Link>

          {/* Logout */}
          <button
            className="sidebar-link"
            style={{ color: "#f87171" }}
            onClick={handleLogout}
            id="sidebar-logout-btn"
          >
            <i className="fas fa-right-from-bracket"></i>
            <span>Logout</span>
          </button>

          <div style={{ height: "10px" }} />

          {/* User chip */}
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
