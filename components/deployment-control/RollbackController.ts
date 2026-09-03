import { RollbackRequest, RollbackStatus, DeploymentArtifact } from '../../config/deployment-control';
import { DeploymentHistory } from './DeploymentHistory';
import { ManagedDeploymentProvider, CustomDeploymentProvider } from './DeploymentProvider';

export class RollbackController {
  
  static async rollback(request: RollbackRequest): Promise<{ status: RollbackStatus, message: string }> {
    const history = DeploymentHistory.getHistory(request.projectId);
    const targetArtifact = history.find(a => a.deploymentId === request.targetDeploymentId);
    
    if (!targetArtifact) {
      return { status: 'unavailable', message: `Deployment ID ${request.targetDeploymentId} not found in safe history.` };
    }

    if (targetArtifact.status !== 'deployed' && targetArtifact.status !== 'failed') {
       return { status: 'unavailable', message: `Cannot rollback to artifact with status ${targetArtifact.status}.` };
    }

    try {
      const adapter = targetArtifact.target === 'managed' ? new ManagedDeploymentProvider() : new CustomDeploymentProvider();
      const success = await adapter.rollback(request.projectId, request.targetDeploymentId);
      
      if (success) {
        // Record rollback in history
        const rollbackArtifact: DeploymentArtifact = {
          ...targetArtifact,
          deploymentId: `rb-${Date.now()}`,
          timestamp: new Date().toISOString(),
          status: 'rolled_back',
          verificationStatus: 'verified' // Assuming the rollback restores a verified state
        };
        DeploymentHistory.record(request.projectId, rollbackArtifact);
        
        return { status: 'successful', message: `Successfully rolled back to deployment ${request.targetDeploymentId}.` };
      }
      
      return { status: 'failed', message: 'Adapter rejected rollback execution.' };
    } catch (e: any) {
      return { status: 'failed', message: e.message || 'Rollback execution encountered a critical error.' };
    }
  }
}
