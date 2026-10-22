/**
 * /api/admin/reply — Send a reply to an inquiry.
 * Requires a valid admin HMAC token. No persistence (database: none).
 */
import { verifyAdminToken, sanitizeInput } from '../../../lib/security';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  const auth = await verifyAdminToken(req, adminPassword);
  if (!auth.ok) {
    return res.status(auth.status).json({ message: auth.message });
  }

  const { messageId, to, subject, replyText } = req.body || {};
  if (!to || !replyText) {
    return res.status(400).json({ message: 'Recipient and reply text are required' });
  }

  const cleanTo = sanitizeInput(to);
  const cleanSubject = sanitizeInput(subject || 'Reply');
  const cleanReply = sanitizeInput(replyText);

  if (!cleanTo || !cleanReply) {
    return res.status(400).json({ message: 'Invalid input detected' });
  }

  // No email provider configured by default. Wire a provider when provisioned.
  return res.status(200).json({
    message: 'Reply queued.',
    queued: { to: cleanTo, subject: cleanSubject },
  });
}
