import { DeploymentArtifact, DeploymentResult } from '../../config/deployment-control';

export class DeploymentArtifactManager {
  static extractSafeMetadata(result: DeploymentResult): DeploymentArtifact | null {
    if (!result.artifact) return null;

    // Create a strict clone enforcing safe metadata properties only.
    // Excludes any provider secrets or internal references that may have inadvertently
    // slipped into the raw artifact.
    return {
      deploymentId: result.artifact.deploymentId,
      projectId: result.artifact.projectId,
      environment: result.artifact.environment,
      target: result.artifact.target,
      timestamp: result.artifact.timestamp,
      releaseVersion: result.artifact.releaseVersion,
      status: result.artifact.status,
      verificationStatus: result.artifact.verificationStatus,
      publicUrl: result.artifact.publicUrl,
      durationMs: result.artifact.durationMs
    };
  }
}
