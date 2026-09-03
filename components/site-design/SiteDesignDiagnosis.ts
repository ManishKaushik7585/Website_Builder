
export const mapSymptomToCause = (symptom: string) => {
  if (symptom === 'different typography') return 'TYPOGRAPHY_SYSTEM_BREAKDOWN';
  return 'UNKNOWN';
};
