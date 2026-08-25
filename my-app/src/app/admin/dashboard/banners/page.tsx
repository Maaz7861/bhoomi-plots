"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Topbar } from "../../components/Topbar";
import { BannerForm, BannerFormData } from "../../components/BannerForm";
import { ConfirmDialog } from "../../components/ConfirmDialog";
import { getBanners, createBanner, updateBanner, deleteBanner, BannerData } from "@/lib/api";

export default function BannersPage() {
  const [banners, setBanners] = useState<BannerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<BannerData | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchBanners = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getBanners();
      setBanners(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to load banners.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBanners(); }, [fetchBanners]);

  const handleFormSubmit = async (formData: BannerFormData) => {
    if (editingBanner && editingBanner._id) {
      await updateBanner(editingBanner._id, formData);
    } else {
      await createBanner(formData);
    }
    await fetchBanners();
  };

  const handleToggleActive = async (banner: BannerData) => {
    if (!banner._id) return;
    try {
      await updateBanner(banner._id, { isActive: !banner.isActive });
      await fetchBanners();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to update banner status.";
      alert(message);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      await deleteBanner(deleteTarget);
      setDeleteTarget(null);
      await fetchBanners();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to delete banner.";
      alert(message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (banner: BannerData) => { setEditingBanner(banner); setFormOpen(true); };

  return (
    <>
      <Topbar title="Banner Ads" breadcrumb="Banner Ads" />
      <main className="admin-content">
        {/* Page header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-dark-strong)" }}>Banner Advertisements</h1>
            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "2px" }}>Manage the full-width banner shown between Hero and Why Choose Us on the landing page</p>
          </div>
          <button className="btn btn-primary" onClick={() => { setEditingBanner(null); setFormOpen(true); }} id="banners-add-btn"><i className="fas fa-plus"></i> Add Banner</button>
        </div>

        {error && (
          <div style={{ background: "rgba(230, 57, 70, 0.12)", border: "1px solid rgba(230, 57, 70, 0.3)", borderRadius: "var(--radius-sm)", padding: "12px 16px", color: "#ef4444", fontSize: "0.85rem", marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><i className="fas fa-circle-exclamation"></i><span>{error}</span></div>
            <button className="btn btn-ghost btn-sm" onClick={fetchBanners}>Retry</button>
          </div>
        )}

        {/* Info strip */}
        <div style={{ background: "rgba(197,138,35,0.07)", border: "1px solid rgba(197,138,35,0.25)", borderRadius: "var(--radius-sm)", padding: "12px 16px", display: "flex", alignItems: "center", gap: "10px", fontSize: "0.82rem", color: "#92660e", marginBottom: "20px" }}>
          <i className="fas fa-circle-info" style={{ flexShrink: 0 }}></i>
          <span>Only <strong>one banner</strong> can be active at a time. Activating a banner will automatically deactivate all others. The active banner renders live on the landing page.</span>
        </div>

        {loading ? (
          <div style={{ padding: "60px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
            <div className="spinner" style={{ width: "32px", height: "32px", borderWidth: "3px", borderColor: "rgba(197,138,35,0.2)", borderTopColor: "var(--primary)" }}></div>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Loading banners from database...</span>
          </div>
        ) : banners.length === 0 ? (
          <div className="admin-card">
            <div className="empty-state">
              <div className="empty-state-icon"><i className="fas fa-rectangle-ad"></i></div>
              <div className="empty-state-title">No banners yet</div>
              <div className="empty-state-desc">Add your first banner advertisement to display it on the landing page.</div>
              <button className="btn btn-primary btn-sm" onClick={() => { setEditingBanner(null); setFormOpen(true); }} id="banners-empty-add-btn"><i className="fas fa-plus"></i> Add Banner</button>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {banners.map((banner) => (
              <div key={banner._id} className="admin-card" style={{ borderColor: banner.isActive ? "var(--primary)" : undefined, boxShadow: banner.isActive ? "0 0 0 2px rgba(197,138,35,0.15), var(--shadow-sm)" : undefined }}>
                <div style={{ display: "grid", gridTemplateColumns: "200px 1fr auto", gap: "20px", padding: "16px 20px", alignItems: "center" }} className="banner-row">
                  {/* Preview image */}
                  <div style={{ height: "100px", borderRadius: "var(--radius-sm)", overflow: "hidden", position: "relative", background: "var(--bg-light-soft)" }}>
                    <img src={banner.imageUrl} alt="Banner preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    {banner.isActive && (
                      <div style={{ position: "absolute", top: "6px", left: "6px", background: "var(--primary)", color: "white", fontSize: "0.62rem", fontWeight: 700, padding: "2px 8px", borderRadius: "999px", letterSpacing: "0.06em", textTransform: "uppercase" }}>Live</div>
                    )}
                  </div>

                  {/* Details */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                      <span className={`badge ${banner.isActive ? "badge-green" : "badge-slate"}`} style={{ fontSize: "0.7rem" }}><i className="fas fa-circle" style={{ fontSize: "0.4rem" }}></i> {banner.isActive ? "Active" : "Inactive"}</span>
                    </div>
                    {banner.ctaText && (<div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-dark-strong)", marginBottom: "4px" }}>&ldquo;{banner.ctaText}&rdquo;</div>)}
                    {banner.link && (
                      <a href={banner.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.77rem", color: "var(--primary)", display: "flex", alignItems: "center", gap: "4px", marginBottom: "6px", wordBreak: "break-all" }}>
                        <i className="fas fa-arrow-up-right-from-square" style={{ flexShrink: 0, fontSize: "0.65rem" }}></i>{banner.link}
                      </a>
                    )}
                    <div style={{ fontSize: "0.73rem", color: "var(--text-muted)" }}><i className="fas fa-calendar-day" style={{ marginRight: "4px" }}></i>Added {banner.createdAt ? new Date(banner.createdAt).toLocaleDateString() : "Recently"}</div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{banner.isActive ? "Deactivate" : "Activate"}</span>
                      <div className={`toggle ${banner.isActive ? "on" : ""}`} onClick={() => handleToggleActive(banner)} role="switch" aria-checked={banner.isActive} tabIndex={0} id={`banner-toggle-${banner._id}`} />
                    </div>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button className="btn btn-icon btn-icon-edit" onClick={() => handleEdit(banner)} aria-label="Edit banner" title="Edit" id={`banner-edit-${banner._id}`}><i className="fas fa-pen-to-square"></i></button>
                      <button className="btn btn-icon btn-icon-delete" onClick={() => setDeleteTarget(banner._id || null)} aria-label="Delete banner" title="Delete" id={`banner-delete-${banner._id}`}><i className="fas fa-trash-can"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <BannerForm isOpen={formOpen} onClose={() => { setFormOpen(false); setEditingBanner(null); }} onSubmit={handleFormSubmit} initialData={editingBanner ?? undefined} isEditing={!!editingBanner} />
      <ConfirmDialog isOpen={!!deleteTarget} title="Delete this banner?" description="This will permanently remove the banner. If it was active, no banner will be shown on the landing page." confirmLabel={isDeleting ? "Deleting..." : "Yes, Delete"} variant="danger" onConfirm={handleDelete} onCancel={() => !isDeleting && setDeleteTarget(null)} />
    </>
  );
}
