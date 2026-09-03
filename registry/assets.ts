
import { AssetConfig } from '@/config/assets';

export const assetRegistry: Record<string, AssetConfig> = {
  'engine-hero': {
    id: 'engine-hero',
    type: 'custom',
    role: 'hero',
    aspectRatio: 'wide',
    focalPoint: { x: 50, y: 50 },
    decorative: false,
    alt: 'Abstract representation of the engine architecture'
  },
  'architecture-diagram': {
    id: 'architecture-diagram',
    type: 'svg',
    role: 'diagram',
    aspectRatio: 'landscape',
    decorative: false,
    alt: 'System architecture diagram'
  },
};
