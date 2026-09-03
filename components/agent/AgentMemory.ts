
import { AgentMemoryEntry } from '@/config/agent-memory';

export class AgentMemory {
  private memory: AgentMemoryEntry[] = [];
  
  store(entry: AgentMemoryEntry) {
    this.memory.push(entry);
  }
}
