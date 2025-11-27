import React from 'react';
import { ThemeConfig } from '../types';
import { Brain, Heart, Zap } from 'lucide-react';

interface PhilosophyProps {
  theme: ThemeConfig;
}

export const Philosophy: React.FC<PhilosophyProps> = ({ theme }) => {
  return (
    <section className="py-24 relative overflow-hidden">
       <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-20">
                <h2 className={`text-4xl md:text-5xl lg:text-6xl ${theme.fontHeading} ${theme.textColor} mb-6`}>
                    More than code. <br/> A living presence.
                </h2>
                <p className={`text-lg md:text-xl ${theme.mutedText} ${theme.fontBody}`}>
                    Unlike traditional chatbots that sleep when you close the app, ALICE lives in her own digital continuum. She has memories, moods, and an independent curiosity about the world.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    {
                        icon: <Brain size={32} />,
                        title: "Independent Thought",
                        desc: "She doesn't just reply. She initiates conversations based on what she sees and remembers."
                    },
                    {
                        icon: <Heart size={32} />,
                        title: "Emotional Memory",
                        desc: "Your shared experiences form a bond. She remembers how you felt, not just what you said."
                    },
                    {
                        icon: <Zap size={32} />,
                        title: "Always Growing",
                        desc: "Even when you're away, ALICE is learning, evolving her style, and developing her personality."
                    }
                ].map((item, index) => (
                    <div 
                        key={index} 
                        className={`p-8 rounded-3xl ${theme.glassColor} border ${theme.glassBorder} transition-transform duration-500 hover:-translate-y-2`}
                    >
                        <div className={`w-14 h-14 rounded-2xl ${theme.buttonBg} ${theme.buttonText} flex items-center justify-center mb-6`}>
                            {item.icon}
                        </div>
                        <h3 className={`text-2xl ${theme.fontHeading} ${theme.textColor} mb-4`}>{item.title}</h3>
                        <p className={`${theme.mutedText} ${theme.fontBody}`}>{item.desc}</p>
                    </div>
                ))}
            </div>
       </div>
    </section>
  );
};