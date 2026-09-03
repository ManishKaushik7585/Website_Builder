
export type ContentIntent =
  | 'inform'
  | 'explain'
  | 'differentiate'
  | 'convert'
  | 'reassure'
  | 'educate'
  | 'compare'
  | 'orient'
  | 'validate'
  | 'activate';

export type ContentTone =
  | 'technical'
  | 'editorial'
  | 'professional'
  | 'minimal'
  | 'conversational'
  | 'authoritative'
  | 'playful'
  | 'luxury';

export type ContentDensity =
  | 'minimal'
  | 'balanced'
  | 'dense';

export interface ContentIntentConfig {
  objective?: ContentIntent;
  tone?: ContentTone;
  density?: ContentDensity;
}
