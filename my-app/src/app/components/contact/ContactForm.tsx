"use client";

import React, { useState } from 'react';
import { submitInquiry } from '@/lib/api';

const inputClass =
  "w-full px-3 py-2 rounded-lg border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--primary)] transition-all bg-white text-[var(--text-dark)] text-[0.85rem]";
const labelClass = "text-[0.75rem] font-semibold text-[var(--text-stronger)]";

const emptyForm = { name: '', phone: '', email: '', interest: '', message: '', website: '' };

const MESSAGE_WORD_LIMIT = 200;

const countWords = (text: string) => (text.trim() ? text.trim().split(/\s+/).length : 0);

/** Cuts text off after the word limit (pasted text included), keeping its original spacing. */
const limitWords = (text: string) => {
  const words = Array.from(text.matchAll(/\S+/g));
  if (words.length <= MESSAGE_WORD_LIMIT) return text;
  const last = words[MESSAGE_WORD_LIMIT - 1];
  return text.slice(0, (last.index ?? 0) + last[0].length);
};

export function ContactForm() {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const setField = (field: keyof typeof emptyForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = field === 'message' ? limitWords(e.target.value) : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setStatus(null);
    setSubmitting(true);
    try {
      await submitInquiry(form);
      setForm(emptyForm);
      setStatus({ type: 'success', text: 'Thank you! Your enquiry has been received. Our team will contact you shortly.' });
    } catch (err) {
      setStatus({ type: 'error', text: err instanceof Error ? err.message : 'Something went wrong. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-1.5 text-[var(--text-dark-strong)] tracking-tight">Write to us</h3>
      <p className="text-[var(--text-body-muted)] mb-4 text-[0.8rem]">
        Share a few basic details and our team will get back to you shortly.
      </p>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="inq-name" className={labelClass}>Full Name</label>
            <input
              id="inq-name"
              name="name"
              type="text"
              required
              maxLength={100}
              placeholder="Enter your name"
              value={form.name}
              onChange={setField('name')}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="inq-phone" className={labelClass}>Mobile Number</label>
            <input
              id="inq-phone"
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="inq-email" className={labelClass}>Email</label>
            <input
              id="inq-email"
              name="email"
              type="email"
              maxLength={150}
              placeholder="name@email.com"
              value={form.email}
              onChange={setField('email')}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="inq-interest" className={labelClass}>Looking for</label>
            <input
              id="inq-interest"
              name="interest"
              type="text"
              maxLength={150}
              placeholder="Plots, residential..."
              value={form.interest}
              onChange={setField('interest')}
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="inq-message" className={labelClass}>Message</label>
          <textarea
            id="inq-message"
            name="message"
            rows={2}
            maxLength={2000}
            placeholder="Tell us briefly what you are looking for"
            value={form.message}
            onChange={setField('message')}
            className={`${inputClass} resize-none`}
          ></textarea>
          <span className="self-end text-[0.7rem] text-[var(--text-body-muted)]">
            {countWords(form.message)} / {MESSAGE_WORD_LIMIT} words
          </span>
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
            className={`text-[0.8rem] rounded-lg px-3 py-2 border ${
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
          className="mt-1 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold py-2 px-5 rounded-lg transition-all shadow hover:-translate-y-px w-full sm:w-auto self-start flex items-center justify-center gap-2 text-[0.85rem] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span>{submitting ? 'Sending...' : 'Submit Enquiry'}</span>
          <i className={`fas ${submitting ? 'fa-spinner fa-spin' : 'fa-paper-plane'} text-[0.75rem]`}></i>
        </button>
      </form>
    </div>
  );
}
