export class ConvergenceSelfCritique {
  private static VAGUE_TERMS = [
    'looks better',
    'feels cleaner',
    'more polished',
    'more professional',
    'better UX',
    'improved visually',
    'make it pop',
    'this seems good now'
  ];

  static critique(statement: string): string | null {
    const lower = statement.toLowerCase();
    for (const term of this.VAGUE_TERMS) {
      if (lower.includes(term)) {
        return null;
      }
    }
    
    // Requires measurable evidence
    if (lower.includes('resolved') || lower.includes('increased') || lower.includes('changed') || lower.includes('detected') || lower.includes('exists')) {
      return statement;
    }
    
    return null;
  }
}
