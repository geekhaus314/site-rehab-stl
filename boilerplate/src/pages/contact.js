/**
 * contact.js — Contact page with a client-side form that posts to /api/contact.
 * All contact details come from the business profile.
 */
import { useState } from 'react';
import Head from 'next/head';
import Page from '../components/Page.module.css';

export default function Contact({ profile }) {
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
      type: formData.get('type'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (res.ok) {
        setStatus({ kind: 'success', message: json.message || 'Message sent successfully.' });
        e.target.reset();
      } else {
        setStatus({ kind: 'error', message: json.message || 'Failed to send message.' });
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
        <title>Contact {name} | {name}</title>
        <meta name="description" content={`Get in touch with ${name}. ${contact.address}`} />
        <link rel="canonical" href={`${siteUrl}/contact`} />
      </Head>

      <main className={Page.page} id="contact">
        <section className="section" aria-labelledby="contact-heading">
          <div className="container">
            <div className="sectionHead">
              <span className="eyebrow">Get in touch</span>
              <h2 id="contact-heading" className="heading">Send us a message</h2>
              <p className="lede">
                Tell us what is taking up your time. We will come back with a
                practical next step and a clear scope before any work begins.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
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
                    className="w-full px-4 py-3 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-text)] focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]"
                    placeholder="(555) 000-0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1 uppercase tracking-wider text-[var(--theme-accent)]">
                    Service interest
                  </label>
                  <select
                    name="service"
                    className="w-full px-4 py-3 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-text)] focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]"
                  >
                    <option value="">General inquiry</option>
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
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-text)] focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]"
                    placeholder="What do you need help with?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full btn"
                >
                  {sending ? 'Sending…' : 'Send message'}
                </button>
              </form>

              {status && (
                <div className={`p-5 rounded-lg border ${
                  status.kind === 'success'
                    ? 'border-[var(--theme-accent)] bg-[var(--theme-accent)]/10 text-[var(--theme-accent)]'
                    : 'border-red-500/30 bg-red-500/10 text-red-400'
                }`}>
                  {status.message}
                </div>
              )}

              <div className="card space-y-4">
                <h3 className="text-2xl mb-2">Contact {name.split(' ')[0]}</h3>
                <p className="muted">{contact.address}</p>
                <p className="muted">
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </p>
                <p className="muted">
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
