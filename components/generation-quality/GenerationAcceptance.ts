import { AcceptanceGate, AcceptanceResult, AcceptanceStatus } from '../../config/generation-quality';

export class GenerationAcceptance {
  static evaluate(gates: AcceptanceGate[]): AcceptanceResult {
    let hasBlocking = false;
    let hasUnverified = false;
    let warningCount = 0;
    let blockingCount = 0;

    for (const gate of gates) {
      if (!gate.passed) {
        if (!gate.isVerified) {
          hasUnverified = true;
        } else {
          hasBlocking = true;
          blockingCount += gate.blockingViolations.length;
        }
      }
      warningCount += gate.warnings.length;
    }

    let status: AcceptanceStatus = 'accepted';

    if (hasBlocking) {
      status = 'blocked';
    } else if (hasUnverified) {
      status = 'unverified';
    } else if (warningCount > 0) {
      status = 'accepted_with_warnings';
    }

    return {
      status,
      gates,
      overallBlockingIssueCount: blockingCount,
      overallWarningCount: warningCount
    };
  }
}
