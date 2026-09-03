/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import { WebsiteProject, WebsitePage, SitePlan } from '../config/project';
import { PageRole } from '../config/page-role';
import { PageContentPlan } from '../config/content-intelligence';
import { ResponsivePlan } from '../config/responsive-intelligence';
import { InteractionPlan } from '../config/interaction-intelligence';
import { GenerationPlan } from '../config/generation';
import { IntelligenceSnapshot } from '../config/observability';
import {
  QualityDimension,
  QualityViolation,
  QualitySeverity,
  QualityViolationCode,
  AcceptanceGate
} from '../config/generation-quality';

export interface QualityValidationResult {
  valid: boolean;
  violations: QualityViolation[];
  gates: AcceptanceGate[];
}

export class GenerationQualityValidator {
  
  public static validateQuality(
    project: WebsiteProject,
    page: WebsitePage,
    sitePlan?: SitePlan,
    pageRole?: PageRole,
    content?: PageContentPlan,
    responsive?: ResponsivePlan,
    interaction?: InteractionPlan,
    generation?: GenerationPlan,
    snapshot?: IntelligenceSnapshot,
    qaObservations?: unknown,
    visionObservations?: unknown
  ): QualityValidationResult {
    const violations: QualityViolation[] = [];

    // Gate 1: Architecture
    const archViolations = this.validateArchitecture(project, page, sitePlan);
    violations.push(...archViolations);

    // Gate 2: Content
    const contentViolations = this.validateContent(page.id, content, generation);
    violations.push(...contentViolations);

    // Gate 3: Responsive
    const responsiveViolations = this.validateResponsive(page.id, responsive, generation);
    violations.push(...responsiveViolations);

    // Gate 4: Interaction
    const interactionViolations = this.validateInteraction(page.id, interaction, generation);
    violations.push(...interactionViolations);

    // Gate 5: Accessibility
    const a11yViolations = this.validateAccessibility(page.id, qaObservations);
    violations.push(...a11yViolations);

    // Gate 6: Navigation
    const navViolations = this.validateNavigation(page.id, sitePlan, generation);
    violations.push(...navViolations);

    // Gate 7: Observability
    const obsViolations = this.validateObservability(page.id, snapshot);
    violations.push(...obsViolations);

    // Missing Evidence Check
    if (!qaObservations) {
      violations.push(this.createViolation('accessibility', 'UNVERIFIED_EVIDENCE', 'high', 'QA data is unavailable. Accessibility cannot be verified.', page.id));
    }
    if (!visionObservations) {
      violations.push(this.createViolation('design', 'UNVERIFIED_EVIDENCE', 'high', 'Vision data is unavailable. Visual quality cannot be verified.', page.id));
    }

    const gates = this.compileGates(violations);

    return {
      valid: gates.every(g => g.passed && g.isVerified),
      violations,
      gates
    };
  }

  private static validateArchitecture(project: WebsiteProject, page: WebsitePage, sitePlan?: SitePlan): QualityViolation[] {
    const violations: QualityViolation[] = [];
    if (!project || !page) {
      violations.push(this.createViolation('architecture', 'GENERATION_EVIDENCE_MISSING', 'critical', 'Missing core project or page identity.', page?.id || 'unknown'));
    }
    return violations;
  }

  private static validateContent(pageId: string, content?: PageContentPlan, generation?: GenerationPlan): QualityViolation[] {
    const violations: QualityViolation[] = [];
    if (!content) {
      violations.push(this.createViolation('content', 'GENERATION_EVIDENCE_MISSING', 'critical', 'Missing content plan evidence.', pageId));
      return violations;
    }
    if (!generation) {
      violations.push(this.createViolation('content', 'GENERATION_EVIDENCE_MISSING', 'critical', 'Missing generation plan evidence.', pageId));
      return violations;
    }
    
    // Check if required sections from content plan exist in generation plan
    const requiredSections = content.sections.filter(s => !s.isOptional);
    const genSections = generation.sections.map(s => s.section);
    
    for (const req of requiredSections) {
      if (!genSections.includes(req.purpose)) {
        violations.push(this.createViolation('content', 'REQUIRED_SECTION_MISSING', 'high', `Required section missing: ${req.purpose}`, pageId, req.purpose));
      }
    }
    return violations;
  }

  private static validateResponsive(pageId: string, responsive?: ResponsivePlan, generation?: GenerationPlan): QualityViolation[] {
    const violations: QualityViolation[] = [];
    if (!responsive) {
      violations.push(this.createViolation('responsive', 'GENERATION_EVIDENCE_MISSING', 'critical', 'Missing responsive plan evidence.', pageId));
    }
    // ... further checks
    return violations;
  }

  private static validateInteraction(pageId: string, interaction?: InteractionPlan, generation?: GenerationPlan): QualityViolation[] {
    const violations: QualityViolation[] = [];
    if (!interaction) {
      violations.push(this.createViolation('interaction', 'GENERATION_EVIDENCE_MISSING', 'critical', 'Missing interaction plan evidence.', pageId));
    }
    return violations;
  }

  private static validateAccessibility(pageId: string, qaObservations?: any): QualityViolation[] {
    const violations: QualityViolation[] = [];
    if (qaObservations && qaObservations.diagnostics) {
      for (const diag of qaObservations.diagnostics) {
        if (diag.severity === 'error' || diag.type === 'accessibility') {
          violations.push(this.createViolation('accessibility', 'CRITICAL_OBSERVATION_UNRESOLVED', 'critical', `Unresolved QA issue: ${diag.message}`, pageId));
        }
      }
    }
    return violations;
  }

  private static validateNavigation(pageId: string, sitePlan?: SitePlan, generation?: GenerationPlan): QualityViolation[] {
    const violations: QualityViolation[] = [];
    if (!sitePlan || !sitePlan.navigation) {
      violations.push(this.createViolation('navigation', 'NAVIGATION_REQUIREMENT_UNSATISFIED', 'medium', 'Missing global navigation plan.', pageId));
    }
    return violations;
  }

  private static validateObservability(pageId: string, snapshot?: IntelligenceSnapshot): QualityViolation[] {
    const violations: QualityViolation[] = [];
    if (!snapshot) {
      violations.push(this.createViolation('observability', 'GENERATION_EVIDENCE_MISSING', 'critical', 'Missing observability snapshot.', pageId));
      return violations;
    }
    if (snapshot.status === 'failed' || snapshot.status === 'stale') {
      violations.push(this.createViolation('observability', 'CONTRADICTORY_GENERATION_STATE', 'high', `Snapshot status is invalid: ${snapshot.status}`, pageId));
    }
    return violations;
  }

  private static compileGates(violations: QualityViolation[]): AcceptanceGate[] {
    const dimensions: QualityDimension[] = ['architecture', 'content', 'responsive', 'interaction', 'accessibility', 'navigation', 'observability', 'design', 'generation-integrity'];
    
    return dimensions.map(dim => {
      const dimViolations = violations.filter(v => v.dimension === dim);
      const blocking = dimViolations.filter(v => v.severity === 'critical' || v.severity === 'high');
      const warnings = dimViolations.filter(v => v.severity === 'medium' || v.severity === 'low');
      const hasUnverified = dimViolations.some(v => v.code === 'UNVERIFIED_EVIDENCE');
      
      return {
        dimension: dim,
        passed: blocking.length === 0 && !hasUnverified,
        isVerified: !hasUnverified,
        blockingViolations: blocking,
        warnings
      };
    });
  }

  private static createViolation(
    dimension: QualityDimension,
    code: QualityViolationCode,
    severity: QualitySeverity,
    message: string,
    affectedPageId: string,
    affectedSectionPurpose?: string
  ): QualityViolation {
    return {
      dimension,
      code,
      severity,
      message,
      evidence: [],
      affectedPageId,
      affectedSectionPurpose
    };
  }
}
