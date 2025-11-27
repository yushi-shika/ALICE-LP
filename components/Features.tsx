import React from 'react';
import { ThemeConfig } from '../types';

interface FeaturesProps {
   theme: ThemeConfig;
}

const Features: React.FC<FeaturesProps> = ({ theme }) => {
   return (
      <section className={`py-24 relative overflow-hidden ${theme.vibe.gradient}`}>
         <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
               <h2 className={`text-4xl md:text-5xl mb-6 ${theme.fonts.headline} ${theme.colors.text}`}>
                  Core <span className={theme.colors.accentSecondary}>Capabilities</span>
               </h2>
               <p className={`text-xl opacity-70 ${theme.fonts.body} ${theme.colors.text}`}>
                  ALICE integrates three pillars of intelligence to form a complete digital entity.
               </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

               {/* Feature 1: Chat */}
               <div className={`p-8 rounded-[2.5rem] ${theme.colors.cardBg} ${theme.vibe.glass} border hover:shadow-xl transition-shadow duration-300`}>
                  <h3 className={`text-2xl font-bold mb-4 ${theme.colors.text} ${theme.fonts.headline}`}>
                     Natural Chat
                  </h3>
                  <p className={`leading-relaxed opacity-70 mb-6 ${theme.colors.text}`}>
                     No prompts needed. She initiates conversation, understands nuance, jokes, and detects your mood through voice cadence.
                  </p>
                  <div className={`p-4 rounded-xl bg-sky-50 border border-sky-100 text-sm italic ${theme.colors.text} opacity-80`}>
                     "You sound tired today. Should we cancel your evening plans?"
                  </div>
               </div>

               {/* Feature 2: Memory */}
               <div className={`p-8 rounded-[2.5rem] ${theme.colors.cardBg} ${theme.vibe.glass} border hover:shadow-xl transition-shadow duration-300`}>
                  <h3 className={`text-2xl font-bold mb-4 ${theme.colors.text} ${theme.fonts.headline}`}>
                     Living Memory
                  </h3>
                  <p className={`leading-relaxed opacity-70 mb-6 ${theme.colors.text}`}>
                     A continuous thread of context. She remembers the name of your childhood pet and the restaurant you liked last Tuesday.
                  </p>
                  <div className="flex gap-2">
                     <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-medium">Long-term</span>
                     <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-medium">Contextual</span>
                  </div>
               </div>

               {/* Feature 3: Plugins (Agency) */}
               <div className={`p-8 rounded-[2.5rem] ${theme.colors.cardBg} ${theme.vibe.glass} border hover:shadow-xl transition-shadow duration-300`}>
                  <h3 className={`text-2xl font-bold mb-4 ${theme.colors.text} ${theme.fonts.headline}`}>
                     Agency Plugins
                  </h3>
                  <p className={`leading-relaxed opacity-70 mb-6 ${theme.colors.text}`}>
                     ALICE interacts with the world for you. Seamless integration with your daily tools.
                  </p>
                  <ul className="space-y-4">
                     <li className={`flex items-center gap-3 ${theme.colors.text} opacity-80`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                        <span className="text-sm font-medium">Navigation & Places</span>
                     </li>
                     <li className={`flex items-center gap-3 ${theme.colors.text} opacity-80`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                        <span className="text-sm font-medium">Smart Scheduling</span>
                     </li>
                     <li className={`flex items-center gap-3 ${theme.colors.text} opacity-80`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                        <span className="text-sm font-medium">Task Management</span>
                     </li>
                  </ul>
               </div>

            </div>
         </div>
      </section>
   );
};

export default Features;
