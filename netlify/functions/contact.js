// Netlify Function: netlify/functions/contact.js
exports.handler = async function(event) {
  if(event.httpMethod !== 'POST') return { statusCode:405, body: 'Method Not Allowed' };
  try{
    const body = JSON.parse(event.body || '{}');
    const { name, email, message, phone } = body;
    if(!name || !email || !message) return { statusCode:400, body:'Missing fields' };
    // TODO: integrate with email provider
    console.log('Contact (netlify) ', {name,email,phone});
    return { statusCode:200, body: JSON.stringify({ok:true}) };
  }catch(err){ console.error(err); return { statusCode:500, body:'Server error' } }
};
