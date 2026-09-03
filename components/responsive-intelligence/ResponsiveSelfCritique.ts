export class ResponsiveSelfCritique {
  private static VAGUE_PHRASES = [
    'make mobile better',
    'fix responsiveness',
    'make it fit',
    'make it responsive',
    'make it cleaner on mobile'
  ];

  static validateCritique(critique: string): { valid: boolean; reason?: string } {
    const lower = critique.toLowerCase();
    for (const phrase of this.VAGUE_PHRASES) {
      if (lower.includes(phrase)) {
        return {
          valid: false,
          reason: `Rejected vague responsive feedback: "${phrase}". Critique must be a measurable semantic requirement.`
        };
      }
    }

    // Must contain some measurable action verbs
    const hasMeasurableAction = /remove|stack|preserve|collapse|reduce|convert|reorder|hide/i.test(lower);
    if (!hasMeasurableAction) {
      return {
        valid: false,
        reason: 'Critique lacks measurable semantic actions (e.g. stack, preserve, collapse, convert, reduce).'
      };
    }

    return { valid: true };
  }
}
