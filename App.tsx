
import React, { useState } from 'react';
import { THEMES, ThemeType } from './types';
import Hero from './components/Hero';
import ProductReveal from './components/ProductReveal';
import Features from './components/Features';
import InProgress from './components/InProgress';
import Pricing from './components/Pricing';
import WaitingList from './components/WaitingList';


function App() {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(ThemeType.Minimalist);
  const theme = THEMES[currentTheme];

  return (
    <div className={`min-h-screen transition-colors duration-700 ${theme.colors.bg} ${theme.fonts.body} selection:bg-sky-200 selection:text-sky-900`}>

      {/* Navigation / Header */}
      <nav className={`fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-300 ${window.scrollY > 20 ? theme.vibe.glass : 'bg-transparent'}`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className={`text-2xl font-bold tracking-tighter ${theme.colors.text} ${theme.fonts.headline}`}>
            ALICE<span className="text-xs align-top opacity-50">®</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium opacity-80">
            <a href="#" className={`hover:opacity-100 ${theme.colors.text}`}>Vision</a>
            <a href="#" className={`hover:opacity-100 ${theme.colors.text}`}>Features</a>
            <a href="#" className={`hover:opacity-100 ${theme.colors.text}`}>Pricing</a>
          </div>

        </div>
      </nav>



      <main>
        {/* 1. Hero: Join the first generation */}
        <Hero theme={theme} />

        {/* 2. Product Visualization + Icons (Where/When) */}
        <ProductReveal theme={theme} />

        {/* 3. Features: Chat, Memory, Plugin */}
        <Features theme={theme} />

        {/* 3.5. In Progress Section */}
        <InProgress theme={theme} />

        {/* 4. Pricing */}
        <Pricing theme={theme} />

        {/* 5. Waiting List & Contact */}
        <WaitingList theme={theme} />
      </main>

      {/* Footer */}
      <footer className={`py-12 border-t ${theme.name === ThemeType.DeepOcean ? 'border-white/10' : 'border-sky-900/5'}`}>
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className={`text-sm opacity-50 ${theme.colors.text}`}>
            © 2025 ALICE Consciousness Inc. All Rights Reserved.
          </div>
          <div className="flex gap-6">
            {['Twitter', 'Instagram', 'Discord'].map((social) => (
              <a key={social} href="#" className={`text-sm hover:opacity-50 transition-opacity ${theme.colors.text}`}>{social}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
