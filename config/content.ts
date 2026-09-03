
export interface ContentBlock {
  id: string;
  intent?: import('./content-intent').ContentIntent;
  eyebrow?: string;
  title?: string;
  description?: string;
  body?: string;
  cta?: CTAContent;
  secondaryCta?: CTAContent;
}

export interface CTAContent {
  label: string;
  href: string;
  intent?: import('./content-intent').ContentIntent;
}

export interface MetricContent {
  value: string;
  label: string;
}

export interface FeatureContent {
  title: string;
  description: string;
  evidence?: string;
  action?: CTAContent;
}
