"use client";
import React, { useState } from "react";
import { Topbar } from "../components/Topbar";
import Link from "next/link";

// Placeholder stat data — will come from API later
const stats = [
  {
    id: "total-plots",
    label: "Total Plots",
    value: "12",
    icon: "fa-layer-group",
    iconBg: "#fef3c7",
    iconColor: "#92400e",
    change: "+2 this month",
    changeDir: "up",
  },
  {
    id: "active-banners",
    label: "Active Banners",
    value: "1",
    icon: "fa-rectangle-ad",
    iconBg: "#ede9fe",
    iconColor: "#6d28d9",
    change: "1 live now",
    changeDir: "up",
  },
  {
    id: "plots-featured",
    label: "Featured Plots",
    value: "4",
    icon: "fa-crown",
    iconBg: "rgba(197,138,35,0.1)",
    iconColor: "#c58a23",
    change: "Across all categories",
    changeDir: "up",
  },
  {
    id: "categories",
    label: "Categories",
    value: "4",
    icon: "fa-tag",
    iconBg: "#f0fdf4",
    iconColor: "#15803d",
    change: "Plots, Land, Res, Com",
    changeDir: "up",
  },
];

const recentPlots = [
  { id: "p1", title: "Lakeview Township", category: "plots", price: "₹ 45 Lakh", status: "Fast Selling", featured: true },
  { id: "l1", title: "Bhoomi Hills", category: "land", price: "₹ 2.5 Cr", status: "High Appreciation", featured: true },
  { id: "r1", title: "Premium Bungalow", category: "residential", price: "₹ 1.27 Cr", status: "RERA Approved", featured: true },
  { id: "c1", title: "Horizon IT Park", category: "commercial", price: "₹ 3.5 Cr", status: "Under Construction", featured: true },
];

const categoryChipClass: Record<string, string> = {
  plots: "chip chip-plots",
  land: "chip chip-land",
  residential: "chip chip-residential",
  commercial: "chip chip-commercial",
};

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Topbar
        title="Dashboard"
        breadcrumb="Overview"
        onMenuToggle={() => setSidebarOpen((o) => !o)}
      />
      <main className="admin-content">
        {/* Welcome strip */}
        <div
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            borderRadius: "var(--radius-lg)",
            padding: "24px 28px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "1.15rem",
                fontWeight: 800,
                color: "#f8fafc",
                marginBottom: "4px",
              }}
            >
              Good day, Admin 👋
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
              Manage your property listings and banner ads from here.
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Link href="/dashboard/plots" className="btn btn-primary btn-sm" id="dash-add-plot-btn">
              <i className="fas fa-plus"></i> Add Plot
            </Link>
            <Link href="/dashboard/banners" className="btn btn-ghost btn-sm" id="dash-add-banner-btn"
              style={{ background: "rgba(255,255,255,0.08)", color: "#f8fafc", borderColor: "rgba(255,255,255,0.12)" }}>
              <i className="fas fa-rectangle-ad"></i> Add Banner
            </Link>
          </div>
        </div>

        {/* Stats grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
            gap: "16px",
            marginBottom: "28px",
          }}
        >
          {stats.map((s) => (
            <div className="stat-card" key={s.id} id={s.id}>
              <div
                className="stat-icon"
                style={{ background: s.iconBg, color: s.iconColor }}
              >
                <i className={`fas ${s.icon}`}></i>
              </div>
              <div className="stat-info">
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
                <div className={`stat-change ${s.changeDir}`}>
                  <i className={`fas fa-arrow-${s.changeDir === "up" ? "trend-up" : "trend-down"}`}></i>{" "}
                  {s.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent plots table */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div>
              <div className="admin-card-title">Recent Listings</div>
              <div className="admin-card-subtitle">Last added plot entries</div>
            </div>
            <Link href="/dashboard/plots" className="btn btn-ghost btn-sm" id="dash-view-all-plots">
              View all <i className="fas fa-arrow-right" style={{ fontSize: "0.7rem" }}></i>
            </Link>
          </div>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Featured</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentPlots.map((plot) => (
                  <tr key={plot.id}>
                    <td>
                      <span className="table-title">{plot.title}</span>
                    </td>
                    <td>
                      <span className={categoryChipClass[plot.category] || "chip"}>
                        {plot.category}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, color: "var(--primary)" }}>{plot.price}</span>
                    </td>
                    <td>
                      <span className="badge badge-green">{plot.status}</span>
                    </td>
                    <td>
                      {plot.featured ? (
                        <span className="badge badge-gold">
                          <i className="fas fa-crown" style={{ fontSize: "0.6rem" }}></i> Yes
                        </span>
                      ) : (
                        <span className="badge badge-slate">No</span>
                      )}
                    </td>
                    <td>
                      <div className="table-actions">
                        <button className="btn btn-icon btn-icon-edit" aria-label="Edit plot" title="Edit">
                          <i className="fas fa-pen-to-square"></i>
                        </button>
                        <button className="btn btn-icon btn-icon-delete" aria-label="Delete plot" title="Delete">
                          <i className="fas fa-trash-can"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick links */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "16px",
            marginTop: "20px",
          }}
        >
          {[
            { href: "/dashboard/plots", icon: "fa-plus", label: "Add New Plot", sub: "Create a new property listing", color: "var(--primary)" },
            { href: "/dashboard/banners", icon: "fa-image", label: "Upload Banner", sub: "Add or change the landing page ad", color: "#6d28d9" },
            { href: "/dashboard/plots", icon: "fa-list", label: "Manage Listings", sub: "Edit or delete existing plots", color: "#0891b2" },
          ].map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className="admin-card"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "18px 20px",
                textDecoration: "none",
                transition: "all 0.2s",
                cursor: "pointer",
              }}
              id={`dash-quick-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "var(--radius-sm)",
                  background: `${item.color}18`,
                  color: item.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.95rem",
                  flexShrink: 0,
                }}
              >
                <i className={`fas ${item.icon}`}></i>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--text-dark-strong)" }}>
                  {item.label}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>
                  {item.sub}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
