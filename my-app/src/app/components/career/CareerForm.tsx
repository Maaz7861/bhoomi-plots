"use client";

import React, { useState } from 'react';
import { submitCandidate } from '@/lib/api';

const inputClass =
  "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cfa861]/50 focus:border-[#cfa861] transition-all text-sm font-medium text-slate-700 placeholder:text-slate-400";
const labelClass = "text-xs font-bold text-slate-700 ml-1";

const emptyForm = { name: '', email: '', phone: '', location: '', role: '', profile: '', website: '' };

const PROFILE_WORD_LIMIT = 200;

const countWords = (text: string) => (text.trim() ? text.trim().split(/\s+/).length : 0);

/** Cuts text off after the word limit (pasted text included), keeping its original spacing. */
const limitWords = (text: string) => {
  const words = Array.from(text.matchAll(/\S+/g));
  if (words.length <= PROFILE_WORD_LIMIT) return text;
  const last = words[PROFILE_WORD_LIMIT - 1];
  return text.slice(0, (last.index ?? 0) + last[0].length);
};

export function CareerForm() {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const setField = (field: keyof typeof emptyForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = field === 'profile' ? limitWords(e.target.value) : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setStatus(null);
    setSubmitting(true);
    try {
      await submitCandidate(form);
      setForm(emptyForm);
      setStatus({ type: 'success', text: 'Thank you! Your profile has been received. We will get in touch when a matching opportunity opens up.' });
    } catch (err) {
      setStatus({ type: 'error', text: err instanceof Error ? err.message : 'Something went wrong. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="careerForm" className="px-[5%] md:px-[8%] py-12 md:py-16 bg-slate-50 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#cfa861]/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-[700px] mx-auto relative z-10 bg-white p-6 md:p-10 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
            Didn’t find a suitable role?
          </h2>
          <p className="text-base text-slate-500 font-medium max-w-[500px] mx-auto">
            Share your details and we’ll get in touch when a matching opportunity opens up.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="career-name" className={labelClass}>Full Name</label>
              <input
                id="career-name"
                name="name"
                type="text"
                required
                maxLength={100}
                placeholder="Enter your full name"
                value={form.name}
                onChange={setField('name')}
                className={inputClass}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="career-email" className={labelClass}>Email</label>
              <input
                id="career-email"
                name="email"
                type="email"
                maxLength={150}
                placeholder="name@email.com"
                value={form.email}
                onChange={setField('email')}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="career-phone" className={labelClass}>Mobile Number</label>
              <input
                id="career-phone"
                name="phone"
                type="tel"
                required
                maxLength={20}
                placeholder="+91-"
                value={form.phone}
                onChange={setField('phone')}
                className={inputClass}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="career-location" className={labelClass}>Preferred Location</label>
              <input
                id="career-location"
                name="location"
                type="text"
                maxLength={100}
                placeholder="Pune / Nashik / Mumbai etc."
                value={form.location}
                onChange={setField('location')}
                className={inputClass}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="career-role" className={labelClass}>Role you’re interested in</label>
            <input
              id="career-role"
              name="role"
              type="text"
              maxLength={150}
              placeholder="Eg. Sales Executive, Marketing"
              value={form.role}
              onChange={setField('role')}
              className={inputClass}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="career-profile" className={labelClass}>Short profile / experience</label>
            <textarea
              id="career-profile"
              name="profile"
              rows={4}
              maxLength={2000}
              placeholder="Tell us briefly about your background"
              value={form.profile}
              onChange={setField('profile')}
              className={`${inputClass} resize-none`}
            ></textarea>
            <div className="text-right text-xs text-slate-400">
              {countWords(form.profile)} / {PROFILE_WORD_LIMIT} words
            </div>
          </div>

          {/* Honeypot: hidden from real users, bots tend to fill it */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={form.website}
            onChange={setField('website')}
            style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
          />

          {status && (
            <div
              role="status"
              className={`text-sm rounded-lg px-4 py-3 border ${
                status.type === 'success'
                  ? 'bg-green-50 border-green-200 text-green-800'
                  : 'bg-red-50 border-red-200 text-red-700'
              }`}
            >
              {status.text}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-[#cfa861] hover:bg-amber-600 text-white rounded-lg font-bold text-base transition-colors duration-300 shadow-md shadow-[#cfa861]/30 hover:shadow-[#cfa861]/50 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting...' : 'Submit Profile'}
          </button>
        </form>
      </div>
    </section>
  );
}
