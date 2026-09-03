import { PageRole } from '../config/page-role';
import { PageContentPlan, SectionPurpose } from '../config/content-intelligence';

export interface ContentValidationResult {
  valid: boolean;
  diagnostics: ContentDiagnostic[];
}

export interface ContentDiagnostic {
  code: string;
  message: string;
  severity: 'error' | 'warning';
  purpose?: SectionPurpose;
}

export class ContentIntelligenceValidator {
  static validate(plan: PageContentPlan, role: PageRole): ContentValidationResult {
    const diagnostics: ContentDiagnostic[] = [];
    
    if (!role.contentExpectations) {
      return { valid: true, diagnostics }; // If no expectations, anything goes
    }

    const { requirements, orderingRules } = role.contentExpectations;
    const sectionCounts = new Map<SectionPurpose, number>();
    const planPurposes = plan.sections.map(s => s.purpose);

    // Count occurrences
    for (const s of plan.sections) {
      sectionCounts.set(s.purpose, (sectionCounts.get(s.purpose) || 0) + 1);
    }

    // Check requirements
    for (const req of requirements) {
      const count = sectionCounts.get(req.purpose) || 0;
      
      if (req.requirement === 'required' && count < req.minOccurrences) {
        diagnostics.push({
          code: 'MISSING_REQUIRED_SECTION',
          message: `Page role '${role.type}' requires at least ${req.minOccurrences} '${req.purpose}' section(s). Found ${count}.`,
          severity: 'error',
          purpose: req.purpose
        });
      }

      if (req.requirement === 'prohibited' && count > 0) {
        diagnostics.push({
          code: 'PROHIBITED_SECTION',
          message: `Page role '${role.type}' prohibits '${req.purpose}' section.`,
          severity: 'error',
          purpose: req.purpose
        });
      }

      if (count > req.maxOccurrences) {
        diagnostics.push({
          code: 'SECTION_DUPLICATION',
          message: `Page role '${role.type}' allows max ${req.maxOccurrences} '${req.purpose}' section(s). Found ${count}.`,
          severity: 'error',
          purpose: req.purpose
        });
      }
    }

    // Check ordering rules
    if (orderingRules && orderingRules.length > 0) {
      let lastRuleIndex = -1;
      for (const purpose of planPurposes) {
        const ruleIndex = orderingRules.indexOf(purpose);
        if (ruleIndex !== -1) {
          if (ruleIndex < lastRuleIndex) {
            diagnostics.push({
              code: 'SECTION_ORDER_VIOLATION',
              message: `Section '${purpose}' appears out of expected semantic order for role '${role.type}'.`,
              severity: 'warning',
              purpose
            });
          }
          lastRuleIndex = ruleIndex;
        }
      }
    }

    // Check Density
    if (plan.globalPlan.targetDensity !== role.contentExpectations.density) {
      diagnostics.push({
        code: 'CONTENT_DENSITY_MISMATCH',
        message: `Plan density '${plan.globalPlan.targetDensity}' does not match role expected density '${role.contentExpectations.density}'.`,
        severity: 'warning'
      });
    }

    return {
      valid: !diagnostics.some(d => d.severity === 'error'),
      diagnostics
    };
  }
}
