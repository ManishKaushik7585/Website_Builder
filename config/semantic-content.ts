export type SemanticEntity = SemanticText | SemanticAsset | SemanticCollection | SemanticAction;

export interface SemanticText {
  entity: 'text';
  role: 'heading' | 'body' | 'eyebrow' | 'caption' | 'manifesto' | 'quote' | 'label' | 'metadata';
  content: string;
}

export interface SemanticAsset {
  entity: 'asset';
  type: 'image' | 'video' | 'illustration' | '3d';
  subject: string;
  dominance: 'immersive' | 'leading' | 'supporting' | 'minimal';
  treatment: 'full-bleed' | 'contained' | 'floating' | 'masked';
  overlapIntent: 'none' | 'foreground' | 'background';
  focalPoint?: 'center' | 'top' | 'right' | 'bottom' | 'left';
  priority?: 'eager' | 'lazy';
  src?: string;
  alt?: string;
}

export interface SemanticCollection {
  entity: 'collection';
  items: SemanticEntity[];
}

export interface SemanticAction {
  entity: 'action';
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
}

export function isSemanticEntity(obj: any): obj is SemanticEntity {
  return obj !== null && typeof obj === 'object' && 'entity' in obj;
}

export function isSemanticText(obj: any): obj is SemanticText {
  return isSemanticEntity(obj) && obj.entity === 'text';
}

export function isSemanticAsset(obj: any): obj is SemanticAsset {
  return isSemanticEntity(obj) && obj.entity === 'asset';
}

export function isSemanticCollection(obj: any): obj is SemanticCollection {
  return isSemanticEntity(obj) && obj.entity === 'collection';
}

export function isSemanticAction(obj: any): obj is SemanticAction {
  return isSemanticEntity(obj) && obj.entity === 'action';
}
