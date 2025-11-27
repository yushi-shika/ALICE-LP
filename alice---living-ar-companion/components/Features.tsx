import React from 'react';
import { ThemeConfig } from '../types';
import { MessageCircleHeart, BrainCircuit, Blocks, Map, Calendar, Briefcase } from 'lucide-react';

interface FeaturesProps {
  theme: ThemeConfig;
}

export const Features: React.FC<FeaturesProps> = ({ theme }) => {
  const features = [
    {
      id: 'chat',
      icon: <MessageCircleHeart size={32} />,
      title: "Natural Conversation",
      description: "No prompts required. ALICE initiates chats, understands nuance, and speaks with emotional depth.",
      subIcon: null
    },
    {
      id: 'memory',
      icon: <BrainCircuit size={32} />,
      title: "Living Memory",
      description: "She remembers your favorite coffee spots, your childhood stories, and that you hate rainy Tuesdays.",
      subIcon: null
    },
    {
      id: 'agency',
      icon: <Blocks size={32} />,
      title: "Agency & Plugins",
      description: "ALICE connects to your world to get things done. She is your proactive agent in the digital space.",
      subIcons: [
        { label: 'Map', icon: <Map size={16} /> },
        { label: 'Calendar', icon: <Calendar size={16} /> },
        { label: 'Tasks', icon: <Briefcase size={16} /> }
      ]
    }
  ];

  return (
    <section className="py-24 relative bg-opacity-50">
        <div className="container mx-auto px-6">
            <div className="mb-16">
                 <h2 className={`text-5xl md:text-6xl ${theme.fontHeading} ${theme.textColor} mb-6`}>
                    Core <span className={theme.accentColor}>Capabilities</span>.
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                    <div 
                        key={index} 
                        className={`group relative p-8 rounded-[32px] ${theme.glassColor} border ${theme.glassBorder} transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden`}
                    >
                        {/* Hover Gradient Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${theme.bgGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                        <div className={`relative z-10 w-16 h-16 rounded-2xl ${theme.buttonBg} ${theme.buttonText} flex items-center justify-center mb-8 shadow-lg`}>
                            {feature.icon}
                        </div>
                        
                        <h3 className={`relative z-10 text-2xl font-bold ${theme.textColor} mb-4`}>
                            {feature.title}
                        </h3>
                        
                        <p className={`relative z-10 ${theme.mutedText} leading-relaxed mb-8`}>
                            {feature.description}
                        </p>

                        {feature.subIcons && (
                            <div className="relative z-10 flex gap-3 pt-6 border-t border-gray-200/20">
                                {feature.subIcons.map((sub, i) => (
                                    <div key={i} className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${theme.cardBg} border ${theme.glassBorder} text-xs font-medium ${theme.textColor}`}>
                                        {sub.icon}
                                        {sub.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};