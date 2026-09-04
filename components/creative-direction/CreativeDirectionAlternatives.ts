import { CreativeDirectionAlternative } from '../../config/creative-direction';
import { CreativeDirectionEngine, EngineMode } from './CreativeDirectionEngine';
import { CreativeDirectionContextBuilder } from './CreativeDirectionContextBuilder';

export class CreativeDirectionAlternatives {
  static async generate(
    brief: string,
    adaptiveContext: any,
    externalResearchContext: any,
    projectConstraints: string[],
    mode: EngineMode = 'mock'
  ): Promise<CreativeDirectionAlternative[]> {
    const context = CreativeDirectionContextBuilder.build(
      brief,
      adaptiveContext,
      externalResearchContext,
      projectConstraints
    );

    const engine = new CreativeDirectionEngine(mode);
    const alternatives = await engine.generate(context);
    
    // Deduplicate alternatives
    const uniqueIds = new Set<string>();
    const deduplicated: CreativeDirectionAlternative[] = [];
    
    for (const alt of alternatives) {
      if (!uniqueIds.has(alt.identity)) { // Prevent identity duplicates
        uniqueIds.add(alt.identity);
        deduplicated.push(alt);
      }
    }

    if (deduplicated.length === 0) {
      throw new Error('CreativeDirectionEngine failed to generate any valid alternatives.');
    }

    return deduplicated.slice(0, 3); // Strictly bounded to 3
  }
}
