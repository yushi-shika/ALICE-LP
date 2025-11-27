import React from 'react';
import { ThemeConfig } from '../types';
import { PRICING_TIERS } from '../constants';
import { Button } from './Button';
import { Check } from 'lucide-react';

interface PricingProps {
  theme: ThemeConfig;
}

export const Pricing: React.FC<PricingProps> = ({ theme }) => {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
            <h2 className={`text-5xl md:text-6xl ${theme.fontHeading} ${theme.textColor} mb-6`}>
                Choose your <span className={theme.accentColor}>Connection</span>.
            </h2>
            <p className={`text-xl ${theme.mutedText} ${theme.fontBody}`}>
                Relationships evolve. Start where you feel comfortable.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {PRICING_TIERS.map((tier, index) => (
                <div 
                    key={index}
                    className={`relative p-8 rounded-3xl border transition-all duration-300 ${
                        tier.recommended 
                        ? `${theme.glassColor} border-${theme.accentColor} shadow-2xl scale-105 z-10` 
                        : `${theme.cardBg} ${theme.glassBorder} hover:scale-105`
                    }`}
                >
                    {tier.recommended && (
                        <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white ${theme.buttonBg}`}>
                            Most Popular
                        </div>
                    )}

                    <h3 className={`text-2xl ${theme.fontHeading} ${theme.textColor} mb-2`}>{tier.name}</h3>
                    <div className="flex items-baseline gap-1 mb-4">
                        <span className={`text-4xl font-bold ${theme.textColor}`}>{tier.price}</span>
                    </div>
                    <p className={`text-sm ${theme.mutedText} mb-8 h-10`}>{tier.description}</p>
                    
                    <Button 
                        theme={theme} 
                        variant={tier.recommended ? 'primary' : 'outline'}
                        className="w-full mb-8"
                    >
                        {tier.price === 'Free' ? 'Start Journey' : 'Connect Deeply'}
                    </Button>

                    <ul className="space-y-4">
                        {tier.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm">
                                <Check size={16} className={`mt-1 shrink-0 ${theme.accentColor}`} />
                                <span className={theme.textColor}>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};