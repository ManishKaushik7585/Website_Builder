
export interface GenerationContext {
  phase: string;
  viewport: 'desktop' | 'tablet' | 'mobile';
  visualMode: string;
  contentDensity: string;
  motionMode: string;
  accessibility: {
    reducedMotion: boolean;
    highContrast?: boolean;
  };
}
