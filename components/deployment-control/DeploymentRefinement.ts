import { DeploymentDiagnosis } from './DeploymentDiagnosis';

export interface DeploymentSemanticAction {
  action: string;
  targetScope: string;
  expectedOutcome: string;
}

export class DeploymentRefinement {
  static refine(diagnoses: DeploymentDiagnosis[]): DeploymentSemanticAction[] {
    const actions: DeploymentSemanticAction[] = [];

    for (const diagnosis of diagnoses) {
      // Explicitly rejecting raw shell/JS/JSX commands and mapping to semantic intents
      switch (diagnosis.code) {
        case 'RELEASE_NOT_DEPLOYABLE':
          actions.push({ action: 'verifyReleaseReadiness', targetScope: 'Release Intelligence', expectedOutcome: 'Unblock release state' });
          break;
        case 'DEPLOYMENT_NOT_AUTHORIZED':
          actions.push({ action: 'requestDeploymentAuthorization', targetScope: 'Deployment Control', expectedOutcome: 'Receive explicit deployment approval' });
          break;
        case 'DEPLOYMENT_EXECUTION_FAILED':
          actions.push({ action: 'verifyDeploymentProvider', targetScope: 'Deployment Adapter', expectedOutcome: 'Ensure provider adapter connects securely' });
          break;
        case 'DEPLOYMENT_VERIFICATION_FAILED':
          actions.push({ action: 'verifyDeploymentHealth', targetScope: 'Deployment Verification', expectedOutcome: 'Confirm live availability of artifact' });
          break;
        default:
          actions.push({ action: 'retryDeployment', targetScope: 'Deployment Orchestrator', expectedOutcome: 'Attempt deployment again if within budget' });
      }
    }

    return actions;
  }
}
