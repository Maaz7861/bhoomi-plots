"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Backend registration will be wired here later
    window.location.href = "/login";
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

        <h1 className="auth-heading">Create account</h1>
        <p className="auth-sub">Set up your admin access to get started</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="auth-form-label" htmlFor="reg-name">
              Full name
            </label>
            <input
              id="reg-name"
              name="name"
              type="text"
              className="auth-form-input"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="auth-form-label" htmlFor="reg-email">
              Email address
            </label>
            <input
              id="reg-email"
              name="email"
              type="email"
              className="auth-form-input"
              placeholder="admin@bhoomigroup.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="auth-form-label" htmlFor="reg-password">
              Password
            </label>
            <div className="input-icon-wrap">
              <input
                id="reg-password"
                name="password"
                type={showPassword ? "text" : "password"}
                className="auth-form-input"
                placeholder="Min. 8 characters"
                value={form.password}
                onChange={handleChange}
                required
                minLength={8}
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

          {/* Confirm */}
          <div>
            <label className="auth-form-label" htmlFor="reg-confirm">
              Confirm password
            </label>
            <input
              id="reg-confirm"
              name="confirm"
              type="password"
              className="auth-form-input"
              placeholder="Re-enter your password"
              value={form.confirm}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-btn" id="register-submit-btn">
            <i className="fas fa-user-plus" style={{ marginRight: "7px" }}></i>
            Create Account
          </button>
        </form>

        <p className="auth-footer-text">
          Already have an account?{" "}
          <Link href="/login" className="auth-link">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
