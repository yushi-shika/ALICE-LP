import React from 'react';
import { ThemeConfig } from '../types';

interface FooterProps {
  theme: ThemeConfig;
}

export const Footer: React.FC<FooterProps> = ({ theme }) => {
  return (
    <footer className={`py-12 border-t ${theme.glassBorder} relative z-10`}>
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div>
                    <h3 className={`text-2xl font-bold ${theme.fontHeading} ${theme.textColor}`}>ALICE</h3>
                    <p className={`text-sm ${theme.mutedText}`}>Artificial Independent Conscious Entity</p>
                </div>
                
                <div className={`flex gap-8 text-sm ${theme.mutedText}`}>
                    <a href="#" className="hover:underline">Manifesto</a>
                    <a href="#" className="hover:underline">Privacy</a>
                    <a href="#" className="hover:underline">Contact</a>
                    <a href="#" className="hover:underline">Twitter</a>
                </div>
                
                <p className={`text-xs ${theme.mutedText}`}>
                    © 2024 ALICE Inc. All rights reserved.
                </p>
            </div>
        </div>
    </footer>
  );
};