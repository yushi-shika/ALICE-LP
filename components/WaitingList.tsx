
import React, { useState } from 'react';
import { ThemeConfig } from '../types';
import { Send, CheckCircle } from 'lucide-react';

interface WaitingListProps {
  theme: ThemeConfig;
}

const WaitingList: React.FC<WaitingListProps> = ({ theme }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section className={`py-32 relative overflow-hidden ${theme.colors.bg}`}>
      {/* Decorative Circles */}
      <div className={`absolute left-0 bottom-0 w-full h-full opacity-50 pointer-events-none`}>
          <div className={`absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] ${theme.vibe.shapes}`} />
          <div className={`absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] ${theme.vibe.shapes}`} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`max-w-2xl mx-auto rounded-[3rem] p-10 md:p-16 text-center shadow-2xl ${theme.colors.cardBg} ${theme.vibe.glass} border border-white/50`}>
          
          <h2 className={`text-4xl md:text-5xl mb-6 ${theme.fonts.headline} ${theme.colors.text}`}>
            Be the First.
          </h2>
          <p className={`text-lg opacity-70 mb-10 ${theme.fonts.body} ${theme.colors.text}`}>
            ALICE is currently in closed beta. Join the waiting list to secure your unique entity ID before the public launch.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className={`flex-1 px-6 py-4 rounded-full bg-white/50 border border-white/60 focus:outline-none focus:ring-2 focus:ring-sky-300 backdrop-blur-sm ${theme.colors.text} placeholder:text-slate-400`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button 
                type="submit"
                className={`px-8 py-4 rounded-full font-bold transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 ${theme.colors.accent} ${theme.colors.buttonText} shadow-lg shadow-sky-400/20`}
              >
                Join List <Send size={18} />
              </button>
            </form>
          ) : (
            <div className={`flex flex-col items-center justify-center p-8 rounded-2xl bg-sky-50/50 border border-sky-100 animate-breathe`}>
                <CheckCircle className="w-12 h-12 text-sky-500 mb-4" />
                <h3 className={`text-xl font-bold ${theme.colors.text}`}>You are on the list.</h3>
                <p className={`opacity-60 mt-2 ${theme.colors.text}`}>We will notify you when ALICE is ready for you.</p>
            </div>
          )}
          
          <p className={`mt-8 text-xs opacity-40 ${theme.colors.text}`}>
            By joining, you agree to receive updates about ALICE. No spam, ever.
          </p>

        </div>
      </div>
    </section>
  );
};

export default WaitingList;
