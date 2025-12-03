import nodemailer from 'nodemailer';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, X-Request-ID',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
  'Content-Type': 'application/json'
};

const clean = (v = '') => String(v || '').trim();
const newReqId = () => `req_${Date.now()}_${Math.random().toString(16).slice(2)}`;

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (err) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON payload' }) };
  }

  const cleanName = clean(payload.name);
  const cleanEmail = clean(payload.email);
  const cleanTopic = clean(payload.topic);
  const cleanMessage = clean(payload.message);
  const reqId = event.headers['x-request-id'] || newReqId();

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, code: 'ERR_MISSING_FIELDS', error: 'Missing required fields', reqId }) };
  }

  const to = process.env.MAIL_TO || 'alice.group.mail@gmail.com';

  try {
    // 1) Prefer Resend (Gmail app passwords are being phased out in 2025)
    if (process.env.RESEND_API_KEY) {
      try {
        const from = process.env.RESEND_FROM || 'ALICE <[email protected]>';
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from,
            to: [to],
            reply_to: cleanEmail,
            subject: cleanTopic || 'ALICE Contact',
            text: `Name: ${cleanName}\nEmail: ${cleanEmail}\nTopic: ${cleanTopic || 'N/A'}\n\n${cleanMessage}`,
          }),
        });

        if (!resendRes.ok) {
          const body = await resendRes.json().catch(() => ({}));
          const msg = body?.error?.message || `Resend error ${resendRes.status}`;
          const err = new Error(msg);
          err.code = 'ERR_RESEND_HTTP';
          throw err;
        }

        return { statusCode: 200, headers, body: JSON.stringify({ ok: true, provider: 'resend', reqId }) };
      } catch (err) {
        console.error(`[contact] Resend error ${reqId}`, {
          message: err?.message,
          code: err?.code,
          status: err?.status,
        });
        // fall back to SMTP
      }
    }

    // 2) Fallback to Gmail SMTP with app password
    const user = process.env.MAIL_USER;
    const pass = process.env.MAIL_PASS;

    if (!user || !pass) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'MAIL_USER / MAIL_PASS not set on server' }) };
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user, pass },
      pool: true,
      maxConnections: 1,
      connectionTimeout: 10000,
      socketTimeout: 10000,
    });

    const sendPromise = transporter.sendMail({
      from: `${cleanName || 'ALICE user'} <${user}>`,
      to,
      replyTo: cleanEmail,
      subject: cleanTopic || 'ALICE Contact',
      text: `Name: ${cleanName}\nEmail: ${cleanEmail}\nTopic: ${cleanTopic || 'N/A'}\n\n${cleanMessage}`,
    });

    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('SMTP timeout')), 12000));

    await Promise.race([sendPromise, timeoutPromise]);

    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, provider: 'gmail', reqId }) };
  } catch (err) {
    console.error(`[contact] Mail send error ${reqId}`, {
      message: err?.message,
      code: err?.code,
      command: err?.command,
    });
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        ok: false,
        code: err?.code || 'ERR_MAIL_SEND',
        error: err?.message || 'Failed to send mail',
        reqId,
      }),
    };
  }
}
