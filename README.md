Oberio Construction — Static Multi-page Website

How to run:
1. Open the folder in a browser or use a local server (recommended).
   - Quick (Python):
     - Windows Powershell: python -m http.server 8000; then open http://localhost:8000
2. Serverless contact endpoint (optional):
   - Vercel: place `api/contact.js` in the project root `api/` folder and deploy. The form POSTs to `/api/contact`.
   - Netlify: place `netlify/functions/contact.js` and enable functions; form POSTs to `/.netlify/functions/contact` or configure redirects.
2. Pages:
   - index.html, projects.html, offers.html, gallery.html, contact.html

Notes:
- Image files are placeholders: replace images in assets/images with optimized JPG/PNG files.
- Google Maps iframe is a placeholder; replace the src with a valid embed when deploying.
- No back-end: contact form uses front-end validation and fake "sent" message.

What's included:
- Responsive layout, animations, lightbox, counters, filterable project cards.
- Clean semantic HTML, modular CSS, and vanilla JS.

- Next steps:
- Replace placeholder images with optimized WebP assets and add CDN hosting.
- Integrate the serverless endpoint with an email provider (SendGrid, Mailgun) or store submissions in a database.
- Add accessibility audits and ARIA enhancements.
