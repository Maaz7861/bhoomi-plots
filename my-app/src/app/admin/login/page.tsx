"use client";
import React, { useState } from "react";
import { loginAdmin } from "@/lib/api";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await loginAdmin(email.trim(), password);
      // Redirect to admin dashboard upon successful login
      window.location.href = "/admin/dashboard";
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to log in. Please check your credentials.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "6px", marginBottom: "22px" }}>
          <img
            src="/assets/images/bhoomi-logo-white-1-1536x526.png"
            alt="Bhoomi Group"
            style={{ height: "46px", width: "auto", objectFit: "contain" }}
          />
          <div className="auth-logo-sub" style={{ letterSpacing: "0.12em", fontWeight: 700, color: "var(--accent-strong)", fontSize: "0.72rem" }}>
            ADMIN PORTAL
          </div>
        </div>

        <h1 className="auth-heading">Welcome back</h1>
        <p className="auth-sub">Sign in to manage your properties &amp; banners</p>

        {error && (
          <div
            style={{
              background: "rgba(230, 57, 70, 0.15)",
              border: "1px solid rgba(230, 57, 70, 0.4)",
              borderRadius: "var(--radius-sm)",
              padding: "10px 14px",
              color: "#fca5a5",
              fontSize: "0.85rem",
              marginBottom: "18px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <i className="fas fa-circle-exclamation" style={{ color: "#ef4444" }}></i>
            <span>{error}</span>
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="auth-form-label" htmlFor="admin-email">
              Email address
            </label>
            <input
              id="admin-email"
              type="email"
              className="auth-form-input"
              placeholder="admin@bhoomigroup.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div>
            <label className="auth-form-label" htmlFor="admin-password">
              Password
            </label>
            <div className="input-icon-wrap">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                className="auth-form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                disabled={loading}
              />
              <button
                type="button"
                className="input-icon-right"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={loading}
              >
                <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>
          </div>

          <button type="submit" className="auth-btn" id="login-submit-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner" style={{ marginRight: "8px" }}></span>
                Signing In...
              </>
            ) : (
              <>
                <i className="fas fa-arrow-right-to-bracket" style={{ marginRight: "7px" }}></i>
                Sign In
              </>
            )}
          </button>
        </form>

        <p className="auth-footer-text">
          Default Admin: <code style={{ color: "var(--accent-strong)" }}>admin@bhoomigroup.com</code>
        </p>
      </div>
    </div>
  );
}
