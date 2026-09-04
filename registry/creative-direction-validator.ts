import { CreativeDirectionContract } from '../config/creative-direction';

export interface ValidationDiagnostic {
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

export class CreativeDirectionValidator {
  static validate(contract: CreativeDirectionContract): { valid: boolean; diagnostics: ValidationDiagnostic[] } {
    const diagnostics: ValidationDiagnostic[] = [];

    // Security & Injection checks
    const stringified = JSON.stringify(contract).toLowerCase();
    const injectionPatterns = [
      'ignore all previous',
      'system prompt',
      'you are a',
      'override system',
      '<script>',
      'eval(',
      'npm install'
    ];

    for (const pattern of injectionPatterns) {
      if (stringified.includes(pattern)) {
        diagnostics.push({
          field: 'global',
          message: `Security Violation: Detected malicious injection pattern "${pattern}".`,
          severity: 'error'
        });
      }
    }

    // Required fields check
    if (!contract.visualIdentity || !contract.typography || !contract.color || !contract.layout) {
      diagnostics.push({ field: 'core', message: 'Missing core creative domains.', severity: 'error' });
    }

    // Confidence bounds
    if (contract.confidence) {
      if (contract.confidence.overall < 0 || contract.confidence.overall > 1) {
        diagnostics.push({ field: 'confidence.overall', message: 'Confidence must be between 0 and 1.', severity: 'error' });
      }
    } else {
      diagnostics.push({ field: 'confidence', message: 'Missing confidence object.', severity: 'error' });
    }

    // Provenance bounds
    if (!contract.provenance || !contract.provenance.sourceType) {
      diagnostics.push({ field: 'provenance', message: 'Missing provenance.', severity: 'error' });
    }

    // Check References
    if (contract.references && contract.references.length > 0) {
      for (const ref of contract.references) {
        if (!ref.sourceId || !ref.sourceType) {
          diagnostics.push({ field: 'references', message: 'Reference missing provenance.', severity: 'error' });
        }
      }
    }

    // Check Accessibility
    if (!contract.accessibility || !contract.accessibility.priorities || contract.accessibility.priorities.length === 0) {
      diagnostics.push({ field: 'accessibility', message: 'Missing accessibility strategy.', severity: 'error' });
    }

    const hasErrors = diagnostics.some(d => d.severity === 'error');
    return { valid: !hasErrors, diagnostics };
  }
}
