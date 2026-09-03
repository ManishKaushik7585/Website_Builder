import { ReleaseControlState } from '../../config/deployment-control';
import { DeploymentDiagnosis } from './DeploymentDiagnosis';

export class DeploymentSelfCritique {
  static critique(state: ReleaseControlState, diagnoses: DeploymentDiagnosis[]): string[] {
    const facts: string[] = [];

    // Force strict factual self-critique over vague assumptions
    if (state.deploymentStatus === 'deployed') {
      facts.push(`Deployment ID ${state.activeDeploymentId || 'unknown'} exists.`);
      facts.push('Deployment provider returned successful execution.');
    } else if (state.deploymentStatus === 'unverified') {
      facts.push('Deployment execution cannot be conclusively verified.');
    } else {
      facts.push(`Deployment status is explicitly recorded as ${state.deploymentStatus}.`);
    }

    if (state.authorizationState === 'approved') {
      facts.push('Deployment authorization was explicitly granted.');
    } else if (state.authorizationState === 'rejected') {
      facts.push('Deployment authorization was explicitly rejected.');
    }

    for (const diagnosis of diagnoses) {
      facts.push(`Diagnosis: ${diagnosis.evidence}`);
    }

    return facts;
  }
}
