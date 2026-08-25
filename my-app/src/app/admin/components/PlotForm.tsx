"use client";
import React, { useState, useRef, useEffect } from "react";
import { uploadImageFile, PlotData } from "@/lib/api";

export type PlotFormData = Omit<PlotData, "_id" | "createdAt">;

const EMPTY_FORM: PlotFormData = {
  title: "",
  category: "plots",
  price: "",
  priceRange: "",
  bhk: "",
  location: "",
  description: "",
  features: "",
  status: "",
  reraNumber: "",
  imageUrl: "",
  isFeatured: false,
};

const STATUS_OPTIONS = [
  "Fast Selling",
  "Limited Inventory",
  "New Launch",
  "High Appreciation",
  "Phase 1 Open",
  "Exclusive Listing",
  "RERA Approved",
  "Ready to Move",
  "Under Construction",
  "Pre-launch Offers",
];

const BHK_OPTIONS = [
  "1 BHK",
  "2 BHK",
  "3 BHK",
  "4 BHK",
  "5+ BHK",
  "1, 2 BHK",
  "2, 3 BHK",
  "3, 4 BHK",
  "Studio Apartment",
  "Penthouse / Duplex",
];

interface PlotFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PlotFormData) => Promise<void>;
  initialData?: Partial<PlotFormData>;
  isEditing?: boolean;
}

export function PlotForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditing = false,
}: PlotFormProps) {
  const [form, setForm] = useState<PlotFormData>({ ...EMPTY_FORM, ...initialData });
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((f) => ({ ...f, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
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
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to upload image to Cloudinary.";
      setUploadError(message);
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
    setIsSubmitting(true);
    setUploadError(null);

    try {
      await onSubmit(form);
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to save property.";
      setUploadError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && !isSubmitting && onClose()}>
      <div className="modal-drawer" role="dialog" aria-modal="true" aria-label={isEditing ? "Edit Property" : "Add New Property"}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <div className="modal-title">
              {isEditing ? "Edit Property / Project" : "Add New Property / Project"}
            </div>
          </div>
          <button className="modal-close" onClick={onClose} disabled={isSubmitting} aria-label="Close drawer">
            <i className="fas fa-xmark"></i>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} id="plot-form">
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
                Property Image <span className="required">*</span>
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="plot-image-input"
                onChange={handleFileInput}
                disabled={isUploading}
              />
              {imagePreview ? (
                <div className="upload-preview" style={{ position: "relative" }}>
                  <img src={imagePreview} alt="Preview" style={{ opacity: isUploading ? 0.5 : 1 }} />
                  {isUploading ? (
                    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.5)", color: "white", gap: "8px" }}>
                      <div className="spinner" style={{ width: "24px", height: "24px" }}></div>
                      <span style={{ fontSize: "0.78rem" }}>Uploading to Cloudinary...</span>
                    </div>
                  ) : (
                    <div
                      style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", opacity: 0, transition: "opacity 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
                    >
                      <button type="button" className="btn btn-ghost btn-sm" style={{ background: "white", color: "var(--text-dark)" }} onClick={() => fileInputRef.current?.click()}>
                        <i className="fas fa-arrow-up-from-bracket"></i> Change
                      </button>
                      <button type="button" className="btn btn-danger btn-sm" onClick={() => { setImagePreview(null); setForm((f) => ({ ...f, imageUrl: "" })); }}>
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
                >
                  <div className="upload-zone-icon">
                    {isUploading ? <div className="spinner"></div> : <i className="fas fa-cloud-arrow-up"></i>}
                  </div>
                  <p className="upload-zone-text"><strong>Click to upload</strong> or drag &amp; drop</p>
                  <p className="upload-zone-sub">Uploads directly to Cloudinary (PNG, JPG, WEBP)</p>
                </div>
              )}
            </div>

            {/* Title */}
            <div className="form-group">
              <label className="form-label" htmlFor="plot-title">Title / Project Name <span className="required">*</span></label>
              <input id="plot-title" name="title" type="text" className="form-input" placeholder="e.g. Vraj Central Vista" value={form.title} onChange={handleChange} required />
            </div>

            {/* Category + Status */}
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="plot-category">Category <span className="required">*</span></label>
                <select id="plot-category" name="category" className="form-select" value={form.category} onChange={handleChange} required>
                  <option value="plots">Plots</option>
                  <option value="land">Land</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="plot-status">Status <span className="required">*</span></label>
                <select id="plot-status" name="status" className="form-select" value={form.status} onChange={handleChange} required>
                  <option value="">Select status</option>
                  {STATUS_OPTIONS.map((s) => (<option key={s} value={s}>{s}</option>))}
                </select>
              </div>
            </div>

            {/* BHK Option - Conditionally shown for Residential */}
            {form.category === "residential" && (
              <div className="form-group" style={{ background: "rgba(197, 138, 35, 0.05)", border: "1px dashed rgba(197, 138, 35, 0.3)", borderRadius: "var(--radius-sm)", padding: "12px 14px" }}>
                <label className="form-label" htmlFor="plot-bhk" style={{ color: "var(--primary-hover)" }}>
                  <i className="fas fa-bed" style={{ marginRight: "6px" }}></i> BHK Configuration <span className="required">*</span>
                </label>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "4px" }}>
                  {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"].map((bhkOption) => {
                    const isSelected = form.bhk?.includes(bhkOption);
                    return (
                      <button
                        type="button"
                        key={bhkOption}
                        onClick={() => {
                          let current = form.bhk ? form.bhk.split(", ").filter(Boolean) : [];
                          if (current.includes(bhkOption)) {
                            current = current.filter((b) => b !== bhkOption);
                          } else {
                            current.push(bhkOption);
                          }
                          setForm((f) => ({ ...f, bhk: current.join(", ") }));
                        }}
                        className={`btn btn-sm ${isSelected ? "btn-primary" : "btn-ghost"}`}
                        style={{ fontSize: "0.8rem", padding: "5px 12px" }}
                      >
                        {bhkOption} {isSelected && <i className="fas fa-check" style={{ marginLeft: "4px", fontSize: "0.65rem" }}></i>}
                      </button>
                    );
                  })}
                </div>
                <input
                  id="plot-bhk"
                  name="bhk"
                  type="text"
                  className="form-input"
                  placeholder="e.g. 2 BHK, 3 BHK (or select tags above)"
                  value={form.bhk || ""}
                  onChange={handleChange}
                  style={{ marginTop: "10px" }}
                />
                <p className="form-hint">Select the BHK configurations available for this residential property.</p>
              </div>
            )}

            {/* Price + Price Range */}
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="plot-price">Starting Price <span className="required">*</span></label>
                <input id="plot-price" name="price" type="text" className="form-input" placeholder="e.g. ₹ 51 Lakh" value={form.price} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="plot-price-range">Price Range</label>
                <input id="plot-price-range" name="priceRange" type="text" className="form-input" placeholder="e.g. 50L - 80L" value={form.priceRange || ""} onChange={handleChange} />
                <p className="form-hint">Display range, e.g. 50L - 80L</p>
              </div>
            </div>

            {/* Location + RERA Number */}
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="plot-location">Location <span className="required">*</span></label>
                <input id="plot-location" name="location" type="text" className="form-input" placeholder="e.g. Indira Nagar, Nashik" value={form.location} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="plot-rera">RERA Number</label>
                <input id="plot-rera" name="reraNumber" type="text" className="form-input" placeholder="e.g. P51600048828" value={form.reraNumber} onChange={handleChange} />
              </div>
            </div>

            {/* Features */}
            <div className="form-group">
              <label className="form-label" htmlFor="plot-features">Features &amp; Amenities</label>
              <input id="plot-features" name="features" type="text" className="form-input" placeholder="e.g. Gym • Club House • Solar • Parking" value={form.features} onChange={handleChange} />
              <p className="form-hint">Separate feature tags with a • (bullet) character.</p>
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label" htmlFor="plot-description">Description <span className="required">*</span></label>
              <textarea id="plot-description" name="description" className="form-textarea" placeholder="Brief description of the property..." value={form.description} onChange={handleChange} required rows={3} />
            </div>

            {/* isFeatured toggle */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--bg-light)", borderRadius: "var(--radius-sm)", padding: "12px 16px", border: "1px solid var(--border-default)" }}>
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-dark-strong)" }}>Mark as Featured</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Featured properties get a gold border and crown badge</div>
              </div>
              <div className={`toggle ${form.isFeatured ? "on" : ""}`} onClick={() => setForm((f) => ({ ...f, isFeatured: !f.isFeatured }))} role="switch" aria-checked={form.isFeatured} tabIndex={0} id="plot-featured-toggle" />
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose} disabled={isSubmitting || isUploading} id="plot-form-cancel">Cancel</button>
            <button type="submit" className="btn btn-primary" id="plot-form-submit" disabled={isSubmitting || isUploading}>
              {isSubmitting ? (<><span className="spinner" style={{ marginRight: "6px" }}></span>Saving...</>) : (<><i className={`fas ${isEditing ? "fa-floppy-disk" : "fa-plus"}`}></i>{isEditing ? "Save Changes" : "Save Property"}</>)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
