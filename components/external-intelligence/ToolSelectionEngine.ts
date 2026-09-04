/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResearchObjective, ResearchDepth } from '../../config/external-intelligence';
import { ProviderRegistry, ProviderRegistration } from './providers/ProviderRegistry';

export class ToolSelectionEngine {
  
  static selectProviders(objective: ResearchObjective, depth: ResearchDepth, adaptiveContext?: any): ProviderRegistration[] {
    let available = [...ProviderRegistry.getAvailableProviders()];
    const selected: ProviderRegistration[] = [];

    if (adaptiveContext?.researchEffectiveness) {
      // Re-rank available based on high/low effectiveness memory
      available.sort((a, b) => {
        const effA = adaptiveContext.researchEffectiveness[a.id];
        const effB = adaptiveContext.researchEffectiveness[b.id];
        if (effA === 'high' && effB !== 'high') return -1;
        if (effB === 'high' && effA !== 'high') return 1;
        if (effA === 'low' && effB !== 'low') return 1;
        if (effB === 'low' && effA !== 'low') return -1;
        return 0;
      });
    }

    // If no research is needed, return none
    if (depth === 'NONE') return [];

    if (objective === 'design-trends' || objective === 'typography' || objective === 'ux-patterns') {
      const designRef = available.find(p => p.id === 'design-reference');
      const shadcn = available.find(p => p.id === 'shadcn');
      const daisyui = available.find(p => p.id === 'daisyui');
      const ui21st = available.find(p => p.id === '21st-dev');

      if (designRef) selected.push(designRef);
      if (shadcn) selected.push(shadcn);
      if (daisyui) selected.push(daisyui);
      if (ui21st) selected.push(ui21st);
    } 
    else if (objective === 'component-architecture' || objective === 'engineering-patterns') {
      const github = available.find(p => p.id === 'github');
      if (github) selected.push(github);
    }
    else if (objective === 'technology-dependencies') {
      const mcp = available.find(p => p.id === 'mcp-registry');
      if (mcp) selected.push(mcp);
    }
    
    // Always fallback to general web search if we need deep research and have capacity
    if (depth === 'DEEP' || depth === 'TARGETED') {
      const web = available.find(p => p.category === 'WEB_SEARCH');
      if (web && !selected.find(s => s.id === web.id)) {
        selected.push(web);
      }
    }

    return selected;
  }
}
