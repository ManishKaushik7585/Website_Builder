
import { GenerationPlan } from '@/config/generation';
// In a real implementation, this would compile GenerationPlan into PageConfig referencing registries.
export function compileToPageConfig(plan: GenerationPlan) {
  return {
    template: 'default',
    contentIntent: plan.contentIntent,
    visualIntent: plan.visualIntent,
    sections: plan.sections.map(s => ({
      id: s.id,
      type: s.section,
      props: s.props || {}
    }))
  };
}
