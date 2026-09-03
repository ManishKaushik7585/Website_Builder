
import { AgentRunLog } from '@/config/agent-run';

export class AgentLogger {
  private logs: AgentRunLog[] = [];
  
  log(entry: AgentRunLog) {
    this.logs.push(entry);
  }
  
  getLogs() {
    return this.logs;
  }
}
