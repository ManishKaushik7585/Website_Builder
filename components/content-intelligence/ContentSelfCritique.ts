export class ContentSelfCritique {
  private static VAGUE_PHRASES = [
    'make it pop',
    'make it more premium',
    'make it better',
    'make it visually appealing',
    'make it engaging',
    'make it modern',
    'make it exciting',
    'add some personality'
  ];

  static validateCritique(critique: string): { valid: boolean; reason?: string } {
    const lower = critique.toLowerCase();
    for (const phrase of this.VAGUE_PHRASES) {
      if (lower.includes(phrase)) {
        return {
          valid: false,
          reason: `Rejected vague aesthetic feedback: "${phrase}". Critique must be a measurable semantic requirement.`
        };
      }
    }

    // Must contain some measurable action verbs
    const hasMeasurableAction = /reduce|remove|move|limit|increase|prevent|shorten|expand|split|merge/i.test(lower);
    if (!hasMeasurableAction) {
      return {
        valid: false,
        reason: 'Critique lacks measurable semantic actions (e.g. reduce, limit, remove, move).'
      };
    }

    return { valid: true };
  }
}
