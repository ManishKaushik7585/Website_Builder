import { CreativeDirectionContract } from '@/config/creative-direction';
import { PageRole } from '@/config/page-role';

export interface ResolvedLayoutIntent {
  layoutType: 'symmetric' | 'asymmetric' | 'editorial' | 'minimal' | 'dense' | 'experimental' | 'cinematic';
  composition: 'centered' | 'split' | 'asymmetric-split' | 'editorial-columns' | 'staggered-collection' | 'featured-supporting' | 'media-narrative' | 'layered-overlap' | 'visual-interruption' | 'stacked';
  alignment: 'center' | 'offset' | 'edge-aligned';
  contentDensity: 'spacious' | 'balanced' | 'compact';
  heroBalance: 'text-dominant' | 'visual-dominant' | 'balanced';
  responsiveTransformation: 'stack-early' | 'stack-late' | 'preserve-split';
}

export interface ResolvedTypographyIntent {
  fluidityPreference: 'static' | 'fluid';
  displayScale: 'moderate' | 'large';
  maxLineLength: 'narrow' | 'optimal' | 'wide';
}

/**
 * Deterministically resolves Layout Intent and Typography Intent using strict hierarchy:
 * 1. Explicit Component Override (if passed through context)
 * 2. Page Role Context
 * 3. Creative Direction
 * 4. Safe Default
 */
export function resolveIntent(
  direction: CreativeDirectionContract,
  pageRole?: PageRole,
  explicitOverrides?: Partial<ResolvedLayoutIntent>
): { layout: ResolvedLayoutIntent; typography: ResolvedTypographyIntent } {
  
  // Safe Defaults
  const defaultLayout: ResolvedLayoutIntent = {
    layoutType: 'symmetric',
    composition: 'centered',
    alignment: 'center',
    contentDensity: 'balanced',
    heroBalance: 'balanced',
    responsiveTransformation: 'stack-early',
  };

  const defaultTypography: ResolvedTypographyIntent = {
    fluidityPreference: 'fluid',
    displayScale: 'moderate',
    maxLineLength: 'optimal',
  };

  // Resolve Layout
  let rawComposition = explicitOverrides?.composition 
    || pageRole?.layoutIntent?.compositionIntent 
    || direction.layout?.compositionIntent 
    || defaultLayout.composition;

  const layout: ResolvedLayoutIntent = {
    layoutType: explicitOverrides?.layoutType
      || pageRole?.layoutIntent?.layoutType
      || direction.layout?.layoutIntent
      || defaultLayout.layoutType,
      
    composition: rawComposition,
      
    alignment: explicitOverrides?.alignment
      || direction.layout?.alignmentIntent
      || defaultLayout.alignment,

    contentDensity: explicitOverrides?.contentDensity
      || direction.layout?.contentDensity 
      || defaultLayout.contentDensity,
      
    heroBalance: explicitOverrides?.heroBalance 
      || pageRole?.layoutIntent?.heroBalance 
      || direction.layout?.heroBalance 
      || defaultLayout.heroBalance,
      
    responsiveTransformation: explicitOverrides?.responsiveTransformation 
      || direction.layout?.responsiveTransformation 
      || defaultLayout.responsiveTransformation,
  };

  // Resolve Typography
  const typography: ResolvedTypographyIntent = {
    fluidityPreference: direction.typography?.fluidityPreference || defaultTypography.fluidityPreference,
    displayScale: direction.typography?.displayScale || defaultTypography.displayScale,
    maxLineLength: direction.typography?.maxLineLength || defaultTypography.maxLineLength,
  };

  return { layout, typography };
}
