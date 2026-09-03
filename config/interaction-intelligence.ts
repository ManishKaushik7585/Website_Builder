import { SectionPurpose } from './content-intelligence';
import { ViewportClass } from './responsive-intelligence';

export type InteractionIntent = 'navigate' | 'submit' | 'expand' | 'collapse' | 'dismiss' | 'confirm' | 'cancel' | 'select' | 'open-modal' | 'close-modal' | 'play-media';

export type InteractionType = 'click' | 'hover' | 'focus' | 'press' | 'swipe' | 'scroll';

export type InteractionPriority = 'primary' | 'secondary' | 'tertiary' | 'destructive';

export type InteractionState = 'idle' | 'hover' | 'focus' | 'active' | 'disabled' | 'loading' | 'success' | 'error' | 'empty';

export type InteractionAffordance = 'button' | 'link' | 'tab' | 'accordion' | 'card' | 'input' | 'checkbox' | 'radio' | 'toggle' | 'slider';

export type InteractionDeviceMode = 'pointer' | 'touch' | 'keyboard' | 'screen-reader';

export interface InteractionFeedback {
  requiresLoadingState: boolean;
  requiresSuccessState: boolean;
  requiresErrorState: boolean;
  announcesToScreenReader: boolean;
}

export interface InteractionRequirement {
  intent: InteractionIntent;
  affordance: InteractionAffordance;
  priority: InteractionPriority;
  supportedDevices: InteractionDeviceMode[];
  feedback: InteractionFeedback;
  isDestructive: boolean;
  requiresConfirmation: boolean;
}

export interface InteractionBehavior {
  sectionPurpose: SectionPurpose;
  elementId: string;
  requirements: InteractionRequirement[];
}

export interface InteractionConstraint {
  requireKeyboardFocus: boolean;
  requireTouchTargets: boolean;
  preventEmptyStates: boolean;
  enforceDestructiveConfirmation: boolean;
}

export type InteractionScope = 'viewport-specific' | 'component-specific' | 'page-specific' | 'site-wide';

export interface InteractionObservation {
  elementId: string;
  section: SectionPurpose;
  viewport: ViewportClass;
  device: InteractionDeviceMode;
  isMissingFocus: boolean;
  isMissingKeyboard: boolean;
  isMissingFeedback: boolean;
  isDestructiveUnprotected: boolean;
  hasContradictoryState: boolean;
}

export interface InteractionPlan {
  pageId: string;
  globalConstraints: InteractionConstraint;
  behaviors: InteractionBehavior[];
}
