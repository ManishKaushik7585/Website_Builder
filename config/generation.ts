/* eslint-disable @typescript-eslint/no-explicit-any */
export type GenerationObjective = string;
export type GenerationAudience = string;
export type GenerationConstraint = string;
export type GenerationRequirement = string;
export type GenerationReference = string;
export type GenerationPreference = string;

export interface GenerationBrief {
  projectName: string;
  description: string;
  audience?: GenerationAudience;
  industry?: string;
  objective?: GenerationObjective;
  primaryAction?: string;
  secondaryActions?: string[];
  tone?: string[];
  visualDirection?: string[];
  requiredPages?: string[];
  requiredSections?: string[];
  constraints?: GenerationConstraint[];
  references?: GenerationReference[];
}

export interface GenerationSectionPlan {
  id: string;
  section: string;
  pattern?: string;
  visualIntent?: string;
  asset?: string;
  props?: Record<string, unknown>;
}

export interface GenerationPlan {
  brief: GenerationBrief;
  objective: GenerationObjective;
  template?: string;
  contentIntent?: any; // Mapped to ContentIntent
  visualIntent?: any; // Mapped to VisualIntent
  artDirection?: any;
  assetPlan?: any;
  motionPlan?: any;
  sections: GenerationSectionPlan[];
}
