export class InteractionSelfCritique {
  private static VAGUE_PHRASES = [
    'make it feel better',
    'make it more interactive',
    'make the buttons nicer',
    'improve the ux',
    'make the interaction pop'
  ];

  static validateCritique(critique: string): { valid: boolean; reason?: string } {
    const lower = critique.toLowerCase();
    for (const phrase of this.VAGUE_PHRASES) {
      if (lower.includes(phrase)) {
        return {
          valid: false,
          reason: `Rejected vague interaction feedback: "${phrase}". Critique must be a measurable behavioral requirement.`
        };
      }
    }

    // Must contain measurable interaction action verbs/phrases
    const hasMeasurableAction = /add keyboard|preserve focus|show loading|require confirmation|reduce interaction|provide an error|simplify interaction/i.test(lower);
    if (!hasMeasurableAction) {
      return {
        valid: false,
        reason: 'Critique lacks measurable semantic interaction actions (e.g. add keyboard, preserve focus, require confirmation).'
      };
    }

    return { valid: true };
  }
}
