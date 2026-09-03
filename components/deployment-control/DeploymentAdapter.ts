import { DeploymentRequest, DeploymentAttempt, DeploymentArtifact } from '../../config/deployment-control';

/**
 * Strict boundary interface separating Semantic Intelligence from physical execution.
 */
export interface IDeploymentAdapter {
  execute(attempt: DeploymentAttempt): Promise<DeploymentArtifact>;
  rollback(projectId: string, deploymentId: string): Promise<boolean>;
  verify(deploymentId: string): Promise<boolean>;
}
