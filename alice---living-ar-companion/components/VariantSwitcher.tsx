import React from 'react';
import { VariantName } from '../types';
import { THEMES } from '../constants';
import { Palette } from 'lucide-react';

interface VariantSwitcherProps {
  currentVariant: VariantName;
  setVariant: (v: VariantName) => void;
}

export const VariantSwitcher: React.FC<VariantSwitcherProps> = ({ currentVariant, setVariant }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {isOpen && (
        <div className="bg-white/90 backdrop-blur-md p-2 rounded-2xl shadow-2xl border border-white/20 mb-2 flex flex-col gap-2 min-w-[160px] animate-in slide-in-from-bottom-5 fade-in duration-300">
            <span className="text-xs font-semibold text-slate-400 px-2 uppercase tracking-wider">Select Theme</span>
            {(Object.keys(THEMES) as VariantName[]).map((key) => (
                <button
                    key={key}
                    onClick={() => setVariant(key)}
                    className={`text-left px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                        currentVariant === key 
                        ? 'bg-slate-900 text-white' 
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                >
                    {THEMES[key].name}
                </button>
            ))}
        </div>
      )}
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 bg-slate-900 text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
      >
        <Palette size={24} />
      </button>
    </div>
  );
};