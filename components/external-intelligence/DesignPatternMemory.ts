import { DesignPattern } from '../../config/external-intelligence';

export class DesignPatternMemory {
  private patterns: Map<string, DesignPattern> = new Map();

  addPattern(pattern: DesignPattern) {
    if (this.patterns.has(pattern.patternId)) {
      // Deduplicate: merge sources and boost confidence if appropriate
      const existing = this.patterns.get(pattern.patternId)!;
      const newRefs = new Set([...existing.sourceReferences, ...pattern.sourceReferences]);
      
      this.patterns.set(pattern.patternId, {
        ...existing,
        sourceReferences: Array.from(newRefs),
        confidence: Math.min(1.0, existing.confidence + 0.05) // Minor confidence boost on duplication
      });
    } else {
      this.patterns.set(pattern.patternId, pattern);
    }
  }

  getPatterns(): DesignPattern[] {
    return Array.from(this.patterns.values());
  }

  retrieveRelevantPatterns(industry: string, category?: string): DesignPattern[] {
    const list = this.getPatterns();
    return list.filter(p => {
      const matchIndustry = p.suitableIndustries.some(i => i.toLowerCase().includes(industry.toLowerCase()));
      const matchCategory = category ? p.category === category : true;
      return matchIndustry && matchCategory;
    });
  }

  clear() {
    this.patterns.clear();
  }
}
