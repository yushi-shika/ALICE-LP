import React from 'react';
import { ThemeConfig } from '../types';

interface ButtonProps {
  children: React.ReactNode;
  theme: ThemeConfig;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ children, theme, variant = 'primary', className = '', onClick }) => {
  let baseStyles = `px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 ${theme.fontBody}`;
  
  let variantStyles = '';
  
  switch (variant) {
    case 'primary':
      variantStyles = `${theme.buttonBg} ${theme.buttonText} shadow-lg hover:shadow-xl`;
      break;
    case 'secondary':
      variantStyles = `${theme.glassColor} ${theme.glassBorder} border ${theme.textColor} hover:bg-opacity-70`;
      break;
    case 'outline':
      variantStyles = `border ${theme.glassBorder} ${theme.textColor} hover:${theme.glassColor}`;
      break;
  }

  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};