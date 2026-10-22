/**
 * /api/admin/login — Admin authentication.
 * Validates password against ADMIN_PASSWORD env var and returns an HMAC token.
 */
import { createAdminToken } from '../../../lib/security';

const RATE_LIMIT_MAP = new Map();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

function getClientIP(req) {
  const headers = req.headers;
  return (
    headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    headers['x-real-ip'] ||
    'unknown'
  );
}

function checkRateLimit(ip) {
  const now = Date.now();
  let entry = RATE_LIMIT_MAP.get(ip);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    RATE_LIMIT_MAP.set(ip, { count: 0, windowStart: now });
    return { allowed: true, remaining: MAX_ATTEMPTS };
  }
  if (entry.count >= MAX_ATTEMPTS) {
    return {
      allowed: false,
      remaining: 0,
      retryAfter: Math.ceil((entry.windowStart + WINDOW_MS - now) / 1000),
    };
  }
  return { allowed: true, remaining: MAX_ATTEMPTS - entry.count };
}

function incrementRateLimit(ip) {
  const entry = RATE_LIMIT_MAP.get(ip);
  if (entry) entry.count++;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const ip = getClientIP(req);
  const rateCheck = checkRateLimit(ip);
  if (!rateCheck.allowed) {
    return res.status(429).json({
      message: 'Too many attempts. Try again later.',
      retryAfter: rateCheck.retryAfter,
    });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return res.status(500).json({ message: 'Admin not configured' });
  }

  const { password } = req.body || {};
  if (!password || password !== adminPassword) {
    incrementRateLimit(ip);
    return res.status(401).json({
      message: 'Invalid password',
      remaining: rateCheck.remaining - 1,
    });
  }

  const token = await createAdminToken(adminPassword);
  return res.status(200).json({ token });
}
