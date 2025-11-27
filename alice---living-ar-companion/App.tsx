import React from 'react';
import { THEMES } from './constants';
import { ProductShowcase } from './components/ProductShowcase';

const App: React.FC = () => {
  // Fixed theme: Pure Air
  const theme = THEMES['dreamer'];

  return (
    <div className={`min-h-screen transition-colors duration-700 ${theme.bgGradient} flex flex-col justify-center items-center`}>
      <div className="relative w-full max-w-[1920px]">
         <main>
            <ProductShowcase theme={theme} />
         </main>
      </div>
    </div>
  );
};

export default App;
