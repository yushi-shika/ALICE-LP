import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import crypto from 'crypto';

// Load environment variables: prefer .env.local if present, fallback to .env
dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local', override: true });

const app = express();
const PORT = Number(process.env.PORT) || 4000;
const HOST = process.env.HOST || '0.0.0.0';

app.use(express.json());

const newReqId = () => crypto.randomUUID ? crypto.randomUUID() : `req_${Date.now()}_${Math.random().toString(16).slice(2)}`;

const sendError = (res, status, code, message, extra = {}) => {
  return res.status(status).json({ ok: false, code, error: message, ...extra });
};

// Minimal CORS so the form works when the frontend and backend are on different origins
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-Request-ID');
  res.header('Access-Control-Allow-Methods', 'POST,OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

const clean = (v = '') => String(v || '').trim();

// Lightweight health check for debugging
app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    provider: process.env.RESEND_API_KEY ? 'resend' : 'gmail',
    mailUser: !!process.env.MAIL_USER,
    mailTo: process.env.MAIL_TO || 'alice.group.mail@gmail.com'
  });
});

app.post('/api/contact', async (req, res) => {
  const startedAt = Date.now();
  const reqId = req.headers['x-request-id'] || newReqId();
  console.info(`[contact] in ${reqId}`);

  const { name, email, topic, message } = req.body || {};
  const cleanName = clean(name);
  const cleanEmail = clean(email);
  const cleanTopic = clean(topic);
  const cleanMessage = clean(message);

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return sendError(res, 400, 'ERR_MISSING_FIELDS', 'Missing required fields', { reqId });
  }

  const to = process.env.MAIL_TO || 'alice.group.mail@gmail.com';

  try {
    // 1) Try Resend first (Gmail basic auth is increasingly blocked in 2025)
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

        return res.json({ ok: true, provider: 'resend', reqId, elapsedMs: Date.now() - startedAt });
      } catch (err) {
        console.error(`[contact] Resend error ${reqId}`, {
          message: err?.message,
          code: err?.code,
          status: err?.status,
        });
        // fall back to SMTP
      }
    }

    // 2) Fallback to Gmail SMTP (works only if Google still allows app passwords)
    const user = process.env.MAIL_USER;
    const pass = process.env.MAIL_PASS;

    if (!user || !pass) {
      console.error('Missing MAIL_USER or MAIL_PASS');
      return res.status(500).json({ error: 'MAIL_USER / MAIL_PASS not set on server' });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : true,
      auth: { user, pass },
      pool: true,
      maxConnections: 1,
      connectionTimeout: 10000,
      socketTimeout: 10000,
    });

    const mailOptions = {
      from: `${cleanName || 'ALICE user'} <${user}>`,
      to,
      replyTo: cleanEmail,
      subject: cleanTopic || 'ALICE Contact',
      text: `Name: ${cleanName}\nEmail: ${cleanEmail}\nTopic: ${cleanTopic || 'N/A'}\n\n${cleanMessage}`,
    };

    console.log(`[contact] SMTP send -> ${reqId}`, { to, replyTo: cleanEmail, subject: mailOptions.subject });

    const sendPromise = transporter.sendMail(mailOptions);
    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('SMTP timeout')), 12000));

    await Promise.race([sendPromise, timeoutPromise]);

    res.json({ ok: true, provider: 'gmail', reqId, elapsedMs: Date.now() - startedAt });
  } catch (err) {
    console.error(`[contact] Mail send error ${reqId}`, {
      message: err?.message,
      code: err?.code,
      command: err?.command,
    });
    const msg = err?.message || 'Failed to send mail';
    const code = err?.code || 'ERR_MAIL_SEND';
    sendError(res, 500, code, msg, { reqId, elapsedMs: Date.now() - startedAt });
  }
});

const server = app.listen(PORT, HOST, () => {
  console.log(`Contact mail server listening on http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}`);
});

server.on('error', (err) => {
  if (err?.code === 'EADDRINUSE') {
    console.error(`[contact] Port ${PORT} is already in use. Stop the other process or set PORT to a free port.`);
  } else {
    console.error('[contact] Server error', err);
  }
});
