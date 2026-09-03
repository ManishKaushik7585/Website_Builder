import { SiteAcceptanceResult, CrossPageViolation } from '../config/site-acceptance';

export class SiteAcceptanceValidator {
  static validate(result: SiteAcceptanceResult): { valid: boolean; violations: string[] } {
    const violations: string[] = [];

    if (result.totalPages === 0) {
      violations.push('EMPTY_PROJECT');
    }

    if (result.acceptedPages < result.totalPages) {
      violations.push('UNACCEPTED_PAGES_REMAIN');
    }

    if (result.crossPageViolations.some(v => v.severity === 'high' || v.severity === 'critical')) {
      violations.push('BLOCKING_CROSS_PAGE_VIOLATIONS');
    }

    return {
      valid: violations.length === 0,
      violations
    };
  }
}
