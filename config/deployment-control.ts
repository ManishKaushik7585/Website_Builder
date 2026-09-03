export type DeploymentStatus = 
  | 'pending'
  | 'authorized'
  | 'deploying'
  | 'deployed'
  | 'failed'
  | 'rolled_back'
  | 'cancelled'
  | 'unverified';

export type DeploymentEnvironment = 'preview' | 'staging' | 'production';

export type DeploymentTarget = 'managed' | 'custom';

export type DeploymentAuthorization = 'not_required' | 'required' | 'approved' | 'rejected';

export type RollbackStatus = 
  | 'requested'
  | 'executing'
  | 'successful'
  | 'failed'
  | 'unavailable';

export interface DeploymentRequest {
  projectId: string;
  environment: DeploymentEnvironment;
  target: DeploymentTarget;
  authorization: DeploymentAuthorization;
  timestamp: string;
}

export interface DeploymentAttempt {
  deploymentId: string;
  request: DeploymentRequest;
  status: DeploymentStatus;
  startTime: string;
}

export interface DeploymentArtifact {
  deploymentId: string;
  projectId: string;
  environment: DeploymentEnvironment;
  target: DeploymentTarget;
  timestamp: string;
  releaseVersion: string;
  status: DeploymentStatus;
  verificationStatus: 'verified' | 'unverified' | 'failed';
  publicUrl?: string;
  durationMs: number;
}

export interface DeploymentVerification {
  status: 'verified' | 'unverified' | 'failed';
  message: string;
}

export interface DeploymentResult {
  attempt: DeploymentAttempt;
  artifact?: DeploymentArtifact;
  verification?: DeploymentVerification;
  error?: string;
}

export interface RollbackRequest {
  projectId: string;
  targetDeploymentId: string;
  fallbackDeploymentId?: string;
  timestamp: string;
}

export interface ReleaseControlState {
  isDeployable: boolean;
  authorizationState: DeploymentAuthorization;
  deploymentStatus: DeploymentStatus;
  activeDeploymentId?: string;
  message?: string;
}
