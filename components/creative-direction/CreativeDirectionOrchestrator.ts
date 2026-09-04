import { CreativeDirectionAlternative, CreativeDirectionContract } from '../../config/creative-direction';
import { CreativeDirectionAlternatives } from './CreativeDirectionAlternatives';
import { CreativeDirectionSelector } from './CreativeDirectionSelector';
import { CreativeDirectionSelfCritique } from './CreativeDirectionSelfCritique';
import { CreativeDirectionValidator } from '../../registry/creative-direction-validator';
import { CreativeDirectionConfidence } from './CreativeDirectionConfidence';
import { EngineMode } from './CreativeDirectionEngine';

export class CreativeDirectionOrchestrator {
  static async execute(
    projectId: string,
    brief: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    adaptiveContext: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    researchContext: any,
    mode: EngineMode = 'mock'
  ): Promise<CreativeDirectionContract> {
    
    // 1. Gather Constraints
    const projectConstraints = [
      'Must maintain AAA accessibility contrast',
      'Prefer mobile-first layout logic'
    ];

    // 2. Generate Alternatives
    const alternatives = await CreativeDirectionAlternatives.generate(
      brief,
      adaptiveContext,
      researchContext,
      projectConstraints,
      mode
    );

    // 3. Select Direction
    const selectedAlt = CreativeDirectionSelector.select(alternatives, brief);

    // 4. Calculate Confidence
    // Mock evidence extraction
    const evidence = [
      { id: 'ev-1', description: 'Brief alignment', provenance: { sourceId: 'brief', sourceType: 'user_brief' }, weight: 1 } as any
    ];
    const researchGaps = researchContext?.gaps || [];
    const constraintViolations: string[] = [];
    const confidence = CreativeDirectionConfidence.calculate(selectedAlt, alternatives, evidence, researchGaps, constraintViolations);

    // 5. Construct Initial Contract
    let contract: CreativeDirectionContract = {
      id: `cd-${Date.now()}`,
      version: 'v1',
      projectId,
      status: 'draft',
      visualIdentity: {
        personality: ['Professional', 'Clean'],
        emotionalTone: ['Trustworthy'],
        aestheticDirection: selectedAlt.identity,
        visualLanguage: ['Minimal lines'],
        differentiation: 'Focus on speed and clarity'
      },
      artDirection: { direction: 'Editorial', composition: ['Asymmetric'], visualDevices: [], density: 'balanced', focalPointStrategy: 'Typography led' },
      typography: { displayDirection: 'Sans-serif', bodyDirection: 'Inter', hierarchy: 'Strict', scaleStrategy: 'Major Third', weightStrategy: 'Medium', readabilityPriority: 'High' },
      color: { strategy: 'Monochrome with accent', primaryRole: 'Neutral', accentRole: 'Brand', neutralStrategy: 'Cool grays', contrastStrategy: 'High' },
      layout: { philosophy: 'Grid-based', gridStrategy: '12-column', spacingStrategy: '8pt', sectionRhythm: 'Generous', whitespaceStrategy: 'Maximal' },
      components: { personality: 'Sharp', shapeLanguage: 'Square', surfaceTreatment: 'Flat', borderStrategy: 'Thin', depthStrategy: 'None' },
      interaction: { philosophy: 'Subtle', feedbackIntensity: 'Low', interactionPatterns: ['Hover states'] },
      motion: { philosophy: 'Restrained', intensity: 'Subtle', transitionStrategy: 'Fade', entranceStrategy: 'Slide', interactionMotion: 'Scale' },
      imagery: { strategy: 'Sparse' },
      threeD: { recommended: false },
      responsive: { philosophy: 'Mobile First Layout Adaptation', mobilePriority: 'High', layoutAdaptation: 'Stacking' },
      accessibility: { priorities: ['WCAG 2.1 AA compliance'], risks: [] },
      pageRoles: [],
      references: [],
      antiPatterns: ['Generic SaaS gradients', 'Excessive glassmorphism'],
      constraints: [],
      decisionTrace: [],
      alternatives,
      selectedDirection: selectedAlt.name,
      rationale: { summary: 'Selected based on brief alignment.', keyDrivers: selectedAlt.strengths, evidenceIds: ['ev-1'] },
      confidence,
      researchGaps,
      provenance: { sourceId: 'orchestrator', sourceType: 'system_default' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // 6. Self-Critique Loop (Max 2 iterations)
    let loopCount = 0;
    while (loopCount < 2) {
      const critiqueResult = CreativeDirectionSelfCritique.critique(contract, brief);
      if (critiqueResult.valid) {
        break;
      }
      if (critiqueResult.refinedContract) {
        contract = critiqueResult.refinedContract;
      }
      loopCount++;
    }

    // 7. Final Validation
    const validationResult = CreativeDirectionValidator.validate(contract);
    if (!validationResult.valid) {
      console.error('Creative Direction Validation Failed:', validationResult.diagnostics);
      contract.status = 'rejected';
      // In production, might throw or fallback
    } else {
      contract.status = 'validated';
    }

    return contract;
  }
}
