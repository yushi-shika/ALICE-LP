import React, { useState } from 'react';
import { ThemeConfig } from '../types';
import { Send, CheckCircle, ArrowUpRight } from 'lucide-react';

interface ContactProps {
  theme: ThemeConfig;
}

const Contact: React.FC<ContactProps> = ({ theme }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      topic: formData.topic.trim(),
      message: formData.message.trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setError('名前・メール・メッセージは必須です');
      return;
    }

    // Decide endpoint based on environment. Prefer explicit env, then local API, then Netlify Functions, fallback to proxy.
    let endpoint: string;
    if (import.meta.env.VITE_CONTACT_ENDPOINT) {
      endpoint = `${import.meta.env.VITE_CONTACT_ENDPOINT.replace(/\/$/, '')}/api/contact`;
    } else if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      endpoint = 'http://localhost:4000/api/contact'; // bypass proxy to avoid dev proxy issues
    } else if (window.location.hostname.endsWith('netlify.app')) {
      endpoint = '/.netlify/functions/contact';
    } else {
      endpoint = '/api/contact';
    }

    const reqId = crypto.randomUUID ? crypto.randomUUID() : `req_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    console.info('[contact] posting', { endpoint, reqId });

    setSending(true);
    setError('');

    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 15000);

      const res = await fetch(endpoint, {
        method: 'POST',
        // propagate request id so server logs can be matched to UI errors
        headers: {
          'Content-Type': 'application/json',
          'x-request-id': reqId,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timer);

      let body: any = {};
      try {
        body = await res.json();
      } catch (e) {
        /* ignore parse error */
      }

      if (!res.ok || body?.ok === false) {
        const serverMsg = body?.error || body?.message;
        const code = body?.code;
        const fromServer = serverMsg ? `: ${serverMsg}` : '';
        const suffix = code ? ` (code: ${code}, reqId: ${body?.reqId || reqId})` : ` (reqId: ${body?.reqId || reqId})`;
        throw new Error(`送信に失敗しました${fromServer}${suffix}`);
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', topic: '', message: '' });
    } catch (err: any) {
      console.error('contact submit error', { err, reqId });
      setError(
        err.name === 'AbortError'
          ? 'タイムアウトしました。少し待って再送してください。'
          : err.message || '送信に失敗しました'
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 sm:py-32 overflow-hidden bg-gradient-to-b from-white via-sky-50 to-white">
      <div className="absolute inset-x-0 top-12 flex justify-center">
        <div className="h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-sky-200 to-transparent" />
      </div>
      <div className="absolute -right-16 top-16 w-72 h-72 bg-sky-100 rounded-full blur-3xl opacity-70" />
      <div className="absolute -left-24 bottom-0 w-80 h-80 bg-sky-200/60 rounded-full blur-3xl opacity-60" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 space-y-10">
        <div className="max-w-2xl space-y-3">
          <p className="text-[11px] tracking-[0.22em] uppercase text-sky-500 font-semibold">Contact</p>
          <h2 className={`text-4xl md:text-5xl leading-tight ${theme.fonts.headline} text-slate-900`}>
            Send a message to the ALICE team.
          </h2>
        </div>

        <div className="w-full max-w-4xl bg-white/85 border border-sky-100 rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-[0_40px_120px_-80px_rgba(12,74,110,0.55)] backdrop-blur-md mx-auto">
          <div className="p-6 sm:p-10 md:p-12">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs uppercase tracking-[0.18em] text-slate-500">Your name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Evelyn Akari"
                      className="w-full bg-transparent border-b border-slate-200/70 focus:border-sky-500 focus:outline-none py-3 text-lg text-slate-900 placeholder:text-slate-400 transition-colors"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs uppercase tracking-[0.18em] text-slate-500">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      className="w-full bg-transparent border-b border-slate-200/70 focus:border-sky-500 focus:outline-none py-3 text-lg text-slate-900 placeholder:text-slate-400 transition-colors"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="topic" className="text-xs uppercase tracking-[0.18em] text-slate-500">Topic</label>
                  <input
                    id="topic"
                    name="topic"
                    type="text"
                    placeholder="Integration, partnership, press..."
                    className="w-full bg-transparent border-b border-slate-200/70 focus:border-sky-500 focus:outline-none py-3 text-lg text-slate-900 placeholder:text-slate-400 transition-colors"
                    value={formData.topic}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs uppercase tracking-[0.18em] text-slate-500">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="What would you like to build with ALICE?"
                    className="w-full bg-transparent border-b border-slate-200/70 focus:border-sky-500 focus:outline-none py-3 text-lg text-slate-900 placeholder:text-slate-400 transition-colors resize-none"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={sending}
                    className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold tracking-tight shadow-lg shadow-sky-200/60 transition-all ${sending ? 'opacity-60 cursor-not-allowed' : 'hover:translate-y-[-2px] active:translate-y-[0px]'}`}
                  >
                    {sending ? 'Sending...' : 'Send it'} <Send size={18} />
                  </button>
                </div>
              </form>
            ) : (
              <div className="h-full flex flex-col items-start justify-center gap-4 rounded-2xl border border-sky-100 bg-sky-50/80 p-8">
                <div className="flex items-center gap-3 text-sky-600">
                  <CheckCircle className="w-6 h-6" />
                  <p className="text-xs font-semibold uppercase tracking-[0.2em]">Delivered</p>
                </div>
                <h3 className="text-2xl font-semibold text-slate-900">Thanks. Your note is queued.</h3>
                <p className="text-slate-600 max-w-xl">We route every message to the builder closest to your request. Expect a concise reply with next steps.</p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="inline-flex items-center gap-2 text-sky-700 font-medium hover:gap-3 transition-all"
                >
                  Write another <ArrowUpRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
