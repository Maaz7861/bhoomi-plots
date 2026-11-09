"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Topbar } from "../../components/Topbar";
import { ConfirmDialog } from "../../components/ConfirmDialog";
import { getCandidates, updateCandidateStatus, deleteCandidate, CandidateData, CandidateStatus } from "@/lib/api";

const STATUS_META: Record<CandidateStatus, { label: string; badge: string }> = {
  new: { label: "New", badge: "badge-gold" },
  shortlisted: { label: "Shortlisted", badge: "badge-green" },
  contacted: { label: "Contacted", badge: "badge-blue" },
  rejected: { label: "Not a fit", badge: "badge-slate" },
};

const FILTERS: { key: "all" | CandidateStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "shortlisted", label: "Shortlisted" },
  { key: "contacted", label: "Contacted" },
  { key: "rejected", label: "Not a fit" },
];

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

const PROFILE_WORD_LIMIT = 100;

/** Shows the first 100 words of a profile, with a See more / See less toggle for the rest. */
function ProfileCell({ text }: { text?: string }) {
  const [expanded, setExpanded] = useState(false);
  const profile = (text || "").trim();
  if (!profile) return <span style={{ color: "var(--text-muted)" }}>-</span>;

  const words = profile.split(/\s+/);
  const isLong = words.length > PROFILE_WORD_LIMIT;
  const shown = isLong && !expanded ? words.slice(0, PROFILE_WORD_LIMIT).join(" ") + "..." : profile;

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

/** Role + preferred location of a candidate, shown together in one cell. */
function RoleCell({ c }: { c: CandidateData }) {
  if (!c.role && !c.location) return <span style={{ color: "var(--text-muted)" }}>-</span>;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3px", fontSize: "0.8rem" }}>
      {c.role && <span style={{ fontWeight: 600, color: "var(--text-dark)" }}>{c.role}</span>}
      {c.location && (
        <span style={{ color: "var(--text-muted)" }}>
          <i className="fas fa-location-dot" style={{ fontSize: "0.65rem", marginRight: "5px" }}></i>{c.location}
        </span>
      )}
    </div>
  );
}

export default function TalentPoolPage() {
  const [candidates, setCandidates] = useState<CandidateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | CandidateStatus>("all");
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCandidates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setCandidates(await getCandidates());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load candidates.");
    } finally {
      setLoading(false);
    }
  }, []);

  // First load. `loading` already starts as true, so nothing is set synchronously here (Refresh uses fetchCandidates).
  useEffect(() => {
    let cancelled = false;
    getCandidates()
      .then((list) => { if (!cancelled) setCandidates(list); })
      .catch((err: unknown) => { if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load candidates."); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const counts = useMemo(() => ({
    all: candidates.length,
    new: candidates.filter((c) => c.status === "new").length,
    shortlisted: candidates.filter((c) => c.status === "shortlisted").length,
    contacted: candidates.filter((c) => c.status === "contacted").length,
    rejected: candidates.filter((c) => c.status === "rejected").length,
  }), [candidates]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return candidates.filter((c) => {
      if (filter !== "all" && c.status !== filter) return false;
      if (!q) return true;
      return [c.name, c.phone, c.email, c.role, c.location, c.profile].some((v) => (v || "").toLowerCase().includes(q));
    });
  }, [candidates, filter, search]);

  const handleStatusChange = async (id: string, status: CandidateStatus) => {
    try {
      const updated = await updateCandidateStatus(id, status);
      setCandidates((prev) => prev.map((c) => (c._id === id ? { ...c, status: updated.status } : c)));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to update status.");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      await deleteCandidate(deleteTarget);
      setCandidates((prev) => prev.filter((c) => c._id !== deleteTarget));
      setDeleteTarget(null);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to delete candidate.");
    } finally {
      setIsDeleting(false);
    }
  };

  const statusSelect = (c: CandidateData) => (
    <select
      value={c.status}
      onChange={(e) => handleStatusChange(c._id, e.target.value as CandidateStatus)}
      className="form-input"
      style={{ padding: "4px 8px", fontSize: "0.75rem", width: "auto", minWidth: "120px" }}
      aria-label="Change status"
      id={`candidate-status-${c._id}`}
    >
      {(Object.keys(STATUS_META) as CandidateStatus[]).map((s) => (
        <option key={s} value={s}>{STATUS_META[s].label}</option>
      ))}
    </select>
  );

  return (
    <>
      <Topbar title="Talent Pool" breadcrumb="Talent Pool" />
      <main className="admin-content">
        {/* Page header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-dark-strong)" }}>Talent Pool</h1>
            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "2px" }}>Candidate profiles submitted through the Careers page form</p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={fetchCandidates} id="talent-refresh-btn"><i className="fas fa-rotate"></i> Refresh</button>
        </div>

        {error && (
          <div style={{ background: "rgba(230, 57, 70, 0.12)", border: "1px solid rgba(230, 57, 70, 0.3)", borderRadius: "var(--radius-sm)", padding: "12px 16px", color: "#ef4444", fontSize: "0.85rem", marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><i className="fas fa-circle-exclamation"></i><span>{error}</span></div>
            <button className="btn btn-ghost btn-sm" onClick={fetchCandidates}>Retry</button>
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
                id={`talent-filter-${f.key}`}
              >
                {f.label} ({counts[f.key]})
              </button>
            ))}
          </div>
          <input
            type="search"
            className="form-input"
            placeholder="Search name, phone, role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: "280px" }}
            id="talent-search"
          />
        </div>

        {loading ? (
          <div style={{ padding: "60px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
            <div className="spinner" style={{ width: "32px", height: "32px", borderWidth: "3px", borderColor: "rgba(197,138,35,0.2)", borderTopColor: "var(--primary)" }}></div>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Loading candidates from database...</span>
          </div>
        ) : visible.length === 0 ? (
          <div className="admin-card">
            <div className="empty-state">
              <div className="empty-state-icon"><i className="fas fa-user-tie"></i></div>
              <div className="empty-state-title">{candidates.length === 0 ? "No candidates yet" : "No matching candidates"}</div>
              <div className="empty-state-desc">
                {candidates.length === 0
                  ? "When a visitor submits the Careers page form, the profile will show up here."
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
                  <tr><th>Received</th><th>Candidate</th><th>Contact</th><th>Role &amp; location</th><th>Profile</th><th>Status</th><th style={{ textAlign: "right" }}>Actions</th></tr>
                </thead>
                <tbody>
                  {visible.map((c) => (
                    <tr key={c._id} style={{ verticalAlign: "top" }}>
                      <td><span style={{ fontSize: "0.78rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{formatDateTime(c.createdAt)}</span></td>
                      <td><span className="table-title">{c.name}</span></td>
                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px", fontSize: "0.8rem" }}>
                          <a href={`tel:${c.phone}`} style={{ color: "var(--primary)", fontWeight: 600 }}><i className="fas fa-phone" style={{ fontSize: "0.65rem", marginRight: "5px" }}></i>{c.phone}</a>
                          {c.email && <a href={`mailto:${c.email}`} style={{ color: "var(--text-muted)" }}><i className="fas fa-envelope" style={{ fontSize: "0.65rem", marginRight: "5px" }}></i>{c.email}</a>}
                        </div>
                      </td>
                      <td><RoleCell c={c} /></td>
                      <td style={{ minWidth: "260px", maxWidth: "420px" }}><ProfileCell text={c.profile} /></td>
                      <td>{statusSelect(c)}</td>
                      <td>
                        <div style={{ display: "flex", gap: "6px", justifyContent: "flex-end" }}>
                          <button className="btn btn-icon btn-icon-delete" onClick={() => setDeleteTarget(c._id)} aria-label="Delete candidate" title="Delete" id={`candidate-delete-${c._id}`}><i className="fas fa-trash-can"></i></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 📱 Mobile Compact List View */}
            <div className="admin-cards-mobile">
              {visible.map((c) => (
                <div key={c._id} className="mobile-prop-card" style={{ padding: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-dark-strong)" }}>{c.name}</div>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "2px" }}>{formatDateTime(c.createdAt)}</div>
                    </div>
                    <span className={`badge ${STATUS_META[c.status].badge}`}>{STATUS_META[c.status].label}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "3px", fontSize: "0.8rem" }}>
                    <a href={`tel:${c.phone}`} style={{ color: "var(--primary)", fontWeight: 600 }}><i className="fas fa-phone" style={{ fontSize: "0.65rem", marginRight: "5px" }}></i>{c.phone}</a>
                    {c.email && <a href={`mailto:${c.email}`} style={{ color: "var(--text-muted)" }}><i className="fas fa-envelope" style={{ fontSize: "0.65rem", marginRight: "5px" }}></i>{c.email}</a>}
                  </div>
                  <RoleCell c={c} />
                  {c.profile && <ProfileCell text={c.profile} />}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "6px", borderTop: "1px solid var(--border-default)" }}>
                    {statusSelect(c)}
                    <button className="btn btn-icon btn-icon-delete" onClick={() => setDeleteTarget(c._id)} aria-label="Delete candidate" title="Delete"><i className="fas fa-trash-can"></i></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete this candidate?"
        description="This will permanently remove the candidate's profile from the database."
        confirmLabel={isDeleting ? "Deleting..." : "Yes, Delete"}
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => !isDeleting && setDeleteTarget(null)}
      />
    </>
  );
}
