
export interface SiteDesignObservation {
  id: string;
  category: string;
  description: string;
  severity: 'minor' | 'moderate' | 'major' | 'critical';
}

export interface SiteDesignDiagnosis {
  code: string;
  cause: string;
  observations: SiteDesignObservation[];
}

export interface SiteDesignRecommendation {
  action: string;
  target: string;
}

export interface SiteDesignResult {
  status: 'PASS' | 'CONDITIONAL' | 'FAIL';
  diagnoses: SiteDesignDiagnosis[];
  recommendations: SiteDesignRecommendation[];
}

export interface SiteDesignReport {
  timestamp: string;
  result: SiteDesignResult;
}
