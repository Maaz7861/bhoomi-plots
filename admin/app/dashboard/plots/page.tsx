"use client";
import React, { useState } from "react";
import { Topbar } from "../../components/Topbar";
import { PlotForm, PlotFormData } from "../../components/PlotForm";
import { ConfirmDialog } from "../../components/ConfirmDialog";

// Mock data — will come from API later
const MOCK_PLOTS = [
  {
    id: "p1",
    title: "Lakeview Township",
    category: "plots" as const,
    price: "₹ 45 Lakh",
    location: "Near Hinjewadi, Pune",
    status: "Fast Selling",
    developer: "Bhoomi Projects",
    reraNumber: "P52100012345",
    isFeatured: true,
    imageUrl: "/projects/plot.jpg",
    description: "Plotted development with central park, lake promenade and clubhouse.",
    features: "1200 sq.ft • 3000 sq.ft • Lake Front",
  },
  {
    id: "p2",
    title: "Expressway Enclave",
    category: "plots" as const,
    price: "₹ 60 Lakh",
    location: "Pune–Mumbai Expressway",
    status: "Limited Inventory",
    developer: "Bhoomi Projects",
    reraNumber: "P52100067890",
    isFeatured: false,
    imageUrl: "/projects/plot.jpg",
    description: "Road-touch plots just off the expressway.",
    features: "2000 sq.ft • 5000 sq.ft • Highway Touch",
  },
  {
    id: "l1",
    title: "Bhoomi Hills",
    category: "land" as const,
    price: "₹ 2.5 Cr",
    location: "Nashik Road, Nashik",
    status: "High Appreciation",
    developer: "Bhoomi Projects",
    reraNumber: "P51600022334",
    isFeatured: true,
    imageUrl: "/projects/land.jpg",
    description: "Scenic NA land parcels overlooking hills.",
    features: "NA Land • Clear Title • Hill View",
  },
  {
    id: "r1",
    title: "Premium Bungalow",
    category: "residential" as const,
    price: "₹ 1.27 Cr",
    location: "500 MG Road, Camp, Pune",
    status: "RERA Approved",
    developer: "Bhoomi Prime",
    reraNumber: "P52100088990",
    isFeatured: true,
    imageUrl: "/projects/residential.jpg",
    description: "Premium 3 BHK bungalow with private sit-out.",
    features: "3 Bds • 3 Ba • 1,250 sqft",
  },
  {
    id: "c1",
    title: "Horizon IT Park",
    category: "commercial" as const,
    price: "₹ 3.5 Cr",
    location: "Baner, Pune",
    status: "Under Construction",
    developer: "Bhoomi Commercials",
    reraNumber: "P52100033445",
    isFeatured: true,
    imageUrl: "/projects/commercial.jpg",
    description: "Premium office spaces for IT and multinational companies.",
    features: "Grade A • Office Spaces • Food Court",
  },
];

type Category = "all" | "plots" | "land" | "residential" | "commercial";

const CATEGORY_CHIP: Record<string, string> = {
  plots: "chip chip-plots",
  land: "chip chip-land",
  residential: "chip chip-residential",
  commercial: "chip chip-commercial",
};

export default function PlotsPage() {
  const [plots, setPlots] = useState(MOCK_PLOTS);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<Category>("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingPlot, setEditingPlot] = useState<(typeof MOCK_PLOTS)[0] | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const filtered = plots.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "all" || p.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const handleDelete = () => {
    if (!deleteTarget) return;
    setPlots((prev) => prev.filter((p) => p.id !== deleteTarget));
    setDeleteTarget(null);
  };

  const handleEdit = (plot: (typeof MOCK_PLOTS)[0]) => {
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
              {plots.length} total listings across 4 categories
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
                Showing {filtered.length} of {plots.length} entries
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
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
              <button className="btn btn-primary btn-sm" onClick={() => setFormOpen(true)} id="plots-empty-add-btn">
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
                    <tr key={plot.id}>
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
                            id={`plot-edit-${plot.id}`}
                          >
                            <i className="fas fa-pen-to-square"></i>
                          </button>
                          <button
                            className="btn btn-icon btn-icon-delete"
                            onClick={() => setDeleteTarget(plot.id)}
                            aria-label={`Delete ${plot.title}`}
                            title="Delete"
                            id={`plot-delete-${plot.id}`}
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
        initialData={editingPlot ?? undefined}
        isEditing={!!editingPlot}
      />

      {/* Delete confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete this listing?"
        description="This will permanently remove the plot from the database. This action cannot be undone."
        confirmLabel="Yes, Delete"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}
