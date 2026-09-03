
export type AssetRole =
  | 'hero'
  | 'editorial'
  | 'product'
  | 'feature'
  | 'testimonial'
  | 'social-proof'
  | 'background'
  | 'decorative'
  | 'diagram'
  | 'illustration'
  | 'icon'
  | 'video'
  | '3d'
  | 'avatar';

export type MediaType =
  | 'image'
  | 'svg'
  | 'video'
  | 'illustration'
  | 'icon'
  | '3d'
  | 'custom';

export type AssetAspectRatio =
  | 'square'
  | 'portrait'
  | 'landscape'
  | 'wide'
  | 'ultrawide'
  | 'auto';

export interface AssetResponsiveConfig {
  src?: string;
  aspectRatio?: AssetAspectRatio;
}

export interface AssetConfig {
  id: string;
  type: MediaType;
  role: AssetRole;

  src?: string;
  alt?: string;

  width?: number;
  height?: number;

  aspectRatio?: AssetAspectRatio;

  focalPoint?: {
    x: number;
    y: number;
  };

  fit?: 'cover' | 'contain' | 'fill';
  position?: 'center' | 'top' | 'right' | 'bottom' | 'left';
  decorative?: boolean;
  priority?: boolean;

  responsive?: {
    mobile?: AssetResponsiveConfig;
    tablet?: AssetResponsiveConfig;
    desktop?: AssetResponsiveConfig;
  };
}
