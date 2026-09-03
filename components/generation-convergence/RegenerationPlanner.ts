import { ConvergenceAction, RegenerationScope } from '../../config/generation-convergence';

export class RegenerationPlanner {
  static planScope(actions: ConvergenceAction[]): RegenerationScope | null {
    if (actions.length === 0) return null;

    let hasSite = false;
    let hasPage = false;
    let hasComponent = false;
    let hasSection = false;
    let hasResponsive = false;
    let hasInteraction = false;

    for (const action of actions) {
      if (action.scope === 'site') hasSite = true;
      else if (action.scope === 'page') hasPage = true;
      else if (action.scope === 'component') hasComponent = true;
      else if (action.scope === 'section') hasSection = true;
      else if (action.scope === 'responsive-variant') hasResponsive = true;
      else if (action.scope === 'interaction-behavior') hasInteraction = true;
    }

    if (hasSite) return 'site';
    if (hasPage) return 'page';
    
    if (hasComponent && hasSection) return 'page'; // escalate if mixed disjoint scopes
    if (hasSection) return 'section';
    if (hasComponent) return 'component';
    
    if (hasResponsive && hasInteraction) return 'page';
    if (hasResponsive) return 'responsive-variant';
    if (hasInteraction) return 'interaction-behavior';

    return 'page'; // fallback
  }
}
