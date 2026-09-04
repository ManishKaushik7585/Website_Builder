import { KnowledgeCandidate, LearningScope, KnowledgeStatus } from '../../config/adaptive-intelligence';

export interface IAdaptiveMemoryStore {
  insert(candidate: KnowledgeCandidate): Promise<void>;
  retrieve(id: string): Promise<KnowledgeCandidate | null>;
  search(query: Partial<KnowledgeCandidate>): Promise<KnowledgeCandidate[]>;
  rank(candidates: KnowledgeCandidate[]): KnowledgeCandidate[];
  filter(candidates: KnowledgeCandidate[], scope: LearningScope): KnowledgeCandidate[];
  deduplicate(candidates: KnowledgeCandidate[]): KnowledgeCandidate[];
  invalidate(id: string, reason: string): Promise<void>;
  expire(id: string): Promise<void>;
  supersede(oldId: string, newId: string): Promise<void>;
  reset(scope?: LearningScope, projectId?: string): Promise<void>;
}

export class InMemoryAdaptiveMemoryStore implements IAdaptiveMemoryStore {
  private memory: Map<string, KnowledgeCandidate> = new Map();

  async insert(candidate: KnowledgeCandidate): Promise<void> {
    this.memory.set(candidate.id, { ...candidate });
  }

  async retrieve(id: string): Promise<KnowledgeCandidate | null> {
    const item = this.memory.get(id);
    return item ? { ...item } : null;
  }

  async search(query: Partial<KnowledgeCandidate>): Promise<KnowledgeCandidate[]> {
    const results: KnowledgeCandidate[] = [];
    for (const item of this.memory.values()) {
      let matches = true;
      if (query.type && item.type !== query.type) matches = false;
      if (query.scope && item.scope !== query.scope) matches = false;
      if (query.status && item.status !== query.status) matches = false;
      // Depending on complex querying, we'd add more logic. For now, strict match on provided keys.
      if (query.id && item.id !== query.id) matches = false;
      
      if (matches) {
        results.push({ ...item });
      }
    }
    return results;
  }

  rank(candidates: KnowledgeCandidate[]): KnowledgeCandidate[] {
    const confidenceOrder = { 'very_high': 5, 'high': 4, 'medium': 3, 'low': 2, 'very_low': 1 };
    return [...candidates].sort((a, b) => {
      const diff = confidenceOrder[b.confidence] - confidenceOrder[a.confidence];
      if (diff !== 0) return diff;
      return new Date(b.lastValidatedAt || b.createdAt).getTime() - new Date(a.lastValidatedAt || a.createdAt).getTime();
    });
  }

  filter(candidates: KnowledgeCandidate[], scope: LearningScope): KnowledgeCandidate[] {
    return candidates.filter(c => c.scope === scope || c.scope === 'global');
  }

  deduplicate(candidates: KnowledgeCandidate[]): KnowledgeCandidate[] {
    const unique = new Map<string, KnowledgeCandidate>();
    for (const c of candidates) {
      if (!unique.has(c.id)) {
        unique.set(c.id, c);
      }
    }
    return Array.from(unique.values());
  }

  async invalidate(id: string, reason: string): Promise<void> {
    const item = this.memory.get(id);
    if (item) {
      item.status = 'invalidated';
      item.provenance = { ...item.provenance, invalidationReason: reason };
      this.memory.set(id, item);
    }
  }

  async expire(id: string): Promise<void> {
    const item = this.memory.get(id);
    if (item) {
      item.status = 'expired';
      this.memory.set(id, item);
    }
  }

  async supersede(oldId: string, newId: string): Promise<void> {
    const oldItem = this.memory.get(oldId);
    if (oldItem) {
      oldItem.status = 'superseded';
      oldItem.provenance = { ...oldItem.provenance, supersededBy: newId };
      this.memory.set(oldId, oldItem);
    }
  }

  async reset(scope?: LearningScope, projectId?: string): Promise<void> {
    if (!scope && !projectId) {
      this.memory.clear();
      return;
    }
    const toDelete: string[] = [];
    for (const [id, item] of this.memory.entries()) {
      let shouldDelete = false;
      if (scope && item.scope === scope) {
        shouldDelete = true;
      }
      if (projectId && item.evidence.some(e => e.projectContext?.projectId === projectId)) {
        // Caution: This is a loose heuristic for project context
        shouldDelete = true;
      }
      if (shouldDelete) {
        toDelete.push(id);
      }
    }
    for (const id of toDelete) {
      this.memory.delete(id);
    }
  }
}

// Global Singleton for in-memory persistence in development environment
export const AdaptiveMemoryStoreInstance = new InMemoryAdaptiveMemoryStore();
