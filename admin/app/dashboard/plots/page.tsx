"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Topbar } from "../../components/Topbar";
import { PlotForm, PlotFormData } from "../../components/PlotForm";
import { ConfirmDialog } from "../../components/ConfirmDialog";
import { getPlots, createPlot, updatePlot, deletePlot, PlotData } from "../../../lib/api";

type Category = "all" | "plots" | "land" | "residential" | "commercial";

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
    } catch (err: any) {
      setError(err.message || "Failed to load plots.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlots();
  }, [fetchPlots]);

  const filtered = plots.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
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
    } catch (err: any) {
      alert(err.message || "Failed to delete plot.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (plot: PlotData) => {
    setEditingPlot(plot);
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setEditingPlot(null);
  };

  return (
    <>
      <Topbar title="Plots & Projects" breadcrumb="Plots & Projects" />

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
              Property Listings
            </h1>
            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "2px" }}>
              {plots.length} total listings in MongoDB
            </p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => { setEditingPlot(null); setFormOpen(true); }}
            id="plots-add-btn"
          >
            <i className="fas fa-plus"></i> Add Plot
          </button>
        </div>

        {error && (
          <div
            style={{
              background: "rgba(230, 57, 70, 0.12)",
              border: "1px solid rgba(230, 57, 70, 0.3)",
              borderRadius: "var(--radius-sm)",
              padding: "12px 16px",
              color: "#ef4444",
              fontSize: "0.85rem",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <i className="fas fa-circle-exclamation"></i>
              <span>{error}</span>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={fetchPlots}>
              Retry
            </button>
          </div>
        )}

        {/* Filters */}
        <div className="admin-card" style={{ padding: "16px 20px", marginBottom: "16px" }}>
          <div className="filter-bar">
            {/* Search */}
            <div className="filter-search">
              <i className="fas fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Search by title or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                id="plots-search-input"
              />
            </div>

            {/* Category filter */}
            <select
              className="filter-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as Category)}
              id="plots-category-filter"
            >
              <option value="all">All Categories</option>
              <option value="plots">Plots</option>
              <option value="land">Land</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
            </select>

            {/* Clear */}
            {(search || categoryFilter !== "all") && (
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => { setSearch(""); setCategoryFilter("all"); }}
                id="plots-clear-filters"
              >
                <i className="fas fa-xmark"></i> Clear
              </button>
            )}
          </div>
        </div>

        {/* Table card */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div>
              <div className="admin-card-title">All Listings</div>
              <div className="admin-card-subtitle">
                {loading ? "Loading listings..." : `Showing ${filtered.length} of ${plots.length} entries`}
              </div>
            </div>
          </div>

          {loading ? (
            <div style={{ padding: "60px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
              <div className="spinner" style={{ width: "32px", height: "32px", borderWidth: "3px", borderColor: "rgba(197,138,35,0.2)", borderTopColor: "var(--primary)" }}></div>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Loading plots from database...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <i className="fas fa-layer-group"></i>
              </div>
              <div className="empty-state-title">No plots found</div>
              <div className="empty-state-desc">
                {search || categoryFilter !== "all"
                  ? "Try adjusting your search or filters."
                  : "Get started by adding your first property listing."}
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => { setEditingPlot(null); setFormOpen(true); }} id="plots-empty-add-btn">
                <i className="fas fa-plus"></i> Add Plot
              </button>
            </div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title &amp; Location</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Featured</th>
                    <th>RERA</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((plot) => (
                    <tr key={plot._id}>
                      <td>
                        {plot.imageUrl ? (
                          <img src={plot.imageUrl} alt={plot.title} className="table-thumb" />
                        ) : (
                          <div className="table-thumb-placeholder">
                            <i className="fas fa-image"></i>
                          </div>
                        )}
                      </td>
                      <td>
                        <span className="table-title">{plot.title}</span>
                        <span className="table-sub">
                          <i className="fas fa-location-dot" style={{ color: "var(--primary-soft)", marginRight: "3px" }}></i>
                          {plot.location}
                        </span>
                      </td>
                      <td>
                        <span className={CATEGORY_CHIP[plot.category]}>{plot.category}</span>
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
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "monospace" }}>
                          {plot.reraNumber || "—"}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button
                            className="btn btn-icon btn-icon-edit"
                            onClick={() => handleEdit(plot)}
                            aria-label={`Edit ${plot.title}`}
                            title="Edit"
                            id={`plot-edit-${plot._id}`}
                          >
                            <i className="fas fa-pen-to-square"></i>
                          </button>
                          <button
                            className="btn btn-icon btn-icon-delete"
                            onClick={() => setDeleteTarget(plot._id || null)}
                            aria-label={`Delete ${plot.title}`}
                            title="Delete"
                            id={`plot-delete-${plot._id}`}
                          >
                            <i className="fas fa-trash-can"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Add / Edit form drawer */}
      <PlotForm
        isOpen={formOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        initialData={editingPlot ?? undefined}
        isEditing={!!editingPlot}
      />

      {/* Delete confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete this listing?"
        description="This will permanently remove the plot from the MongoDB database. This action cannot be undone."
        confirmLabel={isDeleting ? "Deleting..." : "Yes, Delete"}
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => !isDeleting && setDeleteTarget(null)}
      />
    </>
  );
}
