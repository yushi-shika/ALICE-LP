import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Navigation, Aperture, Battery, Wifi } from 'lucide-react';
import { ThemeConfig } from '../types';

interface ProductRevealProps {
  theme: ThemeConfig;
}

type Sender = 'aria' | 'user';

const ProductReveal: React.FC<ProductRevealProps> = ({ theme }) => {
  const [messages, setMessages] = useState<{ id: number; sender: Sender; text: string }[]>([
    { id: 1, sender: 'aria', text: 'Look at that sky! It matches your jacket today. Shall we grab a coffee at the corner?' }
  ]);
  const [input, setInput] = useState('');
  const [replyIndex, setReplyIndex] = useState(0);
  const [ariaFinished, setAriaFinished] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  const cannedReplies = useMemo(
    () => [
      "Let's head toward that coffee spot on the corner.",
      'I can guide you—want the fastest route or the scenic one?',
      "I'll keep scanning nearby events while we walk.",
      'Saved this place to your favorites. Ready when you are!'
    ],
    []
  );

  const getAriaReply = (userText: string) => {
    const t = userText.toLowerCase();
    if (t.includes('coffee') || t.includes("let's go") || t.includes('go')) {
      return "On it. I'll highlight the route and queue your order when we're 1 minute away.";
    }
    if (t.includes('not now') || t.includes('later') || t.includes('busy')) {
      return 'No worries. I set a soft reminder for 20 minutes from now—want me to snooze it?';
    }
    if (t.includes('where') || t.includes('route') || t.includes('how')) {
      return 'We’re two blocks out. Cross at the next light, then turn left—I’ll glow the path.';
    }
    if (t.includes('weather')) {
      return 'Current sky is clear and 68°F. Light breeze—your jacket is perfect.';
    }
    if (t.includes('recommend') || t.includes('suggest')) {
      return 'Try Blue Bottle on Market or Sightglass on 7th. Want me to pick one?';
    }
    const reply = cannedReplies[replyIndex % cannedReplies.length];
    setReplyIndex((i) => i + 1);
    return reply;
  };

  const appendMessage = (sender: Sender, text: string) => {
    setMessages((prev) => [...prev, { id: Date.now() + Math.random(), sender, text }]);
  };

  useEffect(() => {
    const el = listRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  const handleSend = (text?: string) => {
    if (ariaFinished) return;
    const content = (text ?? input).trim();
    if (!content) return;
    appendMessage('user', content);
    setInput('');
    const ariaReply = getAriaReply(content);
    appendMessage('aria', ariaReply);
    setAriaFinished(true);
  };

  const gradient = theme?.vibe?.gradient ?? 'bg-gradient-to-br from-white via-sky-50 to-blue-50';

  return (
    <section className={`min-h-screen flex items-center justify-center relative overflow-hidden ${gradient} px-4 md:px-8 py-16`}>
      <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/10 pointer-events-none" />

      <div className="container mx-auto relative z-10 w-full max-w-7xl">
        <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] md:aspect-[16/9] lg:aspect-[21/9] rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden bg-slate-900/60 group isolate border border-white/30">
          {/* 1. Real World Layer */}
          <div className="absolute inset-0 z-0">
            <img
              src="/background-image.jpg"
              alt="Street-level daytime view walking along Powell Street in San Francisco"
              className="w-full h-full object-cover object-[center_top] sm:object-center opacity-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent mix-blend-multiply" />
          </div>

          {/* 2. Character Layer */}
          <div className="absolute bottom-0 right-[-2%] sm:right-2 md:right-[8%] h-[70%] sm:h-[78%] md:h-[88%] w-auto z-10 flex items-end justify-center pointer-events-none">
            <img
              src="/character.png"
              className="h-full w-auto object-contain object-bottom drop-shadow-[0_10px_30px_rgba(0,0,0,0.55)]"
              alt="ALICE holographic companion"
            />
          </div>

          {/* 3. AR HUD Layer */}
          <div className="absolute inset-0 z-20 p-4 sm:p-6 md:p-10 flex flex-col justify-between pointer-events-none select-none">
            {/* Top HUD */}
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-2">
                <div className="bg-slate-900/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-3 text-white shadow-lg">
                  <Navigation size={14} className="animate-pulse text-sky-300" />
                  <span className="text-[10px] md:text-xs font-mono tracking-widest uppercase text-sky-50">
                    San Francisco
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-white">
                <span className="text-xs font-mono text-sky-100 hidden md:block">10:42 AM</span>
                <div className="h-4 w-[1px] bg-white/20 hidden md:block" />
                <Wifi size={16} className="text-sky-200" />
                <Battery size={16} className="text-sky-200" />
                <div className="w-8 h-8 rounded-full border border-sky-400/50 flex items-center justify-center animate-spin-slow bg-sky-500/10">
                  <Aperture size={14} className="text-sky-300" />
                </div>
              </div>
            </div>

            {/* Bottom HUD: Chat */}
            <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-end gap-6">
              <div className="max-w-md w-full md:w-auto pointer-events-auto hidden md:block">
                <div className="flex items-end gap-4 mb-4">
                  <div className="w-full max-w-lg space-y-3 flex flex-col">
                    <div
                      ref={listRef}
                      className="flex-1 min-h-[160px] max-h-[55vh] overflow-y-auto pr-2 flex flex-col gap-3 [&::-webkit-scrollbar]:hidden"
                      style={{ scrollbarWidth: 'none' }}
                    >
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={
                            msg.sender === 'aria'
                              ? 'self-start px-5 py-5 rounded-[1.5rem] bg-white/10 border border-cyan-200/40 shadow-[0_20px_60px_-25px_rgba(15,118,110,0.6)] backdrop-blur-2xl relative overflow-hidden max-w-[75%] md:max-w-[60%] whitespace-pre-wrap break-words'
                              : 'self-end px-4 py-3.5 rounded-[1.25rem] bg-slate-900/80 border border-white/10 shadow-lg text-white max-w-[70%] md:max-w-[55%] whitespace-pre-wrap break-words'
                          }
                        >
                          {msg.sender === 'aria' && (
                            <>
                              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 via-white/15 to-sky-500/25 mix-blend-screen" />
                              <div className="absolute inset-0 border border-white/10 rounded-[1.75rem]" />
                              <div className="relative z-10 space-y-2">
                                <span className="text-cyan-50 font-semibold text-[10px] uppercase block tracking-wider">
                                  Aria
                                </span>
                                <p className="text-base md:text-lg font-medium text-white/90 leading-relaxed drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]">
                                  {msg.text}
                                </p>
                              </div>
                            </>
                          )}
                          {msg.sender === 'user' && (
                            <p className="text-sm md:text-base font-medium text-white leading-relaxed">{msg.text}</p>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => handleSend("Sure, let's go.")}
                        disabled={ariaFinished}
                        className={`bg-slate-900/80 hover:bg-slate-900 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/10 text-white text-sm font-medium transition-all pointer-events-auto shadow-lg ${
                          ariaFinished ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                        }`}
                      >
                        Sure, let's go.
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSend('Not now.')}
                        disabled={ariaFinished}
                        className={`bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/20 text-white text-sm font-medium transition-all pointer-events-auto ${
                          ariaFinished ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                        }`}
                      >
                        Not now.
                      </button>
                    </div>

                    <div className="flex items-center gap-3 bg-white/10 border border-white/10 rounded-full px-4 py-2 backdrop-blur-xl shadow-lg">
                      <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSend();
                        }}
                        placeholder={ariaFinished ? 'Aria has finished this chat.' : 'Say something to Aria...'}
                        disabled={ariaFinished}
                        className={`flex-1 bg-transparent text-white placeholder:text-white/50 focus:outline-none text-sm ${
                          ariaFinished ? 'opacity-60 cursor-not-allowed' : ''
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => handleSend()}
                        disabled={ariaFinished}
                        className={`px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-white rounded-full text-sm font-semibold transition-colors ${
                          ariaFinished ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Glare Overlay */}
          <div className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 animate-shine pointer-events-none z-30" />
        </div>
      </div>
    </section>
  );
};

export default ProductReveal;
