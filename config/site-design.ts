
export interface BrandExpression {
  brandCharacter: 'minimal' | 'bold' | 'elegant' | 'playful' | 'technical' | 'editorial';
  visualPersonality: string;
  communicationStyle: 'direct' | 'conversational' | 'authoritative' | 'evocative';
  visualConfidence: 'high' | 'medium' | 'low';
  densityPreference: 'sparse' | 'balanced' | 'dense';
  imagePreference: 'photography' | 'illustration' | 'abstract' | 'minimal';
  motionPreference: 'reduced' | 'subtle' | 'standard' | 'expressive';
}

export interface SiteColorSystem {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  surfaceMuted: string;
  text: string;
  textMuted: string;
  border: string;
  success: string;
  warning: string;
  error: string;
}

export interface SiteTypographySystem {
  display: string;
  heading: string;
  subheading: string;
  body: string;
  label: string;
  caption: string;
  eyebrow: string;
  button: string;
  navigation: string;
}

export interface SiteSpacingSystem {
  sectionSpacing: string;
  componentSpacing: string;
  contentSpacing: string;
  inlineSpacing: string;
  pagePadding: string;
  containerGap: string;
}

export interface SiteSurfaceSystem {
  radius: string;
  border: string;
  shadow: string;
  surfaceContrast: 'low' | 'medium' | 'high';
  elevation: string;
}

export interface SiteGridSystem {
  columns: number;
  gutter: string;
  containerWidth: string;
  alignment: 'center' | 'left' | 'right';
  contentMaxWidth: string;
}

export interface SiteContainerSystem {
  maxWidth: string;
  pagePadding: string;
  sectionPadding: string;
  contentWidth: string;
  readingWidth: string;
  mediaWidth: string;
}

export interface SiteMotionSystem {
  intensity: 'low' | 'medium' | 'high';
  duration: string;
  easing: string;
}

export interface SiteResponsiveSystem {
  strategy: 'mobile-first' | 'desktop-first' | 'balanced';
}

export interface SiteAccessibilitySystem {
  contrast: 'standard' | 'high';
  reducedMotion: boolean;
}

export interface SiteDesignSystem {
  brand: BrandExpression;
  color: SiteColorSystem;
  typography: SiteTypographySystem;
  spacing: SiteSpacingSystem;
  surface: SiteSurfaceSystem;
  grid: SiteGridSystem;
  container: SiteContainerSystem;
  motion: SiteMotionSystem;
  responsive: SiteResponsiveSystem;
  accessibility: SiteAccessibilitySystem;
}
