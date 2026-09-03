import { DeploymentAuthorization } from '../../config/deployment-control';

export class DeploymentAuthorizationService {
  
  /**
   * Deterministic authorization handling that evaluates explicit approvals.
   * Does not infer approval from page loads, URL params, or generation text.
   */
  static authorize(
    currentRequirement: DeploymentAuthorization,
    explicitApproval: boolean,
    explicitRejection: boolean
  ): DeploymentAuthorization {
    if (currentRequirement === 'not_required') {
      return 'not_required';
    }
    
    if (currentRequirement === 'rejected' || explicitRejection) {
      return 'rejected';
    }

    if (currentRequirement === 'required') {
      return explicitApproval ? 'approved' : 'required';
    }

    return currentRequirement;
  }
}
