import { test, expect } from '@playwright/test';
import { PAGE_ROLES } from '../registry/page-roles';
import { ContentIntelligenceValidator } from '../registry/content-intelligence-validator';
import { ContentDiagnosis } from '../components/content-intelligence/ContentDiagnosis';
import { ContentSelfCritique } from '../components/content-intelligence/ContentSelfCritique';
import { PageContentPlan } from '../config/content-intelligence';

test.describe('Phase 7C - Content Intelligence', () => {
  const homeRole = PAGE_ROLES['home'];

  const createBasePlan = (): PageContentPlan => ({
    pageId: 'test-1',
    role: 'home',
    globalPlan: {
      primaryIntent: 'convert',
      targetDensity: 'balanced',
      hierarchy: ['primary', 'secondary', 'supporting'],
      globalConstraints: {
        maxHeadingLength: 50,
        maxSupportingCopy: 150,
        maxCards: 3,
        maxBullets: 4,
        maxCtaCount: 2,
        minRequiredContent: 1,
        allowRepeatedContent: false
      }
    },
    sections: [
      { purpose: 'hero', intent: ['explain'], priority: 'primary', density: 'balanced', contentLength: 'short', constraints: { maxHeadingLength: 50, maxSupportingCopy: 150, maxCards: 0, maxBullets: 0, maxCtaCount: 1, minRequiredContent: 1, allowRepeatedContent: false }, isOptional: false },
      { purpose: 'value-proposition', intent: ['persuade'], priority: 'secondary', density: 'balanced', contentLength: 'short', constraints: { maxHeadingLength: 50, maxSupportingCopy: 150, maxCards: 0, maxBullets: 0, maxCtaCount: 0, minRequiredContent: 1, allowRepeatedContent: false }, isOptional: false },
      { purpose: 'final-cta', intent: ['convert'], priority: 'primary', density: 'sparse', contentLength: 'micro', constraints: { maxHeadingLength: 50, maxSupportingCopy: 0, maxCards: 0, maxBullets: 0, maxCtaCount: 1, minRequiredContent: 1, allowRepeatedContent: false }, isOptional: false },
    ]
  });

  test('Valid Content Plan passes validation', () => {
    const plan = createBasePlan();
    const result = ContentIntelligenceValidator.validate(plan, homeRole);
    expect(result.valid).toBe(true);
    expect(result.diagnostics).toHaveLength(0);
  });

  test('Detects missing required section', () => {
    const plan = createBasePlan();
    plan.sections = plan.sections.filter(s => s.purpose !== 'final-cta');
    const result = ContentIntelligenceValidator.validate(plan, homeRole);
    
    expect(result.valid).toBe(false);
    expect(result.diagnostics[0].code).toBe('MISSING_REQUIRED_SECTION');
    expect(result.diagnostics[0].purpose).toBe('final-cta');
  });

  test('Detects duplicate sections above maximum', () => {
    const plan = createBasePlan();
    // home allows max 1 hero
    plan.sections.push({ ...plan.sections[0] }); 
    const result = ContentIntelligenceValidator.validate(plan, homeRole);
    
    expect(result.valid).toBe(false);
    expect(result.diagnostics[0].code).toBe('SECTION_DUPLICATION');
    expect(result.diagnostics[0].purpose).toBe('hero');
  });

  test('Detects invalid ordering', () => {
    const plan = createBasePlan();
    // Reorder: put value-prop before hero (violates home ordering rule)
    plan.sections = [plan.sections[1], plan.sections[0], plan.sections[2]];
    const result = ContentIntelligenceValidator.validate(plan, homeRole);
    
    // Ordering is a warning, so valid is true but diagnostics exist
    expect(result.valid).toBe(true);
    expect(result.diagnostics[0].code).toBe('SECTION_ORDER_VIOLATION');
    expect(result.diagnostics[0].purpose).toBe('hero');
  });

  test('Detects density mismatch', () => {
    const plan = createBasePlan();
    plan.globalPlan.targetDensity = 'sparse'; // home expects balanced
    const result = ContentIntelligenceValidator.validate(plan, homeRole);
    
    expect(result.valid).toBe(true);
    expect(result.diagnostics[0].code).toBe('CONTENT_DENSITY_MISMATCH');
  });

  test('ContentDiagnosis maps symptoms to semantic refinement actions', () => {
    const plan = createBasePlan();
    plan.sections.push({ ...plan.sections[0] }); // duplicate hero
    
    const result = ContentIntelligenceValidator.validate(plan, homeRole);
    const refinements = ContentDiagnosis.diagnoseAndPrescribe(result.diagnostics);
    
    expect(refinements[0].action).toBe('removeRedundantSection');
    expect(refinements[0].targetPurpose).toBe('hero');
  });

  test('ContentSelfCritique rejects vague aesthetic feedback', () => {
    const critique = "The design looks boring, make it pop and add some personality.";
    const result = ContentSelfCritique.validateCritique(critique);
    expect(result.valid).toBe(false);
    expect(result.reason).toContain('make it pop');
  });

  test('ContentSelfCritique accepts measurable semantic feedback', () => {
    const critique = "Reduce the supporting copy in the hero section and limit the CTA count to one.";
    const result = ContentSelfCritique.validateCritique(critique);
    expect(result.valid).toBe(true);
  });
});
