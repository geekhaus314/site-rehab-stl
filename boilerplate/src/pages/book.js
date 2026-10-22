/**
 * book.js — Booking inquiry page.
 * Client-side form that posts to /api/booking. Service list comes from profile.
 */
import { useState } from 'react';
import Head from 'next/head';
import Page from '../components/Page.module.css';

export default function Book({ profile }) {
  const { name, domain, contact } = profile;
  const siteUrl = `https://${domain}`;
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setSending(true);

    const formData = new FormData(e.target);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      service: formData.get('service'),
      message: formData.get('message'),
      type: 'booking',
    };

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (res.ok) {
        setStatus({ kind: 'success', message: json.message || 'Booking request sent.' });
        e.target.reset();
      } else {
        setStatus({ kind: 'error', message: json.message || 'Failed to send booking request.' });
      }
    } catch {
      setStatus({ kind: 'error', message: 'Network error. Please try again.' });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Head>
        <title>Book with {name} | {name}</title>
        <meta name="description" content={`Book a session with ${name}. ${contact.address}`} />
        <link rel="canonical" href={`${siteUrl}/book`} />
      </Head>

      <main className={Page.page} id="book">
        <section className="section" aria-labelledby="book-heading">
          <div className="container">
            <div className="sectionHead">
              <span className="eyebrow">Book a session</span>
              <h2 id="book-heading" className="heading">Schedule your consultation</h2>
              <p className="lede">
                Select the service that fits your situation and we will follow
                up to confirm a time that works for you.
              </p>
            </div>

            <div className="max-w-2xl mt-10">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold mb-1 uppercase tracking-wider text-[var(--theme-accent)]">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-text)] focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1 uppercase tracking-wider text-[var(--theme-accent)]">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-text)] focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1 uppercase tracking-wider text-[var(--theme-accent)]">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-text)] focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]"
                    placeholder="(555) 000-0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1 uppercase tracking-wider text-[var(--theme-accent)]">
                    Service
                  </label>
                  <select
                    name="service"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-text)] focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]"
                  >
                    <option value="">Select a service</option>
                    {profile.content.services.map((s) => (
                      <option key={s.title} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1 uppercase tracking-wider text-[var(--theme-accent)]">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-text)] focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]"
                    placeholder="Anything we should know ahead of time?"
                  />
                </div>
                <button type="submit" disabled={sending} className="w-full btn">
                  {sending ? 'Sending…' : 'Request booking'}
                </button>
              </form>

              {status && (
                <div className={`mt-5 p-5 rounded-lg border ${
                  status.kind === 'success'
                    ? 'border-[var(--theme-accent)] bg-[var(--theme-accent)]/10 text-[var(--theme-accent)]'
                    : 'border-red-500/30 bg-red-500/10 text-red-400'
                }`}>
                  {status.message}
                </div>
              )}

              <div className="mt-10 card">
                <h3 className="text-2xl mb-2">Location</h3>
                <p className="muted">{contact.address}</p>
                <p className="muted mt-2">
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </p>
                <p className="muted mt-2">
                  <a href={`tel:${contact.phone.replace(/\D/g, '')}`}>{contact.phone}</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
