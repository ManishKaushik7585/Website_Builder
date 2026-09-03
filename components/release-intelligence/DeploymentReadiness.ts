import { DeploymentReadiness, ReleaseStatus } from '../../config/release-intelligence';
import { FusedReleaseData } from './ReleaseFusion';

export class DeploymentReadinessService {
  static evaluate(fusedData: FusedReleaseData): DeploymentReadiness {
    const { dimensions, blockers } = fusedData;

    let unverifiedCount = 0;
    let blockedCount = 0;
    let readyWithWarningsCount = 0;

    for (const status of Object.values(dimensions)) {
      if (status === 'unverified') unverifiedCount++;
      if (status === 'blocked') blockedCount++;
      if (status === 'ready_with_warnings') readyWithWarningsCount++;
    }

    let status: ReleaseStatus = 'ready';

    if (unverifiedCount > 0) {
      status = 'unverified';
    } else if (blockedCount > 0 || blockers.length > 0) {
      status = 'blocked';
    } else if (readyWithWarningsCount > 0) {
      status = 'ready_with_warnings';
    }

    return {
      status,
      mandatoryGatesPassed: status === 'ready' || status === 'ready_with_warnings',
      blockingIssueCount: blockers.length
    };
  }
}
