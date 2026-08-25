"use client";
import React, { useState } from "react";
import { loginAdmin } from "../../lib/api";

export default function LoginPage() {
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
      // Redirect to dashboard upon successful login
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message || "Failed to log in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo">
          <div className="auth-logo-icon">
            <i className="fas fa-building"></i>
          </div>
          <div>
            <div className="auth-logo-name">Bhoomi</div>
            <div className="auth-logo-sub">Admin Portal</div>
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
