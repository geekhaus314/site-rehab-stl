/**
 * Admin authentication via secure HMAC tokens.
 * The admin password is configured through ADMIN_PASSWORD env var.
 * Tokens are timestamped HMAC signatures verified server-side with constant-time comparison.
 */
import crypto from 'crypto';

const TOKEN_TTL_MS = 86400000; // 24 hours

function getSigningKey(password) {
  return crypto.createHmac('sha256', password);
}

export async function createAdminToken(password, now = Date.now()) {
  const timestamp = now.toString(36);
  const sig = getSigningKey(password).update(timestamp).digest('hex');
  return `${timestamp}.${sig}`;
}

export async function verifyAdminToken(request, password) {
  if (!password) {
    return { ok: false, status: 500, message: 'Admin not configured' };
  }

  const raw = (request.headers.get('Authorization') || '')
    .replace(/^Bearer\s+/i, '')
    .trim();
  if (!raw) {
    return { ok: false, status: 401, message: 'Unauthorized' };
  }

  const parts = raw.split('.');
  if (parts.length !== 2) {
    return { ok: false, status: 401, message: 'Invalid token' };
  }

  const [timestamp, providedSig] = parts;
  const issuedAt = parseInt(timestamp, 36);
  if (!issuedAt || Number.isNaN(issuedAt)) {
    return { ok: false, status: 401, message: 'Invalid token' };
  }

  const now = Date.now();
  if (now - issuedAt > TOKEN_TTL_MS || issuedAt - now > 60000) {
    return { ok: false, status: 401, message: 'Invalid or expired token' };
  }

  const expectedSig = getSigningKey(password).update(timestamp).digest('hex');
  const provided = Buffer.from(providedSig, 'utf8');
  const expected = Buffer.from(expectedSig, 'utf8');

  if (provided.length !== expected.length) {
    return { ok: false, status: 401, message: 'Invalid or expired token' };
  }

  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= provided[i] ^ expected[i];
  }

  if (diff !== 0) {
    return { ok: false, status: 401, message: 'Invalid or expired token' };
  }

  return { ok: true };
}

export function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim()
    .slice(0, 5000);
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
