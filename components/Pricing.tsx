
import React from 'react';
import { ThemeConfig } from '../types';
import { Check } from 'lucide-react';

interface PricingProps {
  theme: ThemeConfig;
}

const Pricing: React.FC<PricingProps> = ({ theme }) => {
  const tiers = [
    {
      name: "Acquaintance",
      price: "$0",
      description: "Start a casual friendship.",
      features: ["Standard Avatar", "Text & Voice Chat", "10 AR Minutes/Day", "Basic Memory"],
      highlight: false
    },
    {
      name: "Companion",
      price: "$15",
      period: "/month",
      description: "A genuine connection.",
      features: ["Customizable Appearance", "Unlimited AR Mode", "Emotional Growth Engine", "City Guide Access"],
      highlight: true
    },
    {
      name: "Soul Link",
      price: "$25",
      period: "/month",
      description: "Deep, permanent bond.",
      features: ["Full Neuro-Personality", "4K Avatar Rendering", "Wearable Integration", "Dedicated Server Core"],
      highlight: false
    }
  ];

  return (
    <section className={`py-32 ${theme.colors.bg} transition-colors duration-500`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className={`text-4xl md:text-5xl mb-4 ${theme.fonts.headline} ${theme.colors.text}`}>
            Choose your <span className={theme.colors.accentSecondary}>Connection</span>
          </h2>
          <p className={`opacity-60 ${theme.colors.text}`}>
            ALICE is free to meet. Deepen the bond when you are ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {tiers.map((tier, idx) => (
            <div 
              key={idx}
              className={`relative p-8 rounded-[2.5rem] transition-all duration-300 border
                ${tier.highlight 
                  ? `scale-105 shadow-2xl shadow-sky-200/50 z-10 ${theme.colors.cardBg} ${theme.vibe.glass} border-sky-300` 
                  : `scale-100 opacity-90 hover:opacity-100 hover:scale-105 ${theme.colors.cardBg} ${theme.colors.borderColor} hover:shadow-lg`
                }
              `}
            >
              {tier.highlight && (
                <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white ${theme.colors.accent} shadow-lg shadow-sky-400/30`}>
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className={`text-xl font-medium mb-2 ${theme.colors.text} ${theme.fonts.headline}`}>{tier.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className={`text-5xl font-bold ${theme.colors.text} ${theme.fonts.headline}`}>{tier.price}</span>
                  {tier.period && <span className={`text-sm opacity-60 ${theme.colors.text}`}>{tier.period}</span>}
                </div>
                <p className={`text-sm mt-4 opacity-70 ${theme.colors.text}`}>{tier.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feat, fIdx) => (
                  <li key={fIdx} className={`flex items-center gap-3 text-sm ${theme.colors.text}`}>
                    <div className={`p-1 rounded-full ${tier.highlight ? theme.colors.accent : 'bg-slate-200'} text-white`}>
                      <Check size={10} className={tier.highlight ? 'text-white' : 'text-slate-500'} />
                    </div>
                    <span className="opacity-80">{feat}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl font-semibold transition-colors
                ${tier.highlight 
                  ? `${theme.colors.accent} text-white shadow-lg hover:brightness-110` 
                  : `bg-slate-100 ${theme.colors.text} hover:bg-slate-200`
                }
              `}>
                Start Connection
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
