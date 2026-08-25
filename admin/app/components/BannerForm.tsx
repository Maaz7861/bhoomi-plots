"use client";
import React, { useState, useRef, useEffect } from "react";
import { uploadImageFile, BannerData } from "../../lib/api";

export type BannerFormData = Omit<BannerData, "_id" | "createdAt">;

const EMPTY_FORM: BannerFormData = {
  imageUrl: "",
  ctaText: "",
  link: "",
  isActive: true,
};

interface BannerFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BannerFormData) => Promise<void>;
  initialData?: Partial<BannerFormData>;
  isEditing?: boolean;
}

export function BannerForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditing = false,
}: BannerFormProps) {
  const [form, setForm] = useState<BannerFormData>({ ...EMPTY_FORM, ...initialData });
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setForm({ ...EMPTY_FORM, ...initialData });
      setImagePreview(initialData?.imageUrl || null);
      setUploadError(null);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleFilePick = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file.");
      return;
    }

    setUploadError(null);
    setIsUploading(true);

    const localUrl = URL.createObjectURL(file);
    setImagePreview(localUrl);

    try {
      const cloudinaryUrl = await uploadImageFile(file);
      setImagePreview(cloudinaryUrl);
      setForm((f) => ({ ...f, imageUrl: cloudinaryUrl }));
    } catch (err: any) {
      setUploadError(err.message || "Failed to upload image to Cloudinary.");
      setImagePreview(initialData?.imageUrl || null);
      setForm((f) => ({ ...f, imageUrl: initialData?.imageUrl || "" }));
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFilePick(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.[0]) handleFilePick(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.imageUrl) {
      setUploadError("Please upload a banner image before submitting.");
      return;
    }

    setIsSubmitting(true);
    setUploadError(null);

    try {
      await onSubmit(form);
      onClose();
    } catch (err: any) {
      setUploadError(err.message || "Failed to save banner.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && !isSubmitting && onClose()}>
      <div className="modal-drawer" role="dialog" aria-modal="true" aria-label={isEditing ? "Edit Banner" : "Add Banner"}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">
            {isEditing ? "Edit Banner Ad" : "Add New Banner Ad"}
          </div>
          <button className="modal-close" onClick={onClose} disabled={isSubmitting} aria-label="Close">
            <i className="fas fa-xmark"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} id="banner-form">
          <div className="modal-body">

            {uploadError && (
              <div
                style={{
                  background: "rgba(230, 57, 70, 0.12)",
                  border: "1px solid rgba(230, 57, 70, 0.3)",
                  borderRadius: "var(--radius-sm)",
                  padding: "10px 14px",
                  color: "#ef4444",
                  fontSize: "0.82rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <i className="fas fa-circle-exclamation"></i>
                <span>{uploadError}</span>
              </div>
            )}

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
                disabled={isUploading}
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
                      opacity: isUploading ? 0.5 : 1,
                    }}
                  />
                  {isUploading ? (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(0,0,0,0.5)",
                        color: "white",
                        gap: "8px",
                      }}
                    >
                      <div className="spinner" style={{ width: "24px", height: "24px" }}></div>
                      <span style={{ fontSize: "0.78rem" }}>Uploading to Cloudinary...</span>
                    </div>
                  ) : (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(0,0,0,0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        opacity: 0,
                        transition: "opacity 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
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
                        onClick={() => {
                          setImagePreview(null);
                          setForm((f) => ({ ...f, imageUrl: "" }));
                        }}
                      >
                        <i className="fas fa-trash-can"></i> Remove
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className={`upload-zone ${dragOver ? "drag-over" : ""}`}
                  onClick={() => !isUploading && fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  style={{ minHeight: "160px" }}
                >
                  <div className="upload-zone-icon">
                    {isUploading ? <div className="spinner"></div> : <i className="fas fa-image"></i>}
                  </div>
                  <p className="upload-zone-text">
                    <strong>Click to upload</strong> or drag &amp; drop
                  </p>
                  <p className="upload-zone-sub">Uploads directly to Cloudinary (Recommended: 1440 × 500 px)</p>
                </div>
              )}
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
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose} disabled={isSubmitting || isUploading} id="banner-form-cancel">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" id="banner-form-submit" disabled={isSubmitting || isUploading}>
              {isSubmitting ? (
                <>
                  <span className="spinner" style={{ marginRight: "6px" }}></span>
                  Saving...
                </>
              ) : (
                <>
                  <i className={`fas ${isEditing ? "fa-floppy-disk" : "fa-plus"}`}></i>
                  {isEditing ? "Save Changes" : "Add Banner"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
