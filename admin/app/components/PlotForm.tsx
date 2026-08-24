"use client";
import React, { useState, useRef } from "react";

export interface PlotFormData {
  title: string;
  category: "plots" | "land" | "residential" | "commercial";
  price: string;
  location: string;
  description: string;
  features: string;
  status: string;
  reraNumber: string;
  developer: string;
  imageUrl: string;
  isFeatured: boolean;
}

const EMPTY_FORM: PlotFormData = {
  title: "",
  category: "plots",
  price: "",
  location: "",
  description: "",
  features: "",
  status: "",
  reraNumber: "",
  developer: "Bhoomi Projects",
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

interface PlotFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<PlotFormData>;
  isEditing?: boolean;
}

export function PlotForm({ isOpen, onClose, initialData, isEditing = false }: PlotFormProps) {
  const [form, setForm] = useState<PlotFormData>({ ...EMPTY_FORM, ...initialData });
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFilePick = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    setForm((f) => ({ ...f, imageUrl: url })); // will be replaced with Cloudinary URL later
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
    // API call will be wired here
    console.log("Plot form data:", form);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-drawer" role="dialog" aria-modal="true" aria-label={isEditing ? "Edit Plot" : "Add New Plot"}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <div className="modal-title">
              {isEditing ? "Edit Plot / Project" : "Add New Plot / Project"}
            </div>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close drawer">
            <i className="fas fa-xmark"></i>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} id="plot-form">
          <div className="modal-body">

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
              />
              {imagePreview ? (
                <div className="upload-preview">
                  <img src={imagePreview} alt="Preview" />
                  <button
                    type="button"
                    className="upload-preview-remove"
                    onClick={() => { setImagePreview(null); setForm((f) => ({ ...f, imageUrl: "" })); }}
                    aria-label="Remove image"
                  >
                    <i className="fas fa-xmark"></i>
                  </button>
                </div>
              ) : (
                <div
                  className={`upload-zone ${dragOver ? "drag-over" : ""}`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                >
                  <div className="upload-zone-icon">
                    <i className="fas fa-cloud-arrow-up"></i>
                  </div>
                  <p className="upload-zone-text">
                    <strong>Click to upload</strong> or drag &amp; drop
                  </p>
                  <p className="upload-zone-sub">PNG, JPG, WEBP — max 5 MB</p>
                </div>
              )}
              <p className="form-hint">Image will be uploaded to Cloudinary.</p>
            </div>

            {/* Title */}
            <div className="form-group">
              <label className="form-label" htmlFor="plot-title">
                Title <span className="required">*</span>
              </label>
              <input
                id="plot-title"
                name="title"
                type="text"
                className="form-input"
                placeholder="e.g. Lakeview Township"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Category + Status */}
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="plot-category">
                  Category <span className="required">*</span>
                </label>
                <select
                  id="plot-category"
                  name="category"
                  className="form-select"
                  value={form.category}
                  onChange={handleChange}
                  required
                >
                  <option value="plots">Plots</option>
                  <option value="land">Land</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="plot-status">
                  Status <span className="required">*</span>
                </label>
                <select
                  id="plot-status"
                  name="status"
                  className="form-select"
                  value={form.status}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select status</option>
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price + Location */}
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="plot-price">
                  Price <span className="required">*</span>
                </label>
                <input
                  id="plot-price"
                  name="price"
                  type="text"
                  className="form-input"
                  placeholder="e.g. ₹ 45 Lakh"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="plot-location">
                  Location <span className="required">*</span>
                </label>
                <input
                  id="plot-location"
                  name="location"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Hinjewadi, Pune"
                  value={form.location}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Developer + RERA */}
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="plot-developer">
                  Developer
                </label>
                <input
                  id="plot-developer"
                  name="developer"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Bhoomi Projects"
                  value={form.developer}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="plot-rera">
                  RERA Number
                </label>
                <input
                  id="plot-rera"
                  name="reraNumber"
                  type="text"
                  className="form-input"
                  placeholder="e.g. P52100012345"
                  value={form.reraNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Features */}
            <div className="form-group">
              <label className="form-label" htmlFor="plot-features">
                Features
              </label>
              <input
                id="plot-features"
                name="features"
                type="text"
                className="form-input"
                placeholder="e.g. 1200 sq.ft • 3000 sq.ft • Lake Front"
                value={form.features}
                onChange={handleChange}
              />
              <p className="form-hint">Separate feature tags with a • (bullet) character.</p>
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label" htmlFor="plot-description">
                Description <span className="required">*</span>
              </label>
              <textarea
                id="plot-description"
                name="description"
                className="form-textarea"
                placeholder="Brief description of the property..."
                value={form.description}
                onChange={handleChange}
                required
                rows={3}
              />
            </div>

            {/* isFeatured toggle */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "var(--bg-light)",
                borderRadius: "var(--radius-sm)",
                padding: "12px 16px",
                border: "1px solid var(--border-default)",
              }}
            >
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-dark-strong)" }}>
                  Mark as Featured
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  Featured plots get a gold border and crown badge
                </div>
              </div>
              <div
                className={`toggle ${form.isFeatured ? "on" : ""}`}
                onClick={() => setForm((f) => ({ ...f, isFeatured: !f.isFeatured }))}
                role="switch"
                aria-checked={form.isFeatured}
                tabIndex={0}
                id="plot-featured-toggle"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose} id="plot-form-cancel">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" id="plot-form-submit">
              <i className={`fas ${isEditing ? "fa-floppy-disk" : "fa-plus"}`}></i>
              {isEditing ? "Save Changes" : "Add Plot"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
