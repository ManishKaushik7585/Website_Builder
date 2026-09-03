import { DeploymentRequest, DeploymentResult, DeploymentAttempt, DeploymentArtifact } from '../../config/deployment-control';
import { IDeploymentAdapter } from './DeploymentAdapter';
import { ManagedDeploymentProvider, CustomDeploymentProvider } from './DeploymentProvider';

export class DeploymentExecutor {
  
  static async execute(request: DeploymentRequest): Promise<DeploymentResult> {
    const deploymentId = `deploy-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const attempt: DeploymentAttempt = {
      deploymentId,
      request,
      status: 'deploying',
      startTime: new Date().toISOString()
    };

    let adapter: IDeploymentAdapter;

    if (request.target === 'managed') {
      adapter = new ManagedDeploymentProvider();
    } else {
      adapter = new CustomDeploymentProvider();
    }

    try {
      const artifact = await adapter.execute(attempt);
      return {
        attempt: { ...attempt, status: 'deployed' },
        artifact,
        verification: { status: artifact.verificationStatus, message: 'Verified by adapter layer.' }
      };
    } catch (e: any) {
      // Catch exceptions and safely record a failure attempt without leaking raw trace if possible
      return {
        attempt: { ...attempt, status: 'failed' },
        error: e.message || 'Deployment execution failed.',
        verification: { status: 'failed', message: 'Execution did not complete safely.' }
      };
    }
  }
}
