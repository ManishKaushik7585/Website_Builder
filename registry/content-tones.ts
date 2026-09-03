
import { ContentTone } from '@/config/content-intent';

export interface ToneBehavior {
  characteristics: string[];
  sentenceBehavior: string;
  forbiddenBehaviors: string[];
}

export const toneRegistry: Record<ContentTone, ToneBehavior> = {
  technical: {
    characteristics: ['precise', 'objective', 'structured'],
    sentenceBehavior: 'Short, declarative, active voice.',
    forbiddenBehaviors: ['hype', 'superlatives', 'poetic language']
  },
  editorial: {
    characteristics: ['narrative', 'rhythmic', 'engaging'],
    sentenceBehavior: 'Varied length, rhythmic structure.',
    forbiddenBehaviors: ['dry technical lists', 'corporate jargon']
  },
  professional: {
    characteristics: ['clear', 'polite', 'standard'],
    sentenceBehavior: 'Medium length, predictable.',
    forbiddenBehaviors: ['slang', 'overly playful terms']
  },
  minimal: {
    characteristics: ['terse', 'essential', 'quiet'],
    sentenceBehavior: 'Extreme brevity.',
    forbiddenBehaviors: ['adjectives', 'complex clauses']
  },
  conversational: {
    characteristics: ['friendly', 'accessible'],
    sentenceBehavior: 'Natural, spoken rhythm.',
    forbiddenBehaviors: ['stiff corporate speak']
  },
  authoritative: {
    characteristics: ['confident', 'direct'],
    sentenceBehavior: 'Declarative, definitive.',
    forbiddenBehaviors: ['hedge words', 'uncertainty']
  },
  playful: {
    characteristics: ['witty', 'lighthearted'],
    sentenceBehavior: 'Bouncy, occasional wordplay.',
    forbiddenBehaviors: ['stale jokes', 'forced humor']
  },
  luxury: {
    characteristics: ['restrained', 'elegant', 'exclusive'],
    sentenceBehavior: 'Paced, confident, sparse.',
    forbiddenBehaviors: ['shouting', 'urgency', 'cheap sales tactics']
  }
};
