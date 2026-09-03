
import { VisualMode } from '@/config/visual-intent';

export const visualModes: Record<VisualMode, { description: string }> = {
  restrained: { description: 'Generous whitespace, strong typography, limited decorative effects.' },
  editorial: { description: 'Asymmetric composition, large display moments, controlled cropping.' },
  technical: { description: 'Precise grid alignment, data emphasis, structured surfaces.' },
  luxury: { description: 'Very low visual density, restrained color, minimal decoration.' },
  minimal: { description: 'Few visual elements, flat surfaces, deliberate spacing.' },
  expressive: { description: 'Strong scale contrast, dramatic typography, higher visual intensity.' },
  playful: { description: 'Approachable typography, controlled color variation, friendly imagery.' },
  immersive: { description: 'Large media, strong visual moments, deeper composition.' }
};
