import React, { useState, useEffect } from 'react';
import { ThemeConfig } from '../types';

const IMAGES = ['/AR-image1.png', '/AR-image2.png', '/AR-image3.png'];
const CALLOUTS = [
  'Visual analysis complete. Enhancing reality with contextual data layers.',
  'Ambient cues mapped. I’ll surface what matters as you move.',
  'People, places, feelings—synced. Your world is now annotated in real time.'
];

interface HeroProps {
  theme: ThemeConfig;
}

const Hero: React.FC<HeroProps> = ({ theme }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Stop if we reached the last image
    if (currentImageIndex === IMAGES.length - 1) return;

    const timeout = setTimeout(() => {
      setCurrentImageIndex((prev) => prev + 1);
    }, 6500); // Change image every ~6.5 seconds

    return () => clearTimeout(timeout);
  }, [currentImageIndex]);

  return (
    <section className={`relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 ${theme.fonts.body}`}>
      {/* Background Decorative Elements */}
      <div className={`absolute top-0 left-0 w-full h-full ${theme.vibe.gradient} -z-20`} />
      <div className={`absolute top-20 right-10 w-96 h-96 rounded-full blur-3xl ${theme.vibe.shapes} -z-10 animate-pulse`} />
      <div className={`absolute bottom-20 left-10 w-72 h-72 rounded-full blur-3xl ${theme.vibe.shapes} -z-10 animate-float`} />

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">

        {/* Text Content */}
        <div className="space-y-8 z-10 order-2 lg:order-1">
          <h1 className={`text-6xl md:text-7xl lg:text-8xl leading-[0.9] ${theme.fonts.headline} ${theme.colors.text}`}>
            Join the <br />
            <span className={`italic ${theme.colors.accentSecondary}`}>First Generation</span> <br />
            of ALICE
          </h1>

          <p className={`text-xl md:text-2xl opacity-80 max-w-lg ${theme.colors.text}`}>
            Not a bot. A presence. The first AI companion designed to live alongside you in the physical world.
          </p>

          {/* CTA intentionally removed per request */}
        </div>

        {/* Visual Content */}
        <div className="relative h-[600px] w-full flex justify-center lg:justify-end z-10 order-1 lg:order-2">
          <div className={`relative w-full h-full max-w-md rounded-[3rem] overflow-hidden ${theme.vibe.glass} p-2 border-white/50`}>
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden">
              {/* Image Stack for Cross-fade */}
              {IMAGES.map((src, index) => (
                <img
                  key={src}
                  src={src}
                  alt={`ALICE AR Interface ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2000ms] ease-in-out ${index === currentImageIndex ? 'opacity-90 scale-100' : 'opacity-0 scale-105'
                    }`}
                />
              ))}

              <div className="absolute inset-0 bg-gradient-to-t from-sky-900/30 to-transparent z-10" />

              {/* Floating UI Elements */}
              <div className="absolute bottom-10 left-6 right-6 p-6 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/40 text-white shadow-xl z-20">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs uppercase tracking-widest">Status</span>
                  <span className="flex items-center gap-2 text-xs">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Online
                  </span>
                </div>
                <p className="text-lg font-serif italic">"{CALLOUTS[currentImageIndex] ?? CALLOUTS[CALLOUTS.length - 1]}"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
