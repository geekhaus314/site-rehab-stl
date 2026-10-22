/**
 * admin.js — Password-gated admin dashboard.
 * Reads inbox data from /api/admin/inquiries, replies via /api/admin/reply.
 * Auth uses HMAC tokens from src/lib/security.js.
 */
import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { createAdminToken, verifyAdminToken } from '../lib/security';

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(() => !!sessionStorage.getItem('admin_token'));
  const [token, setToken] = useState(() => sessionStorage.getItem('admin_token') || '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [replying, setReplying] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState('');

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem('admin_token');
    setToken('');
    setLoggedIn(false);
    setData(null);
    setPassword('');
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/inquiries', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (res.ok) {
        setData(json);
      } else {
        setError('Session expired');
        handleLogout();
      }
    } catch {
      setError('Failed to load data');
    }
    setLoading(false);
  }, [token, handleLogout]);

  useEffect(() => {
    if (loggedIn) {
      fetchData();
    }
  }, [loggedIn, fetchData]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (res.ok && json.token) {
        sessionStorage.setItem('admin_token', json.token);
        setToken(json.token);
        setLoggedIn(true);
      } else {
        setError(json.message || 'Invalid password');
      }
    } catch {
      setError('Login failed');
    }
    setLoading(false);
  };

  const openReply = (msg) => {
    setReplying(msg);
    setReplyText('');
    setSent('');
  };

  const sendReply = async () => {
    if (!replyText.trim()) return;
    setSending(true);
    setSent('');
    try {
      const res = await fetch('/api/admin/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ messageId: replying.id, to: replying.email, subject: replying.subject, replyText }),
      });
      const json = await res.json();
      if (res.ok) {
        setSent('Reply sent');
        setReplyText('');
        setTimeout(() => { setReplying(null); setSent(''); }, 1500);
      } else {
        setSent(json.message || 'Failed');
      }
    } catch {
      setSent('Network error');
    }
    setSending(false);
  };

  const formatDate = (d) => {
    const dt = new Date(d);
    return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (!loggedIn) {
    return (
      <>
        <Head>
          <title>Admin Login</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--theme-background)' }}>
          <div className="w-full max-w-sm p-8 rounded-xl border" style={{ backgroundColor: 'var(--theme-surface)', borderColor: 'var(--theme-border)' }}>
            <h1 className="text-2xl font-serif mb-6 text-center text-[var(--theme-text)]">Admin</h1>
            <form onSubmit={handleLogin}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg text-sm font-sans border mb-4 focus:outline-none"
                style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderColor: 'var(--theme-border)', color: 'var(--theme-text)' }}
                autoFocus
              />
              {error && <p className="text-xs font-sans mb-3" style={{ color: 'rgba(200,80,80,0.9)' }}>{error}</p>}
              <button type="submit" disabled={loading} className="w-full btn">
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="min-h-screen" style={{ backgroundColor: 'var(--theme-background)' }}>
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-2xl font-serif text-[var(--theme-text)]">Inbox</h1>
            <div className="flex gap-3">
              <button onClick={fetchData} className="text-sm font-sans px-4 py-2 rounded-lg border transition-colors" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.6)' }}>Refresh</button>
              <button onClick={handleLogout} className="text-sm font-sans px-4 py-2 rounded-lg border transition-colors" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.6)' }}>Sign Out</button>
            </div>
          </div>

          {loading && !data && (
            <p className="text-center font-sans" style={{ color: 'rgba(255,255,255,0.4)' }}>Loading…</p>
          )}

          {error && (
            <p className="text-sm font-sans mb-4" style={{ color: 'rgba(200,80,80,0.9)' }}>{error}</p>
          )}

          {data && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                <div className="rounded-xl p-5 border" style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'var(--theme-border)' }}>
                  <p className="text-3xl font-serif text-[var(--theme-accent)]">{data.inquiries || 0}</p>
                  <p className="text-xs font-sans mt-1 uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.4)' }}>Inquiries</p>
                </div>
                <div className="rounded-xl p-5 border" style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'var(--theme-border)' }}>
                  <p className="text-3xl font-serif text-[var(--theme-accent)]">{data.bookings || 0}</p>
                  <p className="text-xs font-sans mt-1 uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.4)' }}>Bookings</p>
                </div>
                <div className="rounded-xl p-5 border" style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'var(--theme-border)' }}>
                  <p className="text-3xl font-serif text-[var(--theme-accent)]">{data.contacts || 0}</p>
                  <p className="text-xs font-sans mt-1 uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.4)' }}>Contact</p>
                </div>
              </div>

              {data.messages && data.messages.length > 0 && (
                <div className="space-y-3">
                  {data.messages.map((msg, i) => (
                    <div key={i} className="rounded-xl p-5 border" style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'var(--theme-border)' }}>
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="min-w-0 flex-1">
                          <span className="text-sm font-medium font-sans text-[var(--theme-text)]">{msg.name}</span>
                          <span className="text-xs font-sans ml-3" style={{ color: 'rgba(255,255,255,0.35)' }}>{msg.email}</span>
                          {msg.phone && <span className="text-xs font-sans ml-3" style={{ color: 'rgba(255,255,255,0.35)' }}>{msg.phone}</span>}
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          {msg.email && (
                            <button onClick={() => openReply(msg)} className="text-xs font-sans px-3 py-1.5 rounded transition-colors" style={{ backgroundColor: 'var(--theme-accent)', color: 'var(--theme-text)' }}>Reply</button>
                          )}
                          <span className="text-[10px] font-sans whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.3)' }}>
                            {formatDate(msg.createdAt)}
                          </span>
                        </div>
                      </div>
                      {msg.service && (
                        <p className="text-xs font-sans mb-1 text-[var(--theme-accent)]">{msg.service}</p>
                      )}
                      <p className="text-sm font-sans leading-relaxed whitespace-pre-wrap" style={{ color: 'rgba(255,255,255,0.5)' }}>{msg.message}</p>
                    </div>
                  ))}
                </div>
              )}

              {(!data.messages || data.messages.length === 0) && (
                <p className="text-center font-sans py-10" style={{ color: 'rgba(255,255,255,0.25)' }}>No messages yet</p>
              )}
            </>
          )}

          {replying && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
              <div className="w-full max-w-lg rounded-xl border p-6" style={{ backgroundColor: '#111', borderColor: 'var(--theme-border)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-serif text-[var(--theme-text)]">Reply to {replying.name}</h2>
                  <button onClick={() => setReplying(null)} className="text-sm font-sans" style={{ color: 'rgba(255,255,255,0.4)' }}>Close</button>
                </div>
                <p className="text-xs font-sans mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>To: {replying.email}</p>
                {replying.service && <p className="text-xs font-sans mb-3 text-[var(--theme-accent)]">Re: {replying.service}</p>}
                <div className="rounded-lg p-3 mb-4 text-sm font-sans max-h-32 overflow-y-auto" style={{ backgroundColor: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.4)' }}>
                  {replying.message}
                </div>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply…"
                  rows="6"
                  className="w-full px-4 py-3 rounded-lg text-sm font-sans border mb-3 focus:outline-none resize-none"
                  style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderColor: 'var(--theme-border)', color: 'var(--theme-text)' }}
                  autoFocus
                />
                {sent && (
                  <p className="text-xs font-sans mb-3" style={{ color: sent === 'Reply sent' ? '#4ade80' : 'rgba(200,80,80,0.9)' }}>{sent}</p>
                )}
                <div className="flex gap-3 justify-end">
                  <button onClick={() => setReplying(null)} className="text-sm font-sans px-4 py-2 rounded-lg border" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.6)' }}>Cancel</button>
                  <button onClick={sendReply} disabled={sending || !replyText.trim()} className="text-sm font-sans px-5 py-2 rounded-lg disabled:opacity-50" style={{ backgroundColor: 'var(--theme-accent)', color: 'var(--theme-text)' }}>{sending ? 'Sending…' : 'Send Reply'}</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
