import { ResearchMemory, ResearchEvidence, ResearchConstraint, DesignPattern, EngineeringPattern, MCPCapability, ResearchDecision } from '../../config/external-intelligence';

export class ResearchMemoryManager {
  private memory: ResearchMemory;

  constructor(projectId: string) {
    this.memory = {
      projectId,
      references: { websites: [], articles: [], documentation: [], assets: [], githubRepositories: [] },
      evidence: { observed: [], inferred: [], recommended: [] },
      designPatterns: [],
      engineeringPatterns: [],
      toolCapabilities: [],
      decisions: { adopted: [], rejected: [], deferred: [] },
      constraints: [],
      uncertainties: []
    };
  }

  addEvidence(evidence: ResearchEvidence) {
    if (evidence.type === 'observed') this.memory.evidence.observed.push(evidence);
    if (evidence.type === 'inferred') this.memory.evidence.inferred.push(evidence);
    if (evidence.type === 'recommended') this.memory.evidence.recommended.push(evidence);
    
    if (evidence.source && !this.memory.references.websites.includes(evidence.source)) {
      if (evidence.source.includes('github.com')) {
        this.memory.references.githubRepositories.push(evidence.source);
      } else {
        this.memory.references.websites.push(evidence.source);
      }
    }
  }

  addDesignPattern(pattern: DesignPattern) {
    const existing = this.memory.designPatterns.find(p => p.patternId === pattern.patternId);
    if (!existing) {
      this.memory.designPatterns.push(pattern);
    }
  }

  addEngineeringPattern(pattern: EngineeringPattern) {
    const existing = this.memory.engineeringPatterns.find(p => p.patternId === pattern.patternId);
    if (!existing) {
      this.memory.engineeringPatterns.push(pattern);
    }
  }

  addToolCapability(capability: MCPCapability) {
    const existing = this.memory.toolCapabilities.find(p => p.server === capability.server && p.capability === capability.capability);
    if (!existing) {
      this.memory.toolCapabilities.push(capability);
    }
  }

  addDecision(decision: ResearchDecision) {
    if (decision.status === 'adopted') this.memory.decisions.adopted.push(decision);
    else if (decision.status === 'rejected') this.memory.decisions.rejected.push(decision);
    else if (decision.status === 'deferred') this.memory.decisions.deferred.push(decision);
  }

  getMemory(): ResearchMemory {
    return this.memory;
  }
}
