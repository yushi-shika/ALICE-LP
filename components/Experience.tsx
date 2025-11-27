
import React from 'react';
import { ThemeConfig } from '../types';
import { Glasses, Navigation, Camera } from 'lucide-react';

interface ExperienceProps {
  theme: ThemeConfig;
}

const Experience: React.FC<ExperienceProps> = ({ theme }) => {
  return (
    <section className={`py-24 ${theme.vibe.gradient}`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="lg:w-1/2 order-2 lg:order-1 relative">
             {/* Mock Phone UI */}
             <div className="relative mx-auto border-slate-200 dark:border-slate-800 bg-slate-100 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] md:w-[350px] shadow-2xl shadow-sky-200/50 overflow-hidden">
                <div className="w-full h-full relative">
                  <img src="https://picsum.photos/seed/architecture/400/800" className="w-full h-full object-cover" alt="Street View" />
                  
                  {/* AR Overlay Layer */}
                  <div className="absolute inset-0 z-10 p-6 flex flex-col justify-between bg-sky-900/10">
                    {/* Top Bar */}
                    <div className="flex justify-between items-center text-white text-xs font-mono tracking-widest drop-shadow-md">
                      <span>AR MODE: ON</span>
                      <span>12:42 PM</span>
                    </div>

                    {/* AR Markers */}
                    <div className="absolute top-1/3 right-10 flex items-center gap-2 animate-float">
                      <div className="bg-white/30 backdrop-blur-md p-3 rounded-xl border border-white/60 text-white text-xs max-w-[140px] shadow-lg">
                        <p className="font-medium text-slate-800">Recommended: "Best matcha latte."</p>
                      </div>
                      <div className="w-3 h-3 bg-sky-400 rounded-full ring-4 ring-white/50"></div>
                    </div>

                    {/* Bottom Controls */}
                    <div className="w-full bg-white/30 backdrop-blur-xl rounded-3xl p-4 border border-white/40 shadow-lg">
                       <div className="flex justify-around text-white">
                          <div className="flex flex-col items-center gap-1 opacity-80 hover:opacity-100 cursor-pointer">
                            <Navigation size={20} />
                            <span className="text-[10px]">Guide</span>
                          </div>
                          <div className="flex flex-col items-center gap-1 text-sky-100 hover:text-white cursor-pointer scale-110">
                            <Camera size={24} />
                            <span className="text-[10px] font-bold">Capture</span>
                          </div>
                          <div className="flex flex-col items-center gap-1 opacity-80 hover:opacity-100 cursor-pointer">
                            <Glasses size={20} />
                            <span className="text-[10px]">Wearables</span>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
             </div>
          </div>

          <div className="lg:w-1/2 order-1 lg:order-2 space-y-8">
            <h2 className={`text-4xl md:text-6xl ${theme.fonts.headline} ${theme.colors.text}`}>
              See the world through <br/>
              <span className={theme.colors.accentSecondary}>Her Eyes.</span>
            </h2>
            <p className={`text-lg md:text-xl opacity-75 ${theme.colors.text} ${theme.fonts.body} leading-relaxed`}>
              Connect your AR glasses or use your phone to bring ALICE into the physical world. She points out hidden gems, translates foreign menus instantly, and offers commentary on the architecture around you.
            </p>
            
            <ul className={`space-y-4 ${theme.fonts.body} ${theme.colors.text}`}>
              <li className={`flex items-center gap-4 p-4 rounded-xl ${theme.colors.cardBg} ${theme.colors.borderColor} border hover:shadow-lg transition-all`}>
                <div className={`p-2 rounded-lg ${theme.colors.accent} text-white`}>
                   <Navigation size={20} />
                </div>
                <div>
                  <h4 className="font-bold">City Guide Mode</h4>
                  <p className="text-sm opacity-70">Curated tours based on your shared interests.</p>
                </div>
              </li>
               <li className={`flex items-center gap-4 p-4 rounded-xl ${theme.colors.cardBg} ${theme.colors.borderColor} border hover:shadow-lg transition-all`}>
                <div className={`p-2 rounded-lg ${theme.colors.accent} text-white`}>
                   <Glasses size={20} />
                </div>
                <div>
                  <h4 className="font-bold">Spatial Memories</h4>
                  <p className="text-sm opacity-70">Leave digital notes for each other at physical locations.</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;
