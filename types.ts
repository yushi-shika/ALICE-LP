
export enum ThemeType {
  Daydream = 'Daydream',
  DeepOcean = 'DeepOcean', // Renamed from NeonCity to match Blue theme
  Minimalist = 'Minimalist' // Renamed from Editorial
}

export interface ThemeConfig {
  name: ThemeType;
  colors: {
    bg: string;
    text: string;
    accent: string;
    accentSecondary: string;
    cardBg: string;
    buttonText: string;
    borderColor: string;
  };
  fonts: {
    headline: string;
    body: string;
  };
  vibe: {
    gradient: string;
    glass: string;
    shapes: string;
  };
}

export const THEMES: Record<ThemeType, ThemeConfig> = {
  [ThemeType.Daydream]: {
    name: ThemeType.Daydream,
    colors: {
      bg: 'bg-sky-50',
      text: 'text-slate-600',
      accent: 'bg-sky-400',
      accentSecondary: 'text-sky-500',
      cardBg: 'bg-white/80',
      buttonText: 'text-white',
      borderColor: 'border-white/60',
    },
    fonts: {
      headline: 'font-serif',
      body: 'font-sans',
    },
    vibe: {
      gradient: 'bg-gradient-to-br from-sky-100 via-white to-blue-50',
      glass: 'backdrop-blur-xl border border-white/60 shadow-xl shadow-sky-200/20',
      shapes: 'bg-sky-300/20',
    }
  },
  [ThemeType.DeepOcean]: {
    name: ThemeType.DeepOcean,
    colors: {
      bg: 'bg-[#0f172a]', // Slate 900
      text: 'text-sky-50',
      accent: 'bg-sky-500',
      accentSecondary: 'text-cyan-300',
      cardBg: 'bg-[#1e293b]/80', // Slate 800
      buttonText: 'text-white',
      borderColor: 'border-sky-500/30',
    },
    fonts: {
      headline: 'font-display',
      body: 'font-sans',
    },
    vibe: {
      gradient: 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900 via-[#0f172a] to-black',
      glass: 'backdrop-blur-md border border-sky-500/20 shadow-2xl shadow-sky-500/10',
      shapes: 'bg-cyan-500/10',
    }
  },
  [ThemeType.Minimalist]: {
    name: ThemeType.Minimalist,
    colors: {
      bg: 'bg-sky-50', // Daydream bg
      text: 'text-slate-900',
      accent: 'bg-[#38bdf8]', // Sky 400
      accentSecondary: 'text-[#0ea5e9]', // Sky 500
      cardBg: 'bg-slate-50',
      buttonText: 'text-white',
      borderColor: 'border-sky-100',
    },
    fonts: {
      headline: 'font-sans', // Clean sans for minimalist
      body: 'font-sans',
    },
    vibe: {
      gradient: 'bg-gradient-to-br from-sky-100 via-white to-blue-50', // Daydream gradient
      glass: 'border border-sky-100 shadow-sm',
      shapes: 'bg-sky-300/20', // Daydream shapes
    }
  }
};
