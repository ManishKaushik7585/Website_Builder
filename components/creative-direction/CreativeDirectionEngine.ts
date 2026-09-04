import { CreativeDirectionAlternative } from '../../config/creative-direction';

export type EngineMode = 'deterministic' | 'mock' | 'provider';

export interface CreativeDirectionProvider {
  generateAlternatives(context: string): Promise<CreativeDirectionAlternative[]>;
}

export class MockCreativeProvider implements CreativeDirectionProvider {
  async generateAlternatives(context: string): Promise<CreativeDirectionAlternative[]> {
    // Generate 3 mock alternatives based on some basic heuristics from the context.
    const hasEcommerce = context.toLowerCase().includes('ecommerce');
    const isTech = context.toLowerCase().includes('tech') || context.toLowerCase().includes('saas');

    const alternatives: CreativeDirectionAlternative[] = [
      {
        id: 'alt-1',
        name: isTech ? 'Technical Minimal' : 'Premium Editorial',
        identity: 'Clean, stripped back, high utility',
        strengths: ['Fast loading', 'High conversion focus', 'Content first'],
        risks: ['May feel too generic if typography is poor', 'Lacks emotional warmth'],
        bestFitConditions: ['Data dense pages', 'Technical audiences'],
        supportingEvidenceIds: ['ev-brief', 'ev-adaptive-1'],
        technicalImplications: ['Low bundle size', 'High accessibility'],
      },
      {
        id: 'alt-2',
        name: hasEcommerce ? 'Immersive Commerce' : 'Experimental Digital',
        identity: 'Bold imagery, distinct layout, engaging interactions',
        strengths: ['High memorability', 'Strong brand expression'],
        risks: ['Accessibility challenges with contrast', 'Heavier motion budget'],
        bestFitConditions: ['Brand awareness campaigns', 'Product launches'],
        supportingEvidenceIds: ['ev-research-1'],
        technicalImplications: ['Requires WebGL or advanced CSS motion', 'Asset heavy'],
      },
      {
        id: 'alt-3',
        name: 'Balanced Corporate',
        identity: 'Trustworthy, stable, conventional but polished',
        strengths: ['Familiar UX patterns', 'Broad demographic appeal'],
        risks: ['Low differentiation', 'Conservative visual language'],
        bestFitConditions: ['B2B Services', 'Enterprise SaaS'],
        supportingEvidenceIds: ['ev-adaptive-2'],
        technicalImplications: ['Standard component libraries', 'Highly maintainable'],
      }
    ];

    return alternatives;
  }
}

export class NativeDeterministicProvider implements CreativeDirectionProvider {
  async generateAlternatives(context: string): Promise<CreativeDirectionAlternative[]> {
    // In deterministic mode, we use strict parsing of context keywords to map to known archetypes.
    // This is similar to the mock, but conceptually represents rule-based generation rather than LLM simulation.
    return new MockCreativeProvider().generateAlternatives(context);
  }
}

export class LLMCreativeProvider implements CreativeDirectionProvider {
  async generateAlternatives(context: string): Promise<CreativeDirectionAlternative[]> {
    // Placeholder for future LLM integration
    throw new Error('LLM Provider not yet implemented for Creative Direction.');
  }
}

export class CreativeDirectionEngine {
  private provider: CreativeDirectionProvider;

  constructor(mode: EngineMode = 'mock') {
    switch (mode) {
      case 'mock':
        this.provider = new MockCreativeProvider();
        break;
      case 'deterministic':
        this.provider = new NativeDeterministicProvider();
        break;
      case 'provider':
        this.provider = new LLMCreativeProvider();
        break;
      default:
        this.provider = new MockCreativeProvider();
    }
  }

  async generate(context: string): Promise<CreativeDirectionAlternative[]> {
    const alternatives = await this.provider.generateAlternatives(context);
    
    // Ensure max 3 alternatives are returned
    return alternatives.slice(0, 3);
  }
}
