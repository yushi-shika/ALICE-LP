import React from 'react';
import { ThemeConfig } from '../types';

interface InProgressProps {
    theme: ThemeConfig;
}

const InProgress: React.FC<InProgressProps> = ({ theme }) => {
    return (
        <section className={`py-24 relative overflow-hidden ${theme.colors.bg}`}>
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className={`text-4xl md:text-5xl mb-6 ${theme.fonts.headline} ${theme.colors.text}`}>
                        We are still <span className={theme.colors.accentSecondary}>in progress</span>
                    </h2>
                    <p className={`max-w-2xl mx-auto opacity-70 ${theme.fonts.body} ${theme.colors.text}`}>
                        ALICE is constantly evolving. We are working day and night to bridge the gap between digital and physical reality.
                    </p>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Image 1: Playing */}
                    <div className="space-y-6 group">
                        <div className={`relative rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-2xl shadow-sky-200/30 ${theme.vibe.glass} border border-white/50 transition-transform duration-700 group-hover:scale-[1.02]`}>
                            <img
                                src="/playing.png"
                                alt="Interacting with ALICE"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
                            <div className="absolute bottom-6 left-6 right-6 text-white">
                                <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-medium mb-2">
                                    Beta Testing
                                </span>
                            </div>
                        </div>
                        <div className="px-4">
                            <h3 className={`text-2xl font-bold mb-2 ${theme.colors.text}`}>Real-world Interaction</h3>
                            <p className={`opacity-70 ${theme.colors.text}`}>
                                Testing ALICE's ability to understand and react to complex physical environments in real-time.
                            </p>
                        </div>
                    </div>

                    {/* Image 2: Unity Editing */}
                    <div className="space-y-6 group md:mt-24">
                        <div className={`relative rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-2xl shadow-sky-200/30 ${theme.vibe.glass} border border-white/50 transition-transform duration-700 group-hover:scale-[1.02]`}>
                            <img
                                src="/Unity-editing.webp"
                                alt="Developing ALICE Core"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
                            <div className="absolute bottom-6 left-6 right-6 text-white">
                                <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-medium mb-2">
                                    Core Development
                                </span>
                            </div>
                        </div>
                        <div className="px-4">
                            <h3 className={`text-2xl font-bold mb-2 ${theme.colors.text}`}>Neural Architecture</h3>
                            <p className={`opacity-70 ${theme.colors.text}`}>
                                Refining the underlying neural networks that power ALICE's emotional intelligence and memory.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default InProgress;
