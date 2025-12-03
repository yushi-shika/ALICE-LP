
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { THEMES, ThemeType } from './types';
import Hero from './components/Hero';
import ProductReveal from './components/ProductReveal';
import Features from './components/Features';
import InProgress from './components/InProgress';
import Pricing from './components/Pricing';
import WaitingList from './components/WaitingList';
import ContactPage from './pages/ContactPage';

const NavBar: React.FC<{ theme: ReturnType<typeof getTheme>; isScrolled: boolean }> = ({ theme, isScrolled }) => {
  const location = useLocation();
  const onHome = location.pathname === '/';

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-300 ${isScrolled ? 'bg-white/70 backdrop-blur-md shadow-sm border-b border-white/50' : 'bg-transparent'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className={`text-2xl font-bold tracking-tighter ${theme.colors.text} ${theme.fonts.headline}`}
          style={{ fontFamily: "'Lora', 'Cormorant Garamond', serif" }}
        >
          ALICE
        </Link>
        <div className="hidden md:flex gap-8 text-sm font-medium opacity-80">
          {onHome ? (
            <>
              <a href="#" className={`hover:opacity-100 ${theme.colors.text}`}>Teammember</a>
              <a href="#" className={`hover:opacity-100 ${theme.colors.text}`}>Manifest</a>
              <Link to="/contact" className={`hover:opacity-100 ${theme.colors.text}`}>Contact</Link>
            </>
          ) : (
            <>
              <Link to="/" className={`hover:opacity-100 ${theme.colors.text}`}>Home</Link>
              <Link to="/contact" className={`hover:opacity-100 ${theme.colors.text} underline underline-offset-4`}>Contact</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const getTheme = (currentTheme: ThemeType) => THEMES[currentTheme];

const HomePage: React.FC<{ theme: ReturnType<typeof getTheme> }> = ({ theme }) => (
  <div className={`min-h-screen transition-colors duration-700 ${theme.colors.bg} ${theme.fonts.body} selection:bg-sky-200 selection:text-sky-900`}>
    <main>
      <Hero theme={theme} />
      <ProductReveal theme={theme} />
      <Features theme={theme} />
      <InProgress theme={theme} />
      <Pricing theme={theme} />
      <WaitingList theme={theme} />
    </main>
  </div>
);


function App() {
  const [currentTheme] = useState<ThemeType>(ThemeType.Minimalist);
  const [isScrolled, setIsScrolled] = useState(false);
  const theme = getTheme(currentTheme);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-700 ${theme.colors.bg} ${theme.fonts.body} selection:bg-sky-200 selection:text-sky-900`}>
        <NavBar theme={theme} isScrolled={isScrolled} />

        <Routes>
          <Route path="/" element={<HomePage theme={theme} />} />
          <Route path="/contact" element={<ContactPage theme={theme} />} />
        </Routes>

        {/* Footer intentionally removed per request */}
      </div>
    </Router>
  );
}

export default App;
