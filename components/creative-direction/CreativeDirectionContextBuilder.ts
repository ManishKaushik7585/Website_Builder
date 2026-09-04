// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class CreativeDirectionContextBuilder {
  static build(
    brief: string,
    adaptiveContext: any,
    externalResearchContext: any,
    projectConstraints: string[]
  ): string {
    // Bounded context assembly to prevent overwhelming the engine
    let assembledContext = `# USER BRIEF\n${brief}\n\n`;

    assembledContext += `# CONSTRAINTS\n${projectConstraints.join('\n')}\n\n`;

    if (adaptiveContext && adaptiveContext.recommendations) {
      assembledContext += `# ADAPTIVE INTELLIGENCE (HISTORICAL LEARNINGS)\n`;
      const recs = adaptiveContext.recommendations.slice(0, 5); // Bound to top 5
      recs.forEach((rec: any) => {
        assembledContext += `- ${rec.reason} (Evidence: ${rec.evidence})\n`;
      });
      assembledContext += `\n`;
    }

    if (adaptiveContext && adaptiveContext.failureSignals) {
      assembledContext += `# FAILURE MEMORY (AVOID)\n`;
      const failures = adaptiveContext.failureSignals.slice(0, 5);
      failures.forEach((failure: string) => {
        assembledContext += `- ${failure}\n`;
      });
      assembledContext += `\n`;
    }

    if (externalResearchContext && externalResearchContext.patterns) {
      assembledContext += `# EXTERNAL RESEARCH PATTERNS\n`;
      const patterns = externalResearchContext.patterns.slice(0, 5);
      patterns.forEach((pattern: any) => {
        assembledContext += `- ${pattern.name}: ${pattern.description}\n`;
      });
      assembledContext += `\n`;
    }

    return assembledContext;
  }
}
