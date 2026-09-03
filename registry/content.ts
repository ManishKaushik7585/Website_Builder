
import { ContentBlock } from '@/config/content';

export const contentRegistry: Record<string, ContentBlock> = {
  'home-hero-content': {
    id: 'home-hero-content',
    intent: 'inform',
    eyebrow: 'PREMIUM WEBSITE ENGINE',
    title: 'Engineered for AI. Designed for Humans.',
    description: 'A structured website engine where design intelligence, reusable components, responsive patterns, motion, and page composition work together as one system.',
    cta: { label: 'Explore the System', href: '#features', intent: 'activate' },
    secondaryCta: { label: 'View the Architecture', href: '#architecture', intent: 'educate' }
  }
};
