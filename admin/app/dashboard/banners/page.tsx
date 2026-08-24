"use client";
import React, { useState } from "react";
import { Topbar } from "../../components/Topbar";
import { BannerForm } from "../../components/BannerForm";
import { ConfirmDialog } from "../../components/ConfirmDialog";

// Mock data — will come from API later
const MOCK_BANNERS = [
  {
    id: "b1",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&q=80",
    ctaText: "Explore Premium Plots →",
    link: "http://localhost:3000/projects",
    isActive: true,
    createdAt: "2026-08-20",
  },
  {
    id: "b2",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80",
    ctaText: "View Commercial Spaces",
    link: "http://localhost:3000/projects?tab=commercial",
    isActive: false,
    createdAt: "2026-08-18",
  },
];

export default function BannersPage() {
  const [banners, setBanners] = useState(MOCK_BANNERS);
  const [formOpen, setFormOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<(typeof MOCK_BANNERS)[0] | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const handleToggleActive = (id: string) => {
    setBanners((prev) =>
      prev.map((b) => ({
        ...b,
        isActive: b.id === id ? !b.isActive : false, // only one active at a time
      }))
    );
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setBanners((prev) => prev.filter((b) => b.id !== deleteTarget));
    setDeleteTarget(null);
  };

  const handleEdit = (banner: (typeof MOCK_BANNERS)[0]) => {
    setEditingBanner(banner);
    setFormOpen(true);
  };

  return (
    <>
      <Topbar title="Banner Ads" breadcrumb="Banner Ads" />

      <main className="admin-content">
        {/* Page header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <h1 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-dark-strong)" }}>
              Banner Advertisements
            </h1>
            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "2px" }}>
              Manage the full-width banner shown between Hero and Why Choose Us on the landing page
            </p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => { setEditingBanner(null); setFormOpen(true); }}
            id="banners-add-btn"
          >
            <i className="fas fa-plus"></i> Add Banner
          </button>
        </div>

        {/* Info strip */}
        <div
          style={{
            background: "rgba(197,138,35,0.07)",
            border: "1px solid rgba(197,138,35,0.25)",
            borderRadius: "var(--radius-sm)",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "0.82rem",
            color: "#92660e",
            marginBottom: "20px",
          }}
        >
          <i className="fas fa-circle-info" style={{ flexShrink: 0 }}></i>
          <span>
            Only <strong>one banner</strong> can be active at a time. Activating a banner will
            automatically deactivate all others. The active banner renders live on the landing page.
          </span>
        </div>

        {banners.length === 0 ? (
          <div className="admin-card">
            <div className="empty-state">
              <div className="empty-state-icon">
                <i className="fas fa-rectangle-ad"></i>
              </div>
              <div className="empty-state-title">No banners yet</div>
              <div className="empty-state-desc">
                Add your first banner advertisement to display it on the landing page.
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => setFormOpen(true)} id="banners-empty-add-btn">
                <i className="fas fa-plus"></i> Add Banner
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {banners.map((banner) => (
              <div
                key={banner.id}
                className="admin-card"
                style={{
                  borderColor: banner.isActive ? "var(--primary)" : undefined,
                  boxShadow: banner.isActive
                    ? "0 0 0 2px rgba(197,138,35,0.15), var(--shadow-sm)"
                    : undefined,
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "200px 1fr auto",
                    gap: "20px",
                    padding: "16px 20px",
                    alignItems: "center",
                  }}
                  className="banner-row"
                >
                  {/* Preview image */}
                  <div
                    style={{
                      height: "100px",
                      borderRadius: "var(--radius-sm)",
                      overflow: "hidden",
                      position: "relative",
                      background: "var(--bg-light-soft)",
                    }}
                  >
                    <img
                      src={banner.imageUrl}
                      alt="Banner preview"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    {banner.isActive && (
                      <div
                        style={{
                          position: "absolute",
                          top: "6px",
                          left: "6px",
                          background: "var(--primary)",
                          color: "white",
                          fontSize: "0.62rem",
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: "999px",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                        }}
                      >
                        Live
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                      <span
                        className={`badge ${banner.isActive ? "badge-green" : "badge-slate"}`}
                        style={{ fontSize: "0.7rem" }}
                      >
                        <i className={`fas fa-circle`} style={{ fontSize: "0.4rem" }}></i>{" "}
                        {banner.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>

                    {banner.ctaText && (
                      <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-dark-strong)", marginBottom: "4px" }}>
                        &ldquo;{banner.ctaText}&rdquo;
                      </div>
                    )}

                    {banner.link && (
                      <a
                        href={banner.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: "0.77rem",
                          color: "var(--primary)",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          marginBottom: "6px",
                          wordBreak: "break-all",
                        }}
                      >
                        <i className="fas fa-arrow-up-right-from-square" style={{ flexShrink: 0, fontSize: "0.65rem" }}></i>
                        {banner.link}
                      </a>
                    )}

                    <div style={{ fontSize: "0.73rem", color: "var(--text-muted)" }}>
                      <i className="fas fa-calendar-day" style={{ marginRight: "4px" }}></i>
                      Added {banner.createdAt}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
                    {/* Toggle */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                        {banner.isActive ? "Deactivate" : "Activate"}
                      </span>
                      <div
                        className={`toggle ${banner.isActive ? "on" : ""}`}
                        onClick={() => handleToggleActive(banner.id)}
                        role="switch"
                        aria-checked={banner.isActive}
                        tabIndex={0}
                        id={`banner-toggle-${banner.id}`}
                      />
                    </div>

                    <div style={{ display: "flex", gap: "6px" }}>
                      <button
                        className="btn btn-icon btn-icon-edit"
                        onClick={() => handleEdit(banner)}
                        aria-label={`Edit banner`}
                        title="Edit"
                        id={`banner-edit-${banner.id}`}
                      >
                        <i className="fas fa-pen-to-square"></i>
                      </button>
                      <button
                        className="btn btn-icon btn-icon-delete"
                        onClick={() => setDeleteTarget(banner.id)}
                        aria-label={`Delete banner`}
                        title="Delete"
                        id={`banner-delete-${banner.id}`}
                      >
                        <i className="fas fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add / Edit form */}
      <BannerForm
        isOpen={formOpen}
        onClose={() => { setFormOpen(false); setEditingBanner(null); }}
        initialData={editingBanner ?? undefined}
        isEditing={!!editingBanner}
      />

      {/* Delete confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete this banner?"
        description="This will permanently remove the banner. If it was active, no banner will be shown on the landing page."
        confirmLabel="Yes, Delete"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}
