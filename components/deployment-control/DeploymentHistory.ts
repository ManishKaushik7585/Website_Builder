import { DeploymentArtifact } from '../../config/deployment-control';

export class DeploymentHistory {
  // Simple in-memory store for the current runtime. 
  // In a real system, this is backed by a secure database.
  private static history: Map<string, DeploymentArtifact[]> = new Map();

  static record(projectId: string, artifact: DeploymentArtifact): void {
    const projectHistory = this.history.get(projectId) || [];
    projectHistory.push(artifact);
    this.history.set(projectId, projectHistory);
  }

  static getHistory(projectId: string): DeploymentArtifact[] {
    return this.history.get(projectId) || [];
  }

  static getLatestSuccessful(projectId: string): DeploymentArtifact | null {
    const projectHistory = this.getHistory(projectId);
    for (let i = projectHistory.length - 1; i >= 0; i--) {
      if (projectHistory[i].status === 'deployed' && projectHistory[i].verificationStatus === 'verified') {
        return projectHistory[i];
      }
    }
    return null;
  }
}
