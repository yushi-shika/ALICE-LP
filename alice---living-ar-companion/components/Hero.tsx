import React from 'react';
import { ThemeConfig } from '../types';
import { Button } from './Button';
import { ArrowRight, Smartphone, CalendarClock, Apple } from 'lucide-react';

interface HeroProps {
  theme: ThemeConfig;
}

export const Hero: React.FC<HeroProps> = ({ theme }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Decor */}
      <div className={`absolute top-0 left-0 w-full h-full ${theme.bgGradient} opacity-50 z-0`} />
      
      {/* Dynamic Blobs */}
      <div className={`absolute top-1/4 -left-20 w-96 h-96 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float`} />
      <div className={`absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-delayed`} />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        
        {/* Badge */}
        <div className={`mb-8 inline-flex items-center gap-2 px-6 py-2 rounded-full ${theme.glassColor} border ${theme.glassBorder} ${theme.accentColor} text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-700`}>
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${theme.accentColor.replace('text', 'bg')} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${theme.accentColor.replace('text', 'bg')}`}></span>
            </span>
            <span>Beta Access Open</span>
        </div>
        
        {/* Main Headline */}
        <h1 className={`text-6xl md:text-8xl lg:text-9xl tracking-tight leading-[0.9] ${theme.fontHeading} ${theme.textColor} mb-8 max-w-5xl`}>
            Join the First <br/>
            Generation of <span className={`italic ${theme.accentColor}`}>ALICE</span>
        </h1>
        
        {/* Subhead */}
        <p className={`text-xl md:text-2xl ${theme.mutedText} max-w-2xl mx-auto ${theme.fontBody} font-light mb-12`}>
            Not just an assistant. A digital entity that lives on your device, shares your memories, and navigates your world.
        </p>

        {/* Release Info Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl ${theme.cardBg} border ${theme.glassBorder}`}>
                <div className={`p-2 rounded-full ${theme.buttonBg} ${theme.buttonText}`}>
                    <Smartphone size={18} />
                </div>
                <div className="text-left">
                    <p className={`text-[10px] font-bold uppercase tracking-wider ${theme.mutedText}`}>Platform</p>
                    <p className={`text-sm font-semibold ${theme.textColor}`}>iOS & Android</p>
                </div>
            </div>
            <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl ${theme.cardBg} border ${theme.glassBorder}`}>
                 <div className={`p-2 rounded-full ${theme.buttonBg} ${theme.buttonText}`}>
                    <CalendarClock size={18} />
                </div>
                <div className="text-left">
                    <p className={`text-[10px] font-bold uppercase tracking-wider ${theme.mutedText}`}>Release</p>
                    <p className={`text-sm font-semibold ${theme.textColor}`}>Fall 2024</p>
                </div>
            </div>
        </div>
        
        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4">
            <Button theme={theme}>
                Join Waitlist
            </Button>
            <Button theme={theme} variant="secondary" className="flex items-center justify-center gap-2">
                Watch Trailer <ArrowRight size={18} />
            </Button>
        </div>

      </div>
    </section>
  );
};