"use client";
import React, { useState, useRef } from "react";

export interface BannerFormData {
  imageUrl: string;
  ctaText: string;
  link: string;
  isActive: boolean;
}

const EMPTY_FORM: BannerFormData = {
  imageUrl: "",
  ctaText: "",
  link: "",
  isActive: true,
};

interface BannerFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<BannerFormData>;
  isEditing?: boolean;
}

export function BannerForm({ isOpen, onClose, initialData, isEditing = false }: BannerFormProps) {
  const [form, setForm] = useState<BannerFormData>({ ...EMPTY_FORM, ...initialData });
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleFilePick = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    setForm((f) => ({ ...f, imageUrl: url })); // replaced with Cloudinary URL on submit
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFilePick(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.[0]) handleFilePick(e.dataTransfer.files[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API call will be wired here (upload to Cloudinary then save URL to DB)
    console.log("Banner form data:", form);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-drawer" role="dialog" aria-modal="true" aria-label={isEditing ? "Edit Banner" : "Add Banner"}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">
            {isEditing ? "Edit Banner Ad" : "Add New Banner Ad"}
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <i className="fas fa-xmark"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} id="banner-form">
          <div className="modal-body">

            {/* Image upload */}
            <div className="form-group">
              <label className="form-label">
                Banner Image <span className="required">*</span>
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="banner-image-input"
                onChange={handleFileInput}
              />
              {imagePreview ? (
                <div style={{ position: "relative", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
                  <img
                    src={imagePreview}
                    alt="Banner preview"
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                      borderRadius: "var(--radius-sm)",
                      display: "block",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(0,0,0,0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      style={{ background: "rgba(255,255,255,0.9)", color: "var(--text-dark)" }}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <i className="fas fa-arrow-up-from-bracket"></i> Change
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => { setImagePreview(null); setForm((f) => ({ ...f, imageUrl: "" })); }}
                    >
                      <i className="fas fa-trash-can"></i> Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className={`upload-zone ${dragOver ? "drag-over" : ""}`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  style={{ minHeight: "160px" }}
                >
                  <div className="upload-zone-icon">
                    <i className="fas fa-image"></i>
                  </div>
                  <p className="upload-zone-text">
                    <strong>Click to upload</strong> or drag &amp; drop
                  </p>
                  <p className="upload-zone-sub">Recommended: 1440 × 500 px, max 5 MB</p>
                </div>
              )}
              <p className="form-hint">Image will be uploaded to Cloudinary. Use a wide landscape image for best results.</p>
            </div>

            {/* CTA Text */}
            <div className="form-group">
              <label className="form-label" htmlFor="banner-cta">
                CTA Text
              </label>
              <input
                id="banner-cta"
                name="ctaText"
                type="text"
                className="form-input"
                placeholder='e.g. "Explore Premium Plots →"'
                value={form.ctaText}
                onChange={handleChange}
              />
              <p className="form-hint">Optional. Text shown on the button overlay on the banner.</p>
            </div>

            {/* Link */}
            <div className="form-group">
              <label className="form-label" htmlFor="banner-link">
                Target Link
              </label>
              <input
                id="banner-link"
                name="link"
                type="url"
                className="form-input"
                placeholder="https://bhoomigroup.com/projects"
                value={form.link}
                onChange={handleChange}
              />
              <p className="form-hint">Optional. Where the CTA button leads.</p>
            </div>

            {/* isActive toggle */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "var(--bg-light)",
                borderRadius: "var(--radius-sm)",
                padding: "14px 16px",
                border: "1px solid var(--border-default)",
              }}
            >
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-dark-strong)" }}>
                  Set as Active Banner
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  Only one banner is shown on the landing page at a time
                </div>
              </div>
              <div
                className={`toggle ${form.isActive ? "on" : ""}`}
                onClick={() => setForm((f) => ({ ...f, isActive: !f.isActive }))}
                role="switch"
                aria-checked={form.isActive}
                tabIndex={0}
                id="banner-active-toggle"
              />
            </div>

            {/* Info note */}
            <div
              style={{
                background: "var(--info-soft)",
                border: "1px solid var(--info-border)",
                borderRadius: "var(--radius-sm)",
                padding: "12px 14px",
                fontSize: "0.8rem",
                color: "#1d4ed8",
                display: "flex",
                gap: "8px",
                alignItems: "flex-start",
              }}
            >
              <i className="fas fa-circle-info" style={{ marginTop: "2px", flexShrink: 0 }}></i>
              <span>
                The banner appears between the <strong>Hero</strong> and the{" "}
                <strong>Why Choose Us</strong> section on the landing page. Activating a new banner
                will deactivate the current one.
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose} id="banner-form-cancel">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" id="banner-form-submit">
              <i className={`fas ${isEditing ? "fa-floppy-disk" : "fa-plus"}`}></i>
              {isEditing ? "Save Changes" : "Add Banner"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
