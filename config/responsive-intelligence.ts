import { SectionPurpose, ContentPriority } from './content-intelligence';

export type ViewportClass = 'mobile' | 'tablet' | 'desktop' | 'wide-desktop';

export interface ViewportRange {
  name: ViewportClass;
  minWidth: number;
  maxWidth: number;
}

export const VIEWPORTS: ViewportRange[] = [
  { name: 'mobile', minWidth: 0, maxWidth: 767 },
  { name: 'tablet', minWidth: 768, maxWidth: 1023 },
  { name: 'desktop', minWidth: 1024, maxWidth: 1439 },
  { name: 'wide-desktop', minWidth: 1440, maxWidth: 9999 }
];

export type ResponsiveMode = 
  | 'stack' 
  | 'collapse' 
  | 'reorder' 
  | 'hide-secondary' 
  | 'horizontal-scroll' 
  | 'grid-to-list' 
  | 'grid-to-stack' 
  | 'split-to-stack' 
  | 'sidebar-to-drawer' 
  | 'navigation-to-menu' 
  | 'inline-to-wrap' 
  | 'overlay-to-flow' 
  | 'fixed-to-fluid';

export type ResponsiveTransformationType = 
  | 'preserve' 
  | 'adapt' 
  | 'transform' 
  | 'hide' 
  | 'reorder';

export interface ResponsiveTransformation {
  sourceLayout: string;
  targetLayout: ResponsiveMode;
  affectedSection: SectionPurpose;
  triggerCondition: ViewportClass;
  preservedPriority: ContentPriority[];
  type: ResponsiveTransformationType;
  expectedBehavior: string;
}

export interface ResponsiveBehavior {
  sectionPurpose: SectionPurpose;
  transformations: ResponsiveTransformation[];
}

export interface ResponsiveConstraint {
  allowHidingPrimary: boolean;
  allowHorizontalScroll: boolean;
  minTouchTargetSize: number;
  preventOrphanedText: boolean;
}

export interface ResponsiveObservation {
  viewport: ViewportClass;
  actualWidth: number;
  section: SectionPurpose;
  hasHorizontalOverflow: boolean;
  isContentClipped: boolean;
  hasCollapsedHierarchy: boolean;
}

export interface ResponsivePlan {
  pageId: string;
  globalConstraints: ResponsiveConstraint;
  behaviors: ResponsiveBehavior[];
}
