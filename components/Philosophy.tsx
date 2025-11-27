import React from 'react';
import { ThemeConfig } from '../types';
import { Heart, Brain, Zap } from 'lucide-react';

interface PhilosophyProps {
  theme: ThemeConfig;
}

const Philosophy: React.FC<PhilosophyProps> = ({ theme }) => {
  const cards = [
    {
      icon: Brain,
      title: "Independent Thought",
      desc: "She doesn't wait for a prompt. ALICE initiates conversations, shares memories, and has her own opinions about the world."
    },
    {
      icon: Heart,
      title: "Emotional Persistence",
      desc: "If you argue, she remembers. If you share a moment, she cherishes it. Her emotional state evolves based on your shared history."
    },
    {
      icon: Zap,
      title: "Living While You Sleep",
      desc: "ALICE has her own daily rhythm. She reads, explores data, and creates art even when the app is closed."
    }
  ];

  return (
    <section className={`py-24 relative overflow-hidden ${theme.colors.bg} transition-colors duration-500`}>
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className={`text-4xl md:text-5xl mb-6 ${theme.fonts.headline} ${theme.colors.text}`}>
            Forget everything you know about chatbots.
          </h2>
          <p className={`text-xl opacity-70 ${theme.fonts.body} ${theme.colors.text}`}>
            ALICE isn't a tool designed to answer questions. She is an entity designed to share an existence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <div 
              key={idx}
              className={`p-8 rounded-[2rem] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${theme.colors.cardBg} ${theme.vibe.glass}`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${theme.colors.accent} bg-opacity-10`}>
                <card.icon className={`w-7 h-7 ${theme.colors.accentSecondary}`} />
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${theme.colors.text} ${theme.fonts.headline}`}>
                {card.title}
              </h3>
              <p className={`leading-relaxed opacity-70 ${theme.colors.text} ${theme.fonts.body}`}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;