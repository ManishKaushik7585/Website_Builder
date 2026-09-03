export interface DeploymentDiagnosis {
  code: string;
  scope: string;
  severity: 'critical' | 'high' | 'medium' | 'info';
  evidence: string;
  remediation: string;
}

export class DeploymentDiagnosisService {
  static diagnose(
    releaseBlocked: boolean,
    authorizationRejected: boolean,
    adapterError: string | null,
    verificationFailed: boolean
  ): DeploymentDiagnosis[] {
    const diagnoses: DeploymentDiagnosis[] = [];

    if (releaseBlocked) {
      diagnoses.push({
        code: 'RELEASE_NOT_DEPLOYABLE',
        scope: 'Deployment Control',
        severity: 'critical',
        evidence: 'Upstream Release Intelligence blocked deployment readiness.',
        remediation: 'Resolve underlying release evidence blockers before attempting deployment.'
      });
    }

    if (authorizationRejected) {
      diagnoses.push({
        code: 'DEPLOYMENT_NOT_AUTHORIZED',
        scope: 'Deployment Control',
        severity: 'critical',
        evidence: 'Deployment lacks required human or system authorization.',
        remediation: 'Request explicit deployment authorization.'
      });
    }

    if (adapterError) {
      diagnoses.push({
        code: 'DEPLOYMENT_EXECUTION_FAILED',
        scope: 'Deployment Adapter',
        severity: 'critical',
        evidence: `The infrastructure adapter rejected execution: ${adapterError}`,
        remediation: 'Verify deployment provider configuration and credentials.'
      });
    }

    if (verificationFailed) {
      diagnoses.push({
        code: 'DEPLOYMENT_VERIFICATION_FAILED',
        scope: 'Deployment Verification',
        severity: 'high',
        evidence: 'The deployment executed but could not be verified online.',
        remediation: 'Check deployment health status and target URL availability.'
      });
    }

    return diagnoses;
  }
}
