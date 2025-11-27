export type VariantName = 'dreamer' | 'urbanite' | 'organic';

export interface ThemeConfig {
  name: string;
  fontHeading: string;
  fontBody: string;
  bgGradient: string;
  glassColor: string;
  glassBorder: string;
  textColor: string;
  mutedText: string;
  accentColor: string;
  buttonBg: string;
  buttonText: string;
  cardBg: string;
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
}
