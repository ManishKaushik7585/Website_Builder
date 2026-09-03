import { ReleaseCheck, ReleaseBlocker, ReleaseWarning, ReleaseStatus, ReleaseDimension } from '../../config/release-intelligence';
import { ReleaseDiagnosisService } from './ReleaseDiagnosis';

export interface FusedReleaseData {
  dimensions: Record<ReleaseDimension, ReleaseStatus>;
  blockers: ReleaseBlocker[];
  warnings: ReleaseWarning[];
}

export class ReleaseFusion {
  static fuse(checks: ReleaseCheck[]): FusedReleaseData {
    const dimensions = {} as Record<ReleaseDimension, ReleaseStatus>;
    const blockers: ReleaseBlocker[] = [];
    const warnings: ReleaseWarning[] = [];

    const allDiagnoses = ReleaseDiagnosisService.diagnose(checks);

    for (const check of checks) {
      if (!check.verified) {
        dimensions[check.dimension] = 'unverified';
      } else if (!check.passed) {
        dimensions[check.dimension] = 'blocked';
      } else if (check.violations.length > 0) {
        dimensions[check.dimension] = 'ready_with_warnings';
      } else {
        dimensions[check.dimension] = 'ready';
      }
    }

    for (const diagnosis of allDiagnoses) {
      if (diagnosis.isBlocking) {
        blockers.push({
          dimension: diagnosis.dimension,
          diagnosis
        });
      } else {
        warnings.push({
          dimension: diagnosis.dimension,
          diagnosis
        });
      }
    }

    return {
      dimensions,
      blockers,
      warnings
    };
  }
}
