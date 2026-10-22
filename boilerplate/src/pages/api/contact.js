/**
 * /api/contact — Contact form submission.
 * Validates input, returns success/error. No persistence (database: none).
 * The admin reviews submissions via the admin dashboard if wired to a store.
 */
import { validateEmail, sanitizeInput } from '../../lib/security';
import { getBusinessProfile } from '../../lib/business';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const profile = getBusinessProfile();
  const { name, email, phone, service, message, type } = req.body || {};

  const cleanName = sanitizeInput(name);
  const cleanEmail = sanitizeInput(email);
  const cleanPhone = sanitizeInput(phone || '');
  const cleanService = sanitizeInput(service || '');
  const cleanMessage = sanitizeInput(message);
  const cleanType = sanitizeInput(type || 'contact');

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return res.status(400).json({ message: 'Name, email, and message are required' });
  }

  if (!validateEmail(cleanEmail)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  // No email provider configured by default; return accepted so the UI shows success.
  // Wire RESEND_API_KEY / SMTP here when a provider is provisioned for a client.
  return res.status(200).json({
    message: 'Message received. We will be in touch shortly.',
    received: {
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      service: cleanService,
      type: cleanType,
    },
  });
}
