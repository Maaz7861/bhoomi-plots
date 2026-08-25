"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Topbar } from "../../components/Topbar";
import { PlotForm, PlotFormData } from "../../components/PlotForm";
import { ConfirmDialog } from "../../components/ConfirmDialog";
import { CustomSelect, DropdownOption } from "../../components/CustomSelect";
import { getPlots, createPlot, updatePlot, deletePlot, PlotData } from "@/lib/api";

type Category = "all" | "plots" | "land" | "residential" | "commercial";

const CATEGORY_FILTER_OPTIONS: DropdownOption<Category>[] = [
  { value: "all", label: "All Categories", icon: "fa-layer-group" },
  { value: "residential", label: "Residential", icon: "fa-house", badge: "CRM", badgeColor: "bg-blue-50 text-blue-700" },
  { value: "commercial", label: "Commercial", icon: "fa-building" },
  { value: "plots", label: "Plots", icon: "fa-map", badge: "NA", badgeColor: "bg-amber-50 text-amber-700" },
  { value: "land", label: "Land", icon: "fa-tree", badge: "Agro", badgeColor: "bg-emerald-50 text-emerald-700" },
];

const CATEGORY_CHIP: Record<string, string> = {
  plots: "chip chip-plots",
  land: "chip chip-land",
  residential: "chip chip-residential",
  commercial: "chip chip-commercial",
};

export default function PlotsPage() {
  const [plots, setPlots] = useState<PlotData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<Category>("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingPlot, setEditingPlot] = useState<PlotData | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchPlots = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPlots();
      setPlots(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to load properties.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPlots(); }, [fetchPlots]);

  const filtered = plots.filter((p) => {
    const s = search.toLowerCase();
    const matchSearch =
      p.title.toLowerCase().includes(s) ||
      p.location.toLowerCase().includes(s) ||
      (p.bhk && p.bhk.toLowerCase().includes(s)) ||
      (p.priceRange && p.priceRange.toLowerCase().includes(s));
    const matchCat = categoryFilter === "all" || p.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const handleFormSubmit = async (formData: PlotFormData) => {
    if (editingPlot && editingPlot._id) {
      await updatePlot(editingPlot._id, formData);
    } else {
      await createPlot(formData);
    }
    await fetchPlots();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      await deletePlot(deleteTarget);
      setDeleteTarget(null);
      await fetchPlots();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to delete property.";
      alert(message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (plot: PlotData) => { setEditingPlot(plot); setFormOpen(true); };
  const handleFormClose = () => { setFormOpen(false); setEditingPlot(null); };

  return (
    <>
      <Topbar title="Properties &amp; Projects" breadcrumb="Properties &amp; Projects" />
      <main className="admin-content">
        {/* Page header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-dark-strong)" }}>Property Listings</h1>
            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "2px" }}>{plots.length} total properties in MongoDB</p>
          </div>
          <button className="btn btn-primary" onClick={() => { setEditingPlot(null); setFormOpen(true); }} id="plots-add-btn"><i className="fas fa-plus"></i> Add Property</button>
        </div>

        {error && (
          <div style={{ background: "rgba(230, 57, 70, 0.12)", border: "1px solid rgba(230, 57, 70, 0.3)", borderRadius: "var(--radius-sm)", padding: "12px 16px", color: "#ef4444", fontSize: "0.85rem", marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><i className="fas fa-circle-exclamation"></i><span>{error}</span></div>
            <button className="btn btn-ghost btn-sm" onClick={fetchPlots}>Retry</button>
          </div>
        )}

        {/* Filters */}
        <div className="admin-card overflow-visible relative z-20" style={{ padding: "16px", marginBottom: "16px" }}>
          <div className="filter-bar">
            <div className="filter-search">
              <i className="fas fa-magnifying-glass"></i>
              <input type="text" placeholder="Search title, location, BHK, price..." value={search} onChange={(e) => setSearch(e.target.value)} id="plots-search-input" />
            </div>
            <div className="w-full sm:w-60 shrink-0">
              <CustomSelect
                options={CATEGORY_FILTER_OPTIONS}
                value={categoryFilter}
                onChange={(val) => setCategoryFilter(val)}
                id="plots-category-filter"
              />
            </div>
            {(search || categoryFilter !== "all") && (
              <button className="btn btn-ghost btn-sm" onClick={() => { setSearch(""); setCategoryFilter("all"); }} id="plots-clear-filters"><i className="fas fa-xmark"></i> Clear</button>
            )}
          </div>
        </div>

        {/* Listings Card */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div>
              <div className="admin-card-title">All Listings</div>
              <div className="admin-card-subtitle">{loading ? "Loading listings..." : `Showing ${filtered.length} of ${plots.length} entries`}</div>
            </div>
          </div>

          {loading ? (
            <div style={{ padding: "60px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
              <div className="spinner" style={{ width: "32px", height: "32px", borderWidth: "3px", borderColor: "rgba(197,138,35,0.2)", borderTopColor: "var(--primary)" }}></div>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Loading properties from database...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon"><i className="fas fa-layer-group"></i></div>
              <div className="empty-state-title">No properties found</div>
              <div className="empty-state-desc">{search || categoryFilter !== "all" ? "Try adjusting your search or filters." : "Get started by adding your first property listing."}</div>
              <button className="btn btn-primary btn-sm" onClick={() => { setEditingPlot(null); setFormOpen(true); }} id="plots-empty-add-btn"><i className="fas fa-plus"></i> Add Property</button>
            </div>
          ) : (
            <>
              {/* 🖥️ DESKTOP VIEW: Full Comprehensive Table (untouched on desktop) */}
              <div className="admin-table-desktop admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title &amp; Location</th>
                      <th>Category</th>
                      <th>Price / Range</th>
                      <th>Status</th>
                      <th>Featured</th>
                      <th>RERA</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((plot) => (
                      <tr key={plot._id}>
                        <td>{plot.imageUrl ? (<img src={plot.imageUrl} alt={plot.title} className="table-thumb" />) : (<div className="table-thumb-placeholder"><i className="fas fa-image"></i></div>)}</td>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                            <span className="table-title">{plot.title}</span>
                            {plot.bhk && (
                              <span className="badge badge-blue" style={{ fontSize: "0.62rem", padding: "1px 6px" }}>
                                {plot.bhk}
                              </span>
                            )}
                          </div>
                          <span className="table-sub"><i className="fas fa-location-dot" style={{ color: "var(--primary-soft)", marginRight: "3px" }}></i>{plot.location}</span>
                        </td>
                        <td><span className={CATEGORY_CHIP[plot.category]}>{plot.category}</span></td>
                        <td>
                          <span style={{ fontWeight: 700, color: "var(--primary)" }}>{plot.price}</span>
                          {plot.priceRange && (
                            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "block" }}>
                              Range: {plot.priceRange}
                            </span>
                          )}
                        </td>
                        <td><span className="badge badge-green">{plot.status}</span></td>
                        <td>{plot.isFeatured ? (<span className="badge badge-gold"><i className="fas fa-crown" style={{ fontSize: "0.6rem" }}></i> Yes</span>) : (<span className="badge badge-slate">No</span>)}</td>
                        <td><span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "monospace" }}>{plot.reraNumber || "—"}</span></td>
                        <td>
                          <div className="table-actions">
                            <button className="btn btn-icon btn-icon-edit" onClick={() => handleEdit(plot)} aria-label={`Edit ${plot.title}`} title="Edit" id={`plot-edit-${plot._id}`}><i className="fas fa-pen-to-square"></i></button>
                            <button className="btn btn-icon btn-icon-delete" onClick={() => setDeleteTarget(plot._id || null)} aria-label={`Delete ${plot.title}`} title="Delete" id={`plot-delete-${plot._id}`}><i className="fas fa-trash-can"></i></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 📱 MOBILE VIEW: Premium Responsive Cards */}
              <div className="admin-cards-mobile">
                {filtered.map((plot) => (
                  <div key={plot._id} className={`mobile-prop-card ${plot.isFeatured ? "featured" : ""}`}>
                    {/* Top Row: Thumbnail + Title + Meta */}
                    <div className="mobile-prop-top">
                      {plot.imageUrl ? (
                        <img src={plot.imageUrl} alt={plot.title} className="mobile-prop-thumb" />
                      ) : (
                        <div className="mobile-prop-thumb-placeholder"><i className="fas fa-image"></i></div>
                      )}
                      <div className="mobile-prop-meta">
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap", marginBottom: "2px" }}>
                          <span className="mobile-prop-title">{plot.title}</span>
                          {plot.isFeatured && (
                            <span className="badge badge-gold" style={{ fontSize: "0.6rem", padding: "1px 6px" }}>
                              <i className="fas fa-crown" style={{ fontSize: "0.55rem" }}></i> Featured
                            </span>
                          )}
                        </div>
                        <div className="mobile-prop-location">
                          <i className="fas fa-location-dot" style={{ color: "var(--primary)" }}></i>
                          <span>{plot.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Details Grid: Price, Status, Category, BHK */}
                    <div className="mobile-prop-details">
                      <div>
                        <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600 }}>Price</div>
                        <div className="mobile-prop-price">{plot.price}</div>
                        {plot.priceRange && (
                          <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Range: {plot.priceRange}</div>
                        )}
                      </div>
                      <div>
                        <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600 }}>Status &amp; Category</div>
                        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginTop: "2px" }}>
                          <span className={CATEGORY_CHIP[plot.category]}>{plot.category}</span>
                          <span className="badge badge-green" style={{ fontSize: "0.65rem", padding: "2px 6px" }}>{plot.status}</span>
                        </div>
                      </div>
                      {plot.bhk && (
                        <div style={{ gridColumn: "span 2" }}>
                          <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600 }}>Configuration</div>
                          <span className="badge badge-blue" style={{ fontSize: "0.7rem", marginTop: "2px" }}>
                            <i className="fas fa-bed" style={{ marginRight: "4px" }}></i> {plot.bhk}
                          </span>
                        </div>
                      )}
                      {plot.reraNumber && (
                        <div style={{ gridColumn: "span 2", fontSize: "0.72rem", color: "var(--text-muted)" }}>
                          RERA: <code style={{ color: "var(--text-dark)", fontWeight: 600 }}>{plot.reraNumber}</code>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="mobile-prop-actions">
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        onClick={() => handleEdit(plot)}
                        id={`mobile-plot-edit-${plot._id}`}
                      >
                        <i className="fas fa-pen-to-square" style={{ color: "var(--info)" }}></i> Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        style={{ color: "var(--danger)", borderColor: "var(--danger-border)" }}
                        onClick={() => setDeleteTarget(plot._id || null)}
                        id={`mobile-plot-delete-${plot._id}`}
                      >
                        <i className="fas fa-trash-can"></i> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <PlotForm isOpen={formOpen} onClose={handleFormClose} onSubmit={handleFormSubmit} initialData={editingPlot ?? undefined} isEditing={!!editingPlot} />
      <ConfirmDialog isOpen={!!deleteTarget} title="Delete this listing?" description="This will permanently remove the property from the MongoDB database. This action cannot be undone." confirmLabel={isDeleting ? "Deleting..." : "Yes, Delete"} variant="danger" onConfirm={handleDelete} onCancel={() => !isDeleting && setDeleteTarget(null)} />
    </>
  );
}
