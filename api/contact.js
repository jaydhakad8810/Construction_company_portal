// Simple Vercel Serverless function for contact
// Deploy: place this file under /api/contact.js for Vercel
module.exports = (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  try {
    const body = req.body || JSON.parse(req.rawBody || '{}');
    const { name, email, message, phone } = body;
    if (!name || !email || !message) return res.status(400).send('Missing fields');
    // TODO: integrate with email provider (SendGrid, Mailgun) or store in DB
    console.log('Contact received', { name, email, phone });
    return res.status(200).json({ ok: true, msg: 'Received' });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
};
