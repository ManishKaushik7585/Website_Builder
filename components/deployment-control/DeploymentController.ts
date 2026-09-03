import { ReleaseResult, ReleaseStatus } from '../../config/release-intelligence';
import { 
  DeploymentEnvironment, 
  DeploymentTarget, 
  DeploymentRequest, 
  DeploymentAuthorization 
} from '../../config/deployment-control';

export class DeploymentController {
  
  static evaluateEligibility(releaseResult: ReleaseResult): boolean {
    if (!releaseResult) return false;
    
    // blocked or unverified MUST never be deployable.
    if (releaseResult.status === 'blocked' || releaseResult.status === 'unverified') {
      return false;
    }
    
    return releaseResult.status === 'ready' || releaseResult.status === 'ready_with_warnings';
  }

  static determineAuthorizationRequirement(
    releaseResult: ReleaseResult, 
    environment: DeploymentEnvironment
  ): DeploymentAuthorization {
    if (!this.evaluateEligibility(releaseResult)) {
      return 'rejected';
    }

    if (environment === 'production') {
      if (releaseResult.status === 'ready_with_warnings') {
        return 'required';
      }
      // Depending on strict policy, even 'ready' might require approval. 
      // Assuming 'ready' for production might be auto or require approval based on external config. 
      // Defaulting to required for production to be safe, but adhering strictly to prompt:
      // "For ready_with_warnings production deployment must display an explicit approval requirement."
      // "For ready production deployment may be eligible according to the configured authorization policy."
      return 'required';
    }

    // Preview or staging might not require explicit human auth if ready
    return releaseResult.status === 'ready_with_warnings' ? 'required' : 'not_required';
  }

  static createRequest(
    projectId: string,
    releaseResult: ReleaseResult,
    environment: DeploymentEnvironment,
    target: DeploymentTarget,
    authorizationState: DeploymentAuthorization
  ): DeploymentRequest | null {
    
    if (!this.evaluateEligibility(releaseResult)) {
      return null;
    }

    const requiredAuth = this.determineAuthorizationRequirement(releaseResult, environment);
    
    if (requiredAuth === 'required' && authorizationState !== 'approved') {
      return null; // Cannot create request if authorization is pending/rejected
    }
    if (requiredAuth === 'rejected' || authorizationState === 'rejected') {
      return null;
    }

    return {
      projectId,
      environment,
      target,
      authorization: authorizationState === 'approved' ? 'approved' : 'not_required',
      timestamp: new Date().toISOString()
    };
  }
}
