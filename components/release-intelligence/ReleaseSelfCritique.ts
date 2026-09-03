import { ReleaseDiagnosis } from '../../config/release-intelligence';

export class ReleaseSelfCritique {
  static critique(diagnoses: ReleaseDiagnosis[]): string[] {
    const verifiedStatements: string[] = [];

    if (diagnoses.length === 0) {
      verifiedStatements.push('No blocking release violations remain.');
      verifiedStatements.push('All required release dimensions contain verified evidence.');
      verifiedStatements.push('Site Acceptance status is accepted.');
      verifiedStatements.push('Production build evidence is present and successful.');
      verifiedStatements.push('No environment-secret leakage was detected.');
    } else {
      for (const diag of diagnoses) {
        if (diag.code === 'SITE_NOT_ACCEPTED') {
          verifiedStatements.push('Site Acceptance status is not accepted.');
        } else if (diag.code === 'SECRET_LEAKAGE' || diag.code === 'UNSAFE_ENVIRONMENT_REFERENCE') {
          verifiedStatements.push('Environment-secret leakage or unsafe boundary detected.');
        } else if (diag.code.includes('MISSING_') && diag.code.includes('_EVIDENCE')) {
          verifiedStatements.push(`Required release evidence is missing for dimension: ${diag.dimension}.`);
        } else {
          verifiedStatements.push(`Explicit violation detected: ${diag.code}.`);
        }
      }
    }

    return verifiedStatements;
  }
}
