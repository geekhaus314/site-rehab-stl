/**
 * /api/booking — Booking inquiry submission.
 * Validates input, returns success/error. No persistence (database: none).
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
  const cleanMessage = sanitizeInput(message || '');
  const cleanType = sanitizeInput(type || 'booking');

  if (!cleanName || !cleanEmail || !cleanService) {
    return res.status(400).json({ message: 'Name, email, and service are required' });
  }

  if (!validateEmail(cleanEmail)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  return res.status(200).json({
    message: 'Booking request received. We will follow up to confirm a time.',
    received: {
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      service: cleanService,
      message: cleanMessage,
      type: cleanType,
    },
  });
}
