
export interface ConsistencyRules {
  typography: boolean;
  colors: boolean;
  spacing: boolean;
  containers: boolean;
  buttons: boolean;
  navigation: boolean;
  surfaces: boolean;
  motionLanguage: boolean;
}

export interface VariationRules {
  composition: boolean;
  sectionOrder: boolean;
  imagery: boolean;
  patternSelection: boolean;
  density: boolean;
  storytellingRhythm: boolean;
}

export interface PageVariationSystem {
  consistency: ConsistencyRules;
  variation: VariationRules;
}
