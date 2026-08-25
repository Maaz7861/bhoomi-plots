"use client";
import React, { useState, useEffect } from "react";
import { Topbar } from "../../components/Topbar";
import { getAdminUser } from "@/lib/api";

export default function SettingsPage() {
  const [adminUser, setAdminUser] = useState<{ name: string; email: string; role: string } | null>(null);

  useEffect(() => {
    setAdminUser(getAdminUser());
  }, []);

  return (
    <>
      <Topbar title="Settings" breadcrumb="System Settings" />
      <main className="admin-content">
        <div style={{ maxWidth: "800px" }}>
          {/* Page Title */}
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-dark-strong)" }}>
              Account &amp; System Settings
            </h1>
            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "2px" }}>
              Manage your administrator credentials and view server integration status
            </p>
          </div>

          {/* Admin Profile Card */}
          <div className="admin-card" style={{ marginBottom: "20px" }}>
            <div className="admin-card-header">
              <div>
                <div className="admin-card-title">Administrator Profile</div>
                <div className="admin-card-subtitle">Active administrator details</div>
              </div>
              <span className="badge badge-green">Authenticated</span>
            </div>
            <div className="admin-card-body" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div className="form-grid-2">
                <div>
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={adminUser?.name || "Bhoomi Admin"}
                    disabled
                    style={{ background: "var(--bg-light)" }}
                  />
                </div>
                <div>
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    value={adminUser?.email || "admin@bhoomigroup.com"}
                    disabled
                    style={{ background: "var(--bg-light)" }}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Account Role</label>
                <input
                  type="text"
                  className="form-input"
                  value={adminUser?.role?.toUpperCase() || "SUPER ADMIN"}
                  disabled
                  style={{ background: "var(--bg-light)", width: "240px" }}
                />
              </div>
            </div>
          </div>

          {/* Infrastructure & Storage Card */}
          <div className="admin-card">
            <div className="admin-card-header">
              <div>
                <div className="admin-card-title">Infrastructure Integrations</div>
                <div className="admin-card-subtitle">Database and media storage configurations</div>
              </div>
            </div>
            <div className="admin-card-body" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "var(--bg-light)", borderRadius: "var(--radius-sm)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <i className="fas fa-database" style={{ color: "#16a34a", fontSize: "1.2rem" }}></i>
                  <div>
                    <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-dark-strong)" }}>MongoDB Atlas Database</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Cluster connection active (database: <code>bhoomiplots</code>)</div>
                  </div>
                </div>
                <span className="badge badge-green">Connected</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "var(--bg-light)", borderRadius: "var(--radius-sm)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <i className="fas fa-cloud" style={{ color: "var(--primary)", fontSize: "1.2rem" }}></i>
                  <div>
                    <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-dark-strong)" }}>Cloudinary CDN Storage</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Media asset uploads active (folder: <code>bhoomi_plots</code>)</div>
                  </div>
                </div>
                <span className="badge badge-green">Active</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "var(--bg-light)", borderRadius: "var(--radius-sm)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <i className="fas fa-cubes" style={{ color: "#6366f1", fontSize: "1.2rem" }}></i>
                  <div>
                    <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-dark-strong)" }}>Deployment Mode</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Unified Single-Pod Next.js (Zero CORS architecture)</div>
                  </div>
                </div>
                <span className="badge badge-gold">Single Pod</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
