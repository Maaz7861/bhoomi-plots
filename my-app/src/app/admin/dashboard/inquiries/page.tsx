"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Topbar } from "../../components/Topbar";
import { ConfirmDialog } from "../../components/ConfirmDialog";
import { getInquiries, updateInquiryStatus, deleteInquiry, InquiryData, InquiryStatus } from "@/lib/api";

const STATUS_META: Record<InquiryStatus, { label: string; badge: string }> = {
  new: { label: "New", badge: "badge-gold" },
  contacted: { label: "Contacted", badge: "badge-blue" },
  closed: { label: "Closed", badge: "badge-slate" },
};

const FILTERS: { key: "all" | InquiryStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "contacted", label: "Contacted" },
  { key: "closed", label: "Closed" },
];

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

const MESSAGE_WORD_LIMIT = 100;

/** Shows the first 100 words of a message, with a See more / See less toggle for the rest. */
function MessageCell({ text }: { text?: string }) {
  const [expanded, setExpanded] = useState(false);
  const message = (text || "").trim();
  if (!message) return <span style={{ color: "var(--text-muted)" }}>-</span>;

  const words = message.split(/\s+/);
  const isLong = words.length > MESSAGE_WORD_LIMIT;
  const shown = isLong && !expanded ? words.slice(0, MESSAGE_WORD_LIMIT).join(" ") + "..." : message;

  return (
    <div style={{ fontSize: "0.8rem", color: "var(--text-dark)", whiteSpace: "pre-wrap", wordBreak: "break-word", lineHeight: 1.5 }}>
      {shown}
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          style={{ marginLeft: "6px", background: "none", border: "none", padding: 0, cursor: "pointer", color: "var(--primary)", fontWeight: 700, fontSize: "0.78rem" }}
        >
          {expanded ? "See less" : "See more"}
        </button>
      )}
    </div>
  );
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | InquiryStatus>("all");
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchInquiries = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setInquiries(await getInquiries());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load inquiries.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchInquiries(); }, [fetchInquiries]);

  const counts = useMemo(() => ({
    all: inquiries.length,
    new: inquiries.filter((i) => i.status === "new").length,
    contacted: inquiries.filter((i) => i.status === "contacted").length,
    closed: inquiries.filter((i) => i.status === "closed").length,
  }), [inquiries]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return inquiries.filter((i) => {
      if (filter !== "all" && i.status !== filter) return false;
      if (!q) return true;
      return [i.name, i.phone, i.email, i.interest, i.message].some((v) => (v || "").toLowerCase().includes(q));
    });
  }, [inquiries, filter, search]);

  const handleStatusChange = async (id: string, status: InquiryStatus) => {
    try {
      const updated = await updateInquiryStatus(id, status);
      setInquiries((prev) => prev.map((i) => (i._id === id ? { ...i, status: updated.status } : i)));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to update status.");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      await deleteInquiry(deleteTarget);
      setInquiries((prev) => prev.filter((i) => i._id !== deleteTarget));
      setDeleteTarget(null);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to delete inquiry.");
    } finally {
      setIsDeleting(false);
    }
  };

  const statusSelect = (i: InquiryData) => (
    <select
      value={i.status}
      onChange={(e) => handleStatusChange(i._id, e.target.value as InquiryStatus)}
      className="form-input"
      style={{ padding: "4px 8px", fontSize: "0.75rem", width: "auto", minWidth: "110px" }}
      aria-label="Change status"
      id={`inquiry-status-${i._id}`}
    >
      {(Object.keys(STATUS_META) as InquiryStatus[]).map((s) => (
        <option key={s} value={s}>{STATUS_META[s].label}</option>
      ))}
    </select>
  );

  return (
    <>
      <Topbar title="Inquiries" breadcrumb="Inquiries" />
      <main className="admin-content">
        {/* Page header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-dark-strong)" }}>Inquiries</h1>
            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "2px" }}>Enquiries submitted through the Contact page form</p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={fetchInquiries} id="inquiries-refresh-btn"><i className="fas fa-rotate"></i> Refresh</button>
        </div>

        {error && (
          <div style={{ background: "rgba(230, 57, 70, 0.12)", border: "1px solid rgba(230, 57, 70, 0.3)", borderRadius: "var(--radius-sm)", padding: "12px 16px", color: "#ef4444", fontSize: "0.85rem", marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><i className="fas fa-circle-exclamation"></i><span>{error}</span></div>
            <button className="btn btn-ghost btn-sm" onClick={fetchInquiries}>Retry</button>
          </div>
        )}

        {/* Filters + search */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                className={`btn btn-sm ${filter === f.key ? "btn-primary" : "btn-ghost"}`}
                onClick={() => setFilter(f.key)}
                id={`inquiries-filter-${f.key}`}
              >
                {f.label} ({counts[f.key]})
              </button>
            ))}
          </div>
          <input
            type="search"
            className="form-input"
            placeholder="Search name, phone, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: "280px" }}
            id="inquiries-search"
          />
        </div>

        {loading ? (
          <div style={{ padding: "60px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
            <div className="spinner" style={{ width: "32px", height: "32px", borderWidth: "3px", borderColor: "rgba(197,138,35,0.2)", borderTopColor: "var(--primary)" }}></div>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Loading inquiries from database...</span>
          </div>
        ) : visible.length === 0 ? (
          <div className="admin-card">
            <div className="empty-state">
              <div className="empty-state-icon"><i className="fas fa-inbox"></i></div>
              <div className="empty-state-title">{inquiries.length === 0 ? "No inquiries yet" : "No matching inquiries"}</div>
              <div className="empty-state-desc">
                {inquiries.length === 0
                  ? "When a visitor submits the Contact page form, it will show up here."
                  : "Try a different filter or search term."}
              </div>
            </div>
          </div>
        ) : (
          <div className="admin-card">
            {/* 🖥️ Desktop Table View */}
            <div className="admin-table-desktop admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>Received</th><th>Name</th><th>Contact</th><th>Looking for</th><th>Message</th><th>Status</th><th style={{ textAlign: "right" }}>Actions</th></tr>
                </thead>
                <tbody>
                  {visible.map((i) => (
                      <tr key={i._id} style={{ verticalAlign: "top" }}>
                        <td><span style={{ fontSize: "0.78rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{formatDateTime(i.createdAt)}</span></td>
                        <td><span className="table-title">{i.name}</span></td>
                        <td>
                          <div style={{ display: "flex", flexDirection: "column", gap: "2px", fontSize: "0.8rem" }}>
                            <a href={`tel:${i.phone}`} style={{ color: "var(--primary)", fontWeight: 600 }}><i className="fas fa-phone" style={{ fontSize: "0.65rem", marginRight: "5px" }}></i>{i.phone}</a>
                            {i.email && <a href={`mailto:${i.email}`} style={{ color: "var(--text-muted)" }}><i className="fas fa-envelope" style={{ fontSize: "0.65rem", marginRight: "5px" }}></i>{i.email}</a>}
                          </div>
                        </td>
                        <td><span style={{ fontSize: "0.8rem" }}>{i.interest || "-"}</span></td>
                        <td style={{ minWidth: "260px", maxWidth: "420px" }}><MessageCell text={i.message} /></td>
                        <td>{statusSelect(i)}</td>
                        <td>
                          <div style={{ display: "flex", gap: "6px", justifyContent: "flex-end" }}>
                            <button className="btn btn-icon btn-icon-delete" onClick={() => setDeleteTarget(i._id)} aria-label="Delete inquiry" title="Delete" id={`inquiry-delete-${i._id}`}><i className="fas fa-trash-can"></i></button>
                          </div>
                        </td>
                      </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 📱 Mobile Compact List View */}
            <div className="admin-cards-mobile">
              {visible.map((i) => (
                <div key={i._id} className="mobile-prop-card" style={{ padding: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-dark-strong)" }}>{i.name}</div>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "2px" }}>{formatDateTime(i.createdAt)}</div>
                    </div>
                    <span className={`badge ${STATUS_META[i.status].badge}`}>{STATUS_META[i.status].label}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "3px", fontSize: "0.8rem" }}>
                    <a href={`tel:${i.phone}`} style={{ color: "var(--primary)", fontWeight: 600 }}><i className="fas fa-phone" style={{ fontSize: "0.65rem", marginRight: "5px" }}></i>{i.phone}</a>
                    {i.email && <a href={`mailto:${i.email}`} style={{ color: "var(--text-muted)" }}><i className="fas fa-envelope" style={{ fontSize: "0.65rem", marginRight: "5px" }}></i>{i.email}</a>}
                    {i.interest && <span style={{ color: "var(--text-muted)" }}><i className="fas fa-tag" style={{ fontSize: "0.65rem", marginRight: "5px" }}></i>{i.interest}</span>}
                  </div>
                  {i.message && <MessageCell text={i.message} />}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "6px", borderTop: "1px solid var(--border-default)" }}>
                    {statusSelect(i)}
                    <button className="btn btn-icon btn-icon-delete" onClick={() => setDeleteTarget(i._id)} aria-label="Delete inquiry" title="Delete"><i className="fas fa-trash-can"></i></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete this inquiry?"
        description="This will permanently remove the inquiry from the database."
        confirmLabel={isDeleting ? "Deleting..." : "Yes, Delete"}
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => !isDeleting && setDeleteTarget(null)}
      />
    </>
  );
}
