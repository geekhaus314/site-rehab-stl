/**
 * /api/admin/inquiries — Admin inbox data.
 * Requires a valid admin HMAC token. Returns counts and messages.
 * No persistence (database: none) — returns empty inbox by default.
 */
import { verifyAdminToken } from '../../../lib/security';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  const auth = await verifyAdminToken(req, adminPassword);
  if (!auth.ok) {
    return res.status(auth.status).json({ message: auth.message });
  }

  // No database — inbox is empty until a persistence layer is wired for a client.
  return res.status(200).json({
    inquiries: 0,
    bookings: 0,
    contacts: 0,
    messages: [],
  });
}
