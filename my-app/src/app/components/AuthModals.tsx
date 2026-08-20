import React from 'react';

export function AuthModals() {
  return (
    <div className="auth-backdrop fixed inset-0 flex items-center justify-center opacity-0 pointer-events-none z-[999] bg-[rgba(11,17,32,0.85)] backdrop-blur-[8px] transition-opacity duration-300 ease-out [&.active]:opacity-100 [&.active]:pointer-events-auto" id="authBackdrop">
      <div className="auth-modal relative w-[90%] max-w-[440px] rounded-[24px] hidden opacity-0 scale-95 bg-[var(--bg-dark)] border border-[rgba(0,194,255,0.15)] transition-all duration-300 ease-out [&.active]:block [&.active]:opacity-100 [&.active]:scale-100" style={{ padding: 'clamp(24px, 4vw, 40px)', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)' }} id="loginModal">
        <button className="auth-close absolute top-4 right-5 bg-transparent border-none text-[1.8rem] cursor-pointer text-[var(--text-muted-light)] transition-colors duration-200 hover:text-[var(--accent-strong)]" data-auth-close>&times;</button>
        <h2 className="font-bold mb-1 text-[1.6rem] text-[var(--text-inverted)]">Login</h2>
        <p className="auth-subtitle text-[0.88rem] mb-6 text-[var(--text-muted-light)]">Welcome back to Bhoomi Group</p>
        <form className="auth-form flex flex-col gap-4 [&_label]:flex [&_label]:flex-col [&_label]:text-[0.82rem] [&_label]:font-semibold [&_label]:tracking-wide [&_label]:uppercase [&_label]:gap-2 [&_label]:text-[var(--text-soft)]">
          <label>
            Email or Mobile
            <input type="text" placeholder="Enter email or mobile number" required className="w-full h-[46px] px-4 rounded-[10px] text-[0.95rem] outline-none normal-case tracking-normal bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] text-[var(--text-inverted)] transition-all duration-200 ease-out focus:border-[rgba(0,194,255,0.5)] focus:bg-[rgba(255,255,255,0.08)]" />
          </label>
          <label>
            Password
            <input type="password" placeholder="Enter your password" required className="w-full h-[46px] px-4 rounded-[10px] text-[0.95rem] outline-none normal-case tracking-normal bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] text-[var(--text-inverted)] transition-all duration-200 ease-out focus:border-[rgba(0,194,255,0.5)] focus:bg-[rgba(255,255,255,0.08)]" />
          </label>
          <div className="auth-row flex justify-between items-center mt-1">
            <label className="auth-checkbox !flex-row items-center gap-2 !normal-case !font-normal cursor-pointer">
              <input type="checkbox" className="w-4 h-4 cursor-pointer" />
              <span>Remember me</span>
            </label>
            <a href="#" className="auth-link text-[0.85rem] font-medium normal-case text-[var(--accent-cyan)] transition-colors duration-200 hover:text-[#fff]">Forgot password?</a>
          </div>
          <button type="submit" className="btn-primary auth-submit w-full h-12 rounded-[10px] text-base mt-3 inline-block px-5 py-[10px] font-semibold transition-all duration-300 bg-[var(--primary)] text-[var(--accent)] hover:bg-[var(--primary-hover)]">Login</button>
          <p className="auth-switch text-center text-[0.85rem] mt-4 text-[var(--text-muted-light)]">
            New to Bhoomi? <a href="#" id="switchToRegister" className="font-bold ml-1 text-[var(--accent-strong)] transition-colors duration-200 hover:text-[#fff]">Create an account</a>
          </p>
        </form>
      </div>

      <div className="auth-modal relative w-[90%] max-w-[440px] rounded-[24px] hidden opacity-0 scale-95 bg-[var(--bg-dark)] border border-[rgba(0,194,255,0.15)] transition-all duration-300 ease-out [&.active]:block [&.active]:opacity-100 [&.active]:scale-100" style={{ padding: 'clamp(24px, 4vw, 40px)', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)' }} id="registerModal">
        <button className="auth-close absolute top-4 right-5 bg-transparent border-none text-[1.8rem] cursor-pointer text-[var(--text-muted-light)] transition-colors duration-200 hover:text-[var(--accent-strong)]" data-auth-close>&times;</button>
        <h2 className="font-bold mb-1 text-[1.6rem] text-[var(--text-inverted)]">Create Account</h2>
        <p className="auth-subtitle text-[0.88rem] mb-6 text-[var(--text-muted-light)]">Get started with plots, land and properties</p>
        <form className="auth-form flex flex-col gap-4 [&_label]:flex [&_label]:flex-col [&_label]:text-[0.82rem] [&_label]:font-semibold [&_label]:tracking-wide [&_label]:uppercase [&_label]:gap-2 [&_label]:text-[var(--text-soft)]">
          <label>
            Full Name
            <input type="text" placeholder="Enter your full name" required className="w-full h-[46px] px-4 rounded-[10px] text-[0.95rem] outline-none normal-case tracking-normal bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] text-[var(--text-inverted)] transition-all duration-200 ease-out focus:border-[rgba(0,194,255,0.5)] focus:bg-[rgba(255,255,255,0.08)]" />
          </label>
          <label>
            Email
            <input type="email" placeholder="Enter your email" required className="w-full h-[46px] px-4 rounded-[10px] text-[0.95rem] outline-none normal-case tracking-normal bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] text-[var(--text-inverted)] transition-all duration-200 ease-out focus:border-[rgba(0,194,255,0.5)] focus:bg-[rgba(255,255,255,0.08)]" />
          </label>
          <label>
            Mobile Number
            <input type="tel" placeholder="Enter mobile number" required className="w-full h-[46px] px-4 rounded-[10px] text-[0.95rem] outline-none normal-case tracking-normal bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] text-[var(--text-inverted)] transition-all duration-200 ease-out focus:border-[rgba(0,194,255,0.5)] focus:bg-[rgba(255,255,255,0.08)]" />
          </label>
          <label>
            Password
            <input type="password" placeholder="Create a strong password" required className="w-full h-[46px] px-4 rounded-[10px] text-[0.95rem] outline-none normal-case tracking-normal bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] text-[var(--text-inverted)] transition-all duration-200 ease-out focus:border-[rgba(0,194,255,0.5)] focus:bg-[rgba(255,255,255,0.08)]" />
          </label>
          <button type="submit" className="btn-primary auth-submit w-full h-12 rounded-[10px] text-base mt-3 inline-block px-5 py-[10px] font-semibold transition-all duration-300 bg-[var(--primary)] text-[var(--accent)] hover:bg-[var(--primary-hover)]">Register</button>
          <p className="auth-switch text-center text-[0.85rem] mt-4 text-[var(--text-muted-light)]">
            Already have an account? <a href="#" id="switchToLogin" className="font-bold ml-1 text-[var(--accent-strong)] transition-colors duration-200 hover:text-[#fff]">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}
