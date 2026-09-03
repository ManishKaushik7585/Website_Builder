
export const generateRefinement = (cause: string) => {
  if (cause === 'TYPOGRAPHY_SYSTEM_BREAKDOWN') return 'alignTypographyRole';
  return 'none';
};
