import { ReleaseResult } from '../../config/release-intelligence';
import { 
  DeploymentEnvironment, 
  DeploymentTarget, 
  DeploymentAuthorization,
  ReleaseControlState,
  DeploymentStatus,
  DeploymentArtifact
} from '../../config/deployment-control';
import { DeploymentController } from './DeploymentController';
import { DeploymentAuthorizationService } from './DeploymentAuthorization';
import { DeploymentExecutor } from './DeploymentExecutor';
import { DeploymentVerificationService } from './DeploymentVerification';
import { DeploymentArtifactManager } from './DeploymentArtifacts';
import { DeploymentHistory } from './DeploymentHistory';
import { DeploymentDiagnosisService } from './DeploymentDiagnosis';
import { DeploymentRefinement } from './DeploymentRefinement';
import { DeploymentSelfCritique } from './DeploymentSelfCritique';

export class DeploymentOrchestrator {
  
  static async process(
    projectId: string,
    releaseResult: ReleaseResult,
    environment: DeploymentEnvironment,
    target: DeploymentTarget,
    intent: 'evaluate' | 'deploy',
    explicitApproval: boolean = false
  ): Promise<{
    state: ReleaseControlState;
    artifact?: DeploymentArtifact;
    diagnoses: any[];
    refinements: any[];
    critique: string[];
  }> {
    const isDeployable = DeploymentController.evaluateEligibility(releaseResult);
    const requiredAuth = DeploymentController.determineAuthorizationRequirement(releaseResult, environment);
    const authorizationState = DeploymentAuthorizationService.authorize(requiredAuth, explicitApproval, false);

    const baseState: ReleaseControlState = {
      isDeployable,
      authorizationState,
      deploymentStatus: 'pending'
    };

    if (intent === 'evaluate') {
      return this.finalizeResponse(baseState, [], undefined);
    }

    const request = DeploymentController.createRequest(projectId, releaseResult, environment, target, authorizationState);

    if (!request) {
      baseState.deploymentStatus = 'cancelled';
      baseState.message = 'Deployment request rejected prior to execution.';
      const diagnoses = DeploymentDiagnosisService.diagnose(!isDeployable, authorizationState !== 'approved' && authorizationState !== 'not_required', null, false);
      return this.finalizeResponse(baseState, diagnoses, undefined);
    }

    // Execution with bounded retry policy
    let attempts = 0;
    const MAX_ATTEMPTS = 3;
    let lastResult: any = null;
    
    while (attempts < MAX_ATTEMPTS) {
      attempts++;
      lastResult = await DeploymentExecutor.execute(request);
      
      if (lastResult.attempt.status === 'deployed') {
        break;
      }
    }

    if (lastResult.attempt.status !== 'deployed') {
      baseState.deploymentStatus = 'failed';
      baseState.message = `Deployment failed after ${attempts} attempts.`;
      const diagnoses = DeploymentDiagnosisService.diagnose(false, false, lastResult.error || 'Unknown executor error', false);
      return this.finalizeResponse(baseState, diagnoses, undefined);
    }

    // Verification
    const safeArtifact = DeploymentArtifactManager.extractSafeMetadata(lastResult);
    const verification = await DeploymentVerificationService.verify(safeArtifact);

    baseState.activeDeploymentId = safeArtifact?.deploymentId;
    let finalArtifact = safeArtifact;

    if (verification.status === 'verified') {
      baseState.deploymentStatus = 'deployed';
      if (finalArtifact) {
        finalArtifact.verificationStatus = 'verified';
        DeploymentHistory.record(projectId, finalArtifact);
      }
    } else {
      baseState.deploymentStatus = 'unverified';
      if (finalArtifact) {
        finalArtifact.verificationStatus = 'unverified';
        finalArtifact.status = 'unverified'; // Safe degrade
      }
    }

    const diagnoses = DeploymentDiagnosisService.diagnose(false, false, null, verification.status !== 'verified');
    return this.finalizeResponse(baseState, diagnoses, finalArtifact || undefined);
  }

  private static finalizeResponse(state: ReleaseControlState, diagnoses: any[], artifact?: DeploymentArtifact) {
    const refinements = DeploymentRefinement.refine(diagnoses);
    const critique = DeploymentSelfCritique.critique(state, diagnoses);
    return { state, artifact, diagnoses, refinements, critique };
  }
}
