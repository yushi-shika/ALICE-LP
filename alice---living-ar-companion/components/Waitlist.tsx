import React from 'react';
import { ThemeConfig } from '../types';
import { ArrowRight, Mail } from 'lucide-react';

interface WaitlistProps {
  theme: ThemeConfig;
}

export const Waitlist: React.FC<WaitlistProps> = ({ theme }) => {
  return (
    <section className="py-24 relative overflow-hidden">
        <div className={`absolute inset-0 ${theme.bgGradient} opacity-20`} />
        
        <div className="container mx-auto px-6 relative z-10">
            <div className={`max-w-4xl mx-auto rounded-[40px] ${theme.glassColor} border ${theme.glassBorder} p-12 md:p-20 text-center shadow-2xl`}>
                <h2 className={`text-4xl md:text-5xl ${theme.fontHeading} ${theme.textColor} mb-6`}>
                    Secure your <span className={theme.accentColor}>Connection</span>.
                </h2>
                <p className={`text-xl ${theme.mutedText} mb-10 max-w-2xl mx-auto`}>
                    Access is currently limited to the first 10,000 users. Join the waitlist to be notified when ALICE is ready for you.
                </p>

                <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                    <div className="relative flex-grow">
                        <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.mutedText}`} size={20} />
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className={`w-full pl-12 pr-6 py-4 rounded-full bg-white/50 border ${theme.glassBorder} focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${theme.textColor} placeholder:text-gray-400`}
                        />
                    </div>
                    <button 
                        className={`px-8 py-4 rounded-full font-bold transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 ${theme.buttonBg} ${theme.buttonText}`}
                    >
                        Join List <ArrowRight size={18} />
                    </button>
                </form>
                
                <p className={`mt-6 text-xs ${theme.mutedText} uppercase tracking-widest`}>
                    No spam. Unsubscribe anytime.
                </p>
            </div>
        </div>
    </section>
  );
};