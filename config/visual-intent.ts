
export type VisualMode =
  | 'restrained'
  | 'editorial'
  | 'technical'
  | 'luxury'
  | 'minimal'
  | 'expressive'
  | 'playful'
  | 'immersive';

export type VisualIntensity = 'low' | 'medium' | 'high';
export type ContentDensity = 'sparse' | 'balanced' | 'dense';

export interface VisualIntent {
  mode: VisualMode;
  intensity?: VisualIntensity;
  density?: ContentDensity;
  emphasis?: 'typography' | 'media' | 'data' | 'interaction';
}
