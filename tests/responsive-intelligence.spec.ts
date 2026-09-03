import { test, expect } from '@playwright/test';
import { PAGE_ROLES } from '../registry/page-roles';
import { PageContentPlan } from '../config/content-intelligence';
import { ResponsivePlan } from '../config/responsive-intelligence';
import { ResponsiveIntelligenceValidator } from '../registry/responsive-intelligence-validator';
import { ResponsiveDiagnosis } from '../components/responsive-intelligence/ResponsiveDiagnosis';
import { ResponsiveSelfCritique } from '../components/responsive-intelligence/ResponsiveSelfCritique';

test.describe('Phase 7D - Responsive Intelligence', () => {
  const homeRole = PAGE_ROLES['home'];
  
  const createBaseContentPlan = (): PageContentPlan => ({
    pageId: 'test-1',
    role: 'home',
    globalPlan: {
      primaryIntent: 'convert',
      targetDensity: 'balanced',
      hierarchy: ['primary', 'secondary', 'supporting'],
      globalConstraints: { maxHeadingLength: 50, maxSupportingCopy: 150, maxCards: 3, maxBullets: 4, maxCtaCount: 2, minRequiredContent: 1, allowRepeatedContent: false }
    },
    sections: [
      { purpose: 'hero', intent: ['explain'], priority: 'primary', density: 'balanced', contentLength: 'short', constraints: { maxHeadingLength: 50, maxSupportingCopy: 150, maxCards: 0, maxBullets: 0, maxCtaCount: 1, minRequiredContent: 1, allowRepeatedContent: false }, isOptional: false }
    ]
  });

  const createBaseResponsivePlan = (): ResponsivePlan => ({
    pageId: 'test-1',
    globalConstraints: {
      allowHidingPrimary: false,
      allowHorizontalScroll: false,
      minTouchTargetSize: 44,
      preventOrphanedText: true
    },
    behaviors: [
      {
        sectionPurpose: 'hero',
        transformations: [
          {
            sourceLayout: 'split',
            targetLayout: 'stack',
            affectedSection: 'hero',
            triggerCondition: 'mobile',
            preservedPriority: ['primary', 'secondary'],
            type: 'transform',
            expectedBehavior: 'Stack columns on mobile'
          }
        ]
      }
    ]
  });

  test('Valid Responsive Plan passes validation', () => {
    const rPlan = createBaseResponsivePlan();
    const cPlan = createBaseContentPlan();
    
    const result = ResponsiveIntelligenceValidator.validate(rPlan, cPlan, homeRole);
    expect(result.valid).toBe(true);
  });

  test('Detects prohibited hiding of primary content on mobile', () => {
    const rPlan = createBaseResponsivePlan();
    const cPlan = createBaseContentPlan();
    
    rPlan.behaviors[0].transformations.push({
      sourceLayout: 'split',
      targetLayout: 'hide-secondary', // Using hide-secondary as mode, but type is hide
      affectedSection: 'hero',
      triggerCondition: 'mobile',
      preservedPriority: ['secondary'], // primary is not preserved
      type: 'hide',
      expectedBehavior: 'Hide primary content'
    });
    
    const result = ResponsiveIntelligenceValidator.validate(rPlan, cPlan, homeRole);
    
    expect(result.valid).toBe(false);
    expect(result.diagnostics[0].code).toBe('INAPPROPRIATE_CONTENT_HIDING');
  });

  test('Detects horizontal overflow from browser observations', () => {
    const rPlan = createBaseResponsivePlan();
    const cPlan = createBaseContentPlan();
    
    const observations = [
      {
        viewport: 'mobile' as const,
        actualWidth: 320,
        section: 'hero' as const,
        hasHorizontalOverflow: true,
        isContentClipped: false,
        hasCollapsedHierarchy: false
      }
    ];
    
    const result = ResponsiveIntelligenceValidator.validate(rPlan, cPlan, homeRole, observations);
    
    expect(result.valid).toBe(false);
    expect(result.diagnostics[0].code).toBe('HORIZONTAL_OVERFLOW');
  });

  test('Diagnosis maps HORIZONTAL_OVERFLOW to removeHorizontalOverflow', () => {
    const diagnostics = [{
      code: 'HORIZONTAL_OVERFLOW' as const,
      message: 'Horizontal overflow',
      viewport: 'mobile' as const,
      section: 'hero',
      severity: 'error' as const
    }];
    
    const refinements = ResponsiveDiagnosis.diagnoseAndPrescribe(diagnostics);
    
    expect(refinements[0].action).toBe('removeHorizontalOverflow');
    expect(refinements[0].targetViewport).toBe('mobile');
  });

  test('SelfCritique rejects vague aesthetic feedback', () => {
    const critique = "Make mobile better and cleaner.";
    const result = ResponsiveSelfCritique.validateCritique(critique);
    expect(result.valid).toBe(false);
    expect(result.reason).toContain('make mobile better');
  });

  test('SelfCritique accepts measurable semantic feedback', () => {
    const critique = "Stack the columns below tablet width to remove horizontal overflow.";
    const result = ResponsiveSelfCritique.validateCritique(critique);
    expect(result.valid).toBe(true);
  });
});
