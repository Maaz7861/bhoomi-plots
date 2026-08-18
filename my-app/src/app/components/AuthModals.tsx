import React from 'react';

export function AuthModals() {
  return (
    <>
{/*  Auth Modals  */}
    <div className="auth-backdrop" id="authBackdrop">
      <div className="auth-modal" id="loginModal">
        <button className="auth-close" data-auth-close>&times;</button>
        <h2>Login</h2>
        <p className="auth-subtitle">Welcome back to Bhoomi Plots and Land</p>
        <form className="auth-form">
          <label>
            Email or Mobile
            <input type="text" placeholder="Enter email or mobile number" required />
          </label>
          <label>
            Password
            <input type="password" placeholder="Enter your password" required />
          </label>
          <div className="auth-row">
            <label className="auth-checkbox">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="auth-link">Forgot password?</a>
          </div>
          <button type="submit" className="btn-primary auth-submit">Login</button>
          <p className="auth-switch">
            New to Bhoomi? <a href="#" id="switchToRegister">Create an account</a>
          </p>
        </form>
      </div>

      <div className="auth-modal" id="registerModal">
        <button className="auth-close" data-auth-close>&times;</button>
        <h2>Create Account</h2>
        <p className="auth-subtitle">Get started with plots, land and properties</p>
        <form className="auth-form">
          <label>
            Full Name
            <input type="text" placeholder="Enter your full name" required />
          </label>
          <label>
            Email
            <input type="email" placeholder="Enter your email" required />
          </label>
          <label>
            Mobile Number
            <input type="tel" placeholder="Enter mobile number" required />
          </label>
          <label>
            Password
            <input type="password" placeholder="Create a strong password" required />
          </label>
          <button type="submit" className="btn-primary auth-submit">Register</button>
          <p className="auth-switch">
            Already have an account? <a href="#" id="switchToLogin">Login</a>
          </p>
        </form>
      </div>
    </div>
    </>
  );
}
