
export interface AgentMemoryEntry {
  id: string;
  type: 'run' | 'iteration' | 'project';
  keyFact: string;
  timestamp: string;
}
