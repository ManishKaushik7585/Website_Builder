import { ResearchEvidence } from '../../config/external-intelligence';

export class ResearchFusion {
  
  static fuse(rawEvidences: ResearchEvidence[]): ResearchEvidence[] {
    const fused: ResearchEvidence[] = [];
    
    // Naive fusion: deduplicate based on claim similarity
    const claimMap: Map<string, ResearchEvidence[]> = new Map();

    for (const ev of rawEvidences) {
      const normalizedClaim = ev.claim.toLowerCase().trim();
      if (!claimMap.has(normalizedClaim)) {
        claimMap.set(normalizedClaim, []);
      }
      claimMap.get(normalizedClaim)!.push(ev);
    }

    // Process fusions
    for (const [claimText, group] of claimMap.entries()) {
      if (group.length === 1) {
        fused.push(group[0]);
      } else {
        // Boost confidence on multiple matching claims
        const base = group[0];
        
        let newConfidence = base.confidence;
        if (group.length >= 3) newConfidence = 'very_high';
        else if (group.length === 2 && base.confidence !== 'very_high') newConfidence = 'high';

        const fusedTags = new Set<string>();
        group.forEach(g => g.tags.forEach(t => fusedTags.add(t)));

        fused.push({
          ...base,
          id: `fused_${base.id}`,
          confidence: newConfidence,
          tags: Array.from(fusedTags),
          claim: `[FUSED x${group.length}] ${base.claim}`
        });
      }
    }

    // Explicit Contradiction Check (Example deterministic logic)
    const accessClaims = fused.filter(f => f.claim.includes('accessibility'));
    if (accessClaims.length > 1) {
      const pos = accessClaims.find(a => a.claim.includes('good') || a.claim.includes('accessible'));
      const neg = accessClaims.find(a => a.claim.includes('bad') || a.claim.includes('missing'));
      if (pos && neg) {
        // Downgrade confidence on contradiction
        pos.confidence = 'low';
        neg.confidence = 'low';
      }
    }

    return fused;
  }
}
