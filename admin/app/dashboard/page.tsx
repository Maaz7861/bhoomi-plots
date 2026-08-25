"use client";
import React, { useState, useEffect } from "react";
import { Topbar } from "../components/Topbar";
import Link from "next/link";
import { getPlots, getBanners, PlotData, BannerData } from "../../lib/api";

const categoryChipClass: Record<string, string> = {
  plots: "chip chip-plots",
  land: "chip chip-land",
  residential: "chip chip-residential",
  commercial: "chip chip-commercial",
};

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [plots, setPlots] = useState<PlotData[]>([]);
  const [banners, setBanners] = useState<BannerData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [plotsData, bannersData] = await Promise.all([
          getPlots().catch(() => []),
          getBanners().catch(() => []),
        ]);
        setPlots(plotsData);
        setBanners(bannersData);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalPlots = plots.length;
  const activeBanners = banners.filter((b) => b.isActive).length;
  const featuredPlots = plots.filter((p) => p.isFeatured).length;
  const uniqueCategories = new Set(plots.map((p) => p.category)).size;

  const stats = [
    {
      id: "total-plots",
      label: "Total Plots",
      value: loading ? "..." : String(totalPlots),
      icon: "fa-layer-group",
      iconBg: "#fef3c7",
      iconColor: "#92400e",
      change: `${totalPlots} active in DB`,
      changeDir: "up",
    },
    {
      id: "active-banners",
      label: "Active Banners",
      value: loading ? "..." : String(activeBanners),
      icon: "fa-rectangle-ad",
      iconBg: "#ede9fe",
      iconColor: "#6d28d9",
      change: activeBanners > 0 ? "Live on Landing Page" : "None active",
      changeDir: activeBanners > 0 ? "up" : "down",
    },
    {
      id: "plots-featured",
      label: "Featured Plots",
      value: loading ? "..." : String(featuredPlots),
      icon: "fa-crown",
      iconBg: "rgba(197,138,35,0.1)",
      iconColor: "#c58a23",
      change: "Highlighted with crown",
      changeDir: "up",
    },
    {
      id: "categories",
      label: "Categories in Use",
      value: loading ? "..." : String(uniqueCategories || 4),
      icon: "fa-tag",
      iconBg: "#f0fdf4",
      iconColor: "#15803d",
      change: "Plots, Land, Res, Com",
      changeDir: "up",
    },
  ];

  const recentPlots = plots.slice(0, 5);

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
              Live connection active with MongoDB &amp; Cloudinary.
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
              <div className="admin-card-subtitle">
                {loading ? "Loading listings..." : `Showing ${recentPlots.length} recent entries`}
              </div>
            </div>
            <Link href="/dashboard/plots" className="btn btn-ghost btn-sm" id="dash-view-all-plots">
              View all <i className="fas fa-arrow-right" style={{ fontSize: "0.7rem" }}></i>
            </Link>
          </div>

          <div className="admin-table-wrap">
            {recentPlots.length === 0 ? (
              <div style={{ padding: "40px 20px", textAlign: "center", color: "var(--text-muted)", fontSize: "0.88rem" }}>
                {loading ? "Loading..." : "No property listings in database yet."}
              </div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Featured</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPlots.map((plot) => (
                    <tr key={plot._id}>
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
                        {plot.isFeatured ? (
                          <span className="badge badge-gold">
                            <i className="fas fa-crown" style={{ fontSize: "0.6rem" }}></i> Yes
                          </span>
                        ) : (
                          <span className="badge badge-slate">No</span>
                        )}
                      </td>
                      <td>
                        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{plot.location}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
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
