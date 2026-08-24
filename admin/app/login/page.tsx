"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Backend auth will be wired here later
    // For now, redirect to dashboard
    window.location.href = "/dashboard";
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
              />
              <button
                type="button"
                className="input-icon-right"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>
          </div>

          <button type="submit" className="auth-btn" id="login-submit-btn">
            <i className="fas fa-arrow-right-to-bracket" style={{ marginRight: "7px" }}></i>
            Sign In
          </button>
        </form>

        <p className="auth-footer-text">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="auth-link">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
