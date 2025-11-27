import { ThemeConfig, PricingTier } from './types';

export const THEMES: Record<string, ThemeConfig> = {
  dreamer: {
    name: "Pure Air",
    fontHeading: "font-['Cormorant_Garamond']",
    fontBody: "font-['Inter']",
    bgGradient: "bg-gradient-to-br from-white via-sky-50 to-blue-50",
    glassColor: "bg-white/60 backdrop-blur-xl",
    glassBorder: "border-white/60",
    textColor: "text-slate-800",
    mutedText: "text-slate-400",
    accentColor: "text-sky-500",
    buttonBg: "bg-sky-500",
    buttonText: "text-white",
    cardBg: "bg-white/40",
  },
  urbanite: {
    name: "Neon Night",
    fontHeading: "font-['Space_Grotesk']",
    fontBody: "font-['Inter']",
    bgGradient: "bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950",
    glassColor: "bg-black/40 backdrop-blur-xl",
    glassBorder: "border-white/10",
    textColor: "text-white",
    mutedText: "text-slate-400",
    accentColor: "text-cyan-400",
    buttonBg: "bg-white",
    buttonText: "text-black",
    cardBg: "bg-slate-900/50",
  },
  organic: {
    name: "Natural Flow",
    fontHeading: "font-['Cormorant_Garamond']",
    fontBody: "font-['Inter']",
    bgGradient: "bg-gradient-to-bl from-stone-100 via-orange-50 to-stone-200",
    glassColor: "bg-stone-50/60 backdrop-blur-lg",
    glassBorder: "border-stone-200/50",
    textColor: "text-stone-800",
    mutedText: "text-stone-500",
    accentColor: "text-orange-600",
    buttonBg: "bg-stone-800",
    buttonText: "text-stone-50",
    cardBg: "bg-white/40",
  }
};

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Acquaintance",
    price: "Free",
    description: "Meet ALICE and start your journey.",
    features: ["Basic Conversations", "Standard Avatar", "Local AR Guide (Limited)", "Daily Greeting"]
  },
  {
    name: "Close Friend",
    price: "$15/mo",
    description: "Deepen the bond with shared memories.",
    features: ["Remembering past conversations", "Emotional Growth", "Full City Guide", "Custom Outfits", "Photo Mode"],
    recommended: true
  },
  {
    name: "Soul Connection",
    price: "$25/mo",
    description: "A permanent presence in your life.",
    features: ["Unlimited Context Window", "Fully Custom Avatar Generation", "Proactive Initiations", "Exclusive AR Events", "Priority Evolution"]
  }
];